import { NextResponse } from 'next/server';
import dns from 'dns/promises';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    const commonSubdomains = ['www', 'mail', 'blog', 'support', 'help', 'docs', 'api', 'dev', 'staging', 'test'];
    const results = [];
    
    // Check main domain and common subdomains for CNAME records
    const domainsToCheck = [domain, ...commonSubdomains.map(sub => `${sub}.${domain}`)];
    
    for (const d of domainsToCheck) {
      try {
        const records = await dns.resolveCname(d);
        if (records && records.length > 0) {
          results.push({
            domain: d,
            cname: records[0]
          });
        }
      } catch (e) {
        // Ignore ENOTFOUND or ENODATA
      }
    }

    let status = "success";
    let details = "No vulnerable dangling CNAME records detected.";
    let solution = "Continue monitoring subdomains for dangling pointers.";

    if (results.length > 0) {
      status = "warning";
      details = `Discovered ${results.length} active CNAME records. Verify they point to active services to prevent Subdomain Takeover.`;
      solution = "Periodically audit DNS records and remove entries pointing to decommissioned third-party services (e.g., AWS S3, GitHub Pages).";
    }

    return NextResponse.json({
      success: true,
      data: {
        name: "Subdomain Takeover",
        status,
        details,
        solution,
        link: null,
        raw: results.length > 0 ? results : null
      }
    });

  } catch (error) {
    console.error("Subdomain API error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
