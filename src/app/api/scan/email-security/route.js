import { NextResponse } from 'next/server';
import dns from 'dns/promises';

export async function POST(request) {
  try {
    const { domain } = await request.json();

    if (!domain) {
      return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });
    }

    // Prepare response object
    let spfRecord = null;
    let dmarcRecord = null;
    let hasMX = false;
    let status = "danger";
    let details = "Unable to fetch email security records.";
    let solution = "Configure SPF, DKIM, and DMARC records immediately to prevent email spoofing.";

    try {
      // 1. Check MX Records (Does the domain even receive email?)
      const mxRecords = await dns.resolveMx(domain).catch(() => []);
      if (mxRecords.length > 0) {
        hasMX = true;
      }

      // 2. Check SPF (TXT records on the root domain)
      const txtRecords = await dns.resolveTxt(domain).catch(() => []);
      for (const recordArray of txtRecords) {
        const record = recordArray.join('');
        if (record.startsWith('v=spf1')) {
          spfRecord = record;
        }
      }

      // 3. Check DMARC (TXT records on _dmarc.domain)
      const dmarcTxtRecords = await dns.resolveTxt(`_dmarc.${domain}`).catch(() => []);
      for (const recordArray of dmarcTxtRecords) {
        const record = recordArray.join('');
        if (record.startsWith('v=DMARC1')) {
          dmarcRecord = record;
        }
      }

      // Evaluate the security posture based on SPF and DMARC
      if (spfRecord && dmarcRecord) {
        if (dmarcRecord.includes('p=reject')) {
          status = "success";
          details = "SPF and strict DMARC (p=reject) are configured correctly.";
          solution = "No action required. Monitor DMARC aggregate reports monthly.";
        } else if (dmarcRecord.includes('p=quarantine')) {
          status = "success";
          details = "SPF and DMARC (p=quarantine) configured.";
          solution = "Consider upgrading DMARC policy to p=reject after verifying all valid mail flows.";
        } else {
          status = "warning";
          details = "DMARC is in monitoring mode (p=none).";
          solution = "Analyze DMARC reports and enforce a p=quarantine or p=reject policy to block spoofing.";
        }
      } else if (spfRecord && !dmarcRecord) {
        status = "warning";
        details = "SPF is configured, but DMARC is missing.";
        solution = "Implement a DMARC record to protect against exact-domain spoofing.";
      } else if (!spfRecord && !dmarcRecord && hasMX) {
        status = "danger";
        details = "No SPF or DMARC records found, but MX records exist (Highly Vulnerable).";
        solution = "Immediately implement SPF and DMARC to prevent attackers from spoofing your domain.";
      } else {
        status = "danger";
        details = "No email security records found.";
        solution = "If this domain sends email, configure SPF and DMARC immediately.";
      }

    } catch (dnsError) {
      console.error("DNS resolution error:", dnsError);
      return NextResponse.json({ success: false, error: "Failed to resolve DNS for the target domain." }, { status: 500 });
    }

    // Return structured payload that the frontend expects
    return NextResponse.json({
      success: true,
      data: {
        name: "Email Security Suite",
        status,
        details,
        solution,
        link: `https://mxtoolbox.com/SuperTool.aspx?action=mx%3a${domain}`,
        raw: {
          spf: spfRecord,
          dmarc: dmarcRecord,
          mx: hasMX
        }
      }
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
