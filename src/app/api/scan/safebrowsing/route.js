import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    const API_KEY = process.env.SAFE_BROWSING_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ success: false, error: "API Key missing" }, { status: 500 });
    }

    const payload = {
      client: { clientId: "trinetra-ai", clientVersion: "1.0" },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url: `http://${domain}` }, { url: `https://${domain}` }]
      }
    };

    const res = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    
    let status = "success";
    let details = "No active phishing or malware kits targeting domain.";
    let solution = "Continue monitoring Google Safe Browsing and PhishTank feeds.";

    if (data.matches && data.matches.length > 0) {
      status = "danger";
      const threatTypes = [...new Set(data.matches.map(m => m.threatType))].join(', ');
      details = `Domain flagged by Google Safe Browsing for: ${threatTypes}.`;
      solution = "Immediate remediation required. Review server logs for compromise and request a Google Safe Browsing review.";
    }

    return NextResponse.json({
      success: true,
      data: {
        name: "Phishing Protection",
        status,
        details,
        solution,
        link: status === "danger" ? `https://transparencyreport.google.com/safe-browsing/search?url=${domain}` : null,
        raw: data
      }
    });

  } catch (error) {
    console.error("SafeBrowsing error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
