import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    const API_KEY = process.env.VIRUSTOTAL_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ success: false, error: "API Key missing" }, { status: 500 });
    }

    const res = await fetch(`https://www.virustotal.com/api/v3/domains/${domain}`, {
      method: 'GET',
      headers: {
        'x-apikey': API_KEY,
        'Accept': 'application/json'
      }
    });

    const data = await res.json();
    
    if (data.error) {
       return NextResponse.json({
          success: true,
          data: {
            name: "Threat Intelligence",
            status: "warning",
            details: `VirusTotal Error: ${data.error.message}`,
            solution: "Verify domain name or check API quota limit.",
            link: null,
            raw: data
          }
       });
    }

    const stats = data.data.attributes.last_analysis_stats;
    let status = "success";
    let details = `No active malicious indicators found. VT Score: ${stats.malicious}/${stats.harmless + stats.malicious + stats.suspicious + stats.undetected}`;
    let solution = "Keep ingesting Threat Intelligence feeds.";

    if (stats.malicious > 0) {
      status = "danger";
      details = `${stats.malicious} security vendors flagged this domain as malicious.`;
      solution = "Investigate the malicious flags on VirusTotal. Domain may be involved in distributing malware or C2 infrastructure.";
    } else if (stats.suspicious > 0) {
      status = "warning";
      details = `${stats.suspicious} security vendors flagged this domain as suspicious.`;
      solution = "Monitor traffic from this domain closely for anomalous behavior.";
    }

    return NextResponse.json({
      success: true,
      data: {
        name: "Threat Intelligence",
        status,
        details,
        solution,
        link: `https://www.virustotal.com/gui/domain/${domain}`,
        raw: stats
      }
    });

  } catch (error) {
    console.error("VirusTotal error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
