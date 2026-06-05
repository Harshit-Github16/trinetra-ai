import { NextResponse } from 'next/server';

const dns = require('dns').promises;
const tls = require('tls');
const https = require('https');
const Parser = require('rss-parser');
const parser = new Parser();

const { detectLookalikeDomains } = require('@/lib/services/lookalike.service');
const { checkEmailSecurity } = require('@/lib/services/emailSecurity.service');
const { getIntelData } = require('@/lib/services/intel.service');

/**
 * Helper to fetch DNS records for a domain.
 */
const getDnsRecords = async (domain) => {
  const records = {};
  const recordTypes = [
    { type: 'A', method: dns.resolve4 },
    { type: 'MX', method: dns.resolveMx },
    { type: 'TXT', method: dns.resolveTxt },
    { type: 'NS', method: dns.resolveNs }
  ];

  for (const item of recordTypes) {
    try {
      const result = await item.method(domain);
      records[item.type] = result;
    } catch (err) {
      records[item.type] = []; // Fallback for missing records or resolution failure
    }
  }
  return records;
};

/**
 * Helper to inspect SSL certificate details of a domain.
 */
const getSslCertificateDetails = (domain) => {
  return new Promise((resolve) => {
    const socket = tls.connect(443, domain, { servername: domain, rejectUnauthorized: false }, () => {
      const cert = socket.getPeerCertificate();
      if (!cert || Object.keys(cert).length === 0) {
        resolve({ valid: false, error: 'No certificate returned' });
      } else {
        const validTo = new Date(cert.valid_to);
        const daysRemaining = Math.round((validTo - new Date()) / (1000 * 60 * 60 * 24));
        resolve({
          valid: socket.authorized,
          issuer: cert.issuer.O || cert.issuer.CN,
          validFrom: cert.valid_from,
          validTo: cert.valid_to,
          daysRemaining
        });
      }
      socket.end();
    });

    socket.on('error', (err) => {
      resolve({ valid: false, error: err.message });
    });

    socket.setTimeout(5500);
    socket.on('timeout', () => {
      resolve({ valid: false, error: 'SSL check connection timeout' });
      socket.destroy();
    });
  });
};

/**
 * Helper to verify HTTP reachability and latency of a domain.
 */
const getHttpReachability = (domain) => {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const req = https.get(`https://${domain}`, { timeout: 5500 }, (res) => {
      resolve({
        status: 'online',
        statusCode: res.statusCode,
        responseTimeMs: Date.now() - startTime,
        serverHeader: res.headers.server || 'unknown'
      });
    });

    req.on('error', (err) => {
      resolve({
        status: 'offline',
        error: err.message
      });
    });

    req.setTimeout(5500, () => {
      resolve({
        status: 'offline',
        error: 'HTTP connection timeout'
      });
      req.destroy();
    });
  });
};

export async function POST(request) {
  try {
    const { brandName } = await request.json();

    if (!brandName || typeof brandName !== 'string') {
      return NextResponse.json({
        success: false,
        message: 'Valid brandName is required in request body.'
      }, { status: 400 });
    }

    // Determine domain from brand input
    let domain = brandName.trim();
    if (!domain.includes('.')) {
      domain = `${domain}.com`;
    }

    // Execute all diagnostics and intelligence gathering in parallel
    const [
      dnsRecords,
      sslDetails,
      httpStatus,
      lookalikeResults,
      emailSecResults,
      intelResults
    ] = await Promise.all([
      getDnsRecords(domain),
      getSslCertificateDetails(domain),
      getHttpReachability(domain),
      detectLookalikeDomains(domain),
      checkEmailSecurity(domain),
      getIntelData(brandName)
    ]);

    // Fetch Google News RSS for brand context
    let newsData = [];
    try {
      const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(brandName)}&hl=en-IN&gl=IN&ceid=IN:en`;
      const feed = await parser.parseURL(feedUrl);
      newsData = feed.items.slice(0, 5).map(item => ({
        source: item.source || 'Google News',
        title: item.title,
        link: item.link,
        publishedAt: item.pubDate
      }));
    } catch (newsError) {
      console.warn('News RSS fetch skipped or failed:', newsError.message);
    }

    // Compile dynamic aggregated results
    return NextResponse.json({
      success: true,
      query: brandName,
      timestamp: new Date(),
      data: {
        domain,
        // Core infrastructure details
        domainStatus: httpStatus,
        sslCertificate: sslDetails,
        dnsRecords,
        latestNews: newsData,
        // Multi-vector intelligence extensions
        lookalikes: lookalikeResults,
        emailSecurity: emailSecResults,
        intelligence: intelResults
      }
    });
  } catch (error) {
    console.error('Error gathering domain monitoring indicators:', error);
    return NextResponse.json({
      success: false,
      message: `Domain monitoring failed: ${error.message}`
    }, { status: 500 });
  }
}
