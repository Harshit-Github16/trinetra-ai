import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    const baseUrl = domain.startsWith('http') ? domain : `https://${domain}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    let res;
    let htmlText = "";
    try {
      res = await fetch(baseUrl, { signal: controller.signal });
      htmlText = await res.text();
      clearTimeout(timeoutId);
    } catch(e) {
      clearTimeout(timeoutId);
      return NextResponse.json({
        success: true,
        data: {
          name: "Tech Stack & CVE Profiler",
          status: "warning",
          details: "Could not fetch webpage to profile technology stack.",
          solution: "Ensure domain is reachable.",
          link: null
        }
      });
    }

    const techStack = [];
    const headers = {};
    res.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });

    // 1. Check Headers
    if (headers['server']) techStack.push({ name: 'Web Server', value: headers['server'] });
    if (headers['x-powered-by']) techStack.push({ name: 'Backend Framework', value: headers['x-powered-by'], alert: true });
    if (headers['x-generator']) techStack.push({ name: 'Generator', value: headers['x-generator'], alert: true });

    // 2. Parse HTML Meta Tags & Patterns
    if (htmlText.includes('wp-content') || htmlText.includes('WordPress')) techStack.push({ name: 'CMS', value: 'WordPress' });
    if (htmlText.includes('Next.js') || htmlText.includes('/_next/')) techStack.push({ name: 'Framework', value: 'Next.js' });
    if (htmlText.includes('React') || htmlText.includes('data-reactroot')) techStack.push({ name: 'Frontend', value: 'React' });
    if (htmlText.includes('cloudflare')) techStack.push({ name: 'CDN/WAF', value: 'Cloudflare' });

    let status = "success";
    let details = "Technology stack appears standard. No overt version disclosures detected.";
    let solution = "Continue hiding server signatures (Server/X-Powered-By) to prevent targeted attacks.";

    const alerts = techStack.filter(t => t.alert);
    if (alerts.length > 0) {
      status = "warning";
      details = `Information Disclosure: Server is broadcasting its backend framework/version: ${alerts.map(a => a.value).join(', ')}.`;
      solution = "Remove 'X-Powered-By' and 'Server' headers. This information helps hackers find specific CVEs (Common Vulnerabilities and Exposures) for your stack.";
    }

    return NextResponse.json({
      success: true,
      data: {
        name: "Tech Stack & CVE Profiler",
        status,
        details,
        solution,
        link: null,
        raw: techStack.length > 0 ? techStack : null
      }
    });

  } catch (error) {
    console.error("Tech Stack API error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
