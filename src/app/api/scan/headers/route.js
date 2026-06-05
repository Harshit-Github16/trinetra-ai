import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    const targetUrl = `https://${domain}`;
    
    try {
      const response = await fetch(targetUrl, { method: 'HEAD', timeout: 5000 });
      
      const headers = response.headers;
      
      const hsts = headers.get('strict-transport-security');
      const csp = headers.get('content-security-policy');
      const xframe = headers.get('x-frame-options');
      const xcontent = headers.get('x-content-type-options');

      let score = 0;
      let missing = [];
      
      if (hsts) score++; else missing.push('HSTS');
      if (csp) score++; else missing.push('CSP');
      if (xframe) score++; else missing.push('X-Frame-Options');
      if (xcontent) score++; else missing.push('X-Content-Type-Options');

      let status = "success";
      let details = `Excellent! 4/4 critical security headers present.`;
      let solution = "Maintain current server configurations.";

      if (score === 0) {
        status = "danger";
        details = "0/4 critical security headers found. Highly vulnerable to XSS and Clickjacking.";
        solution = `Configure your web server to return: ${missing.join(', ')}.`;
      } else if (score < 4) {
        status = "warning";
        details = `Missing ${4 - score} security headers: ${missing.join(', ')}.`;
        solution = "Update your reverse proxy or CDN to inject the missing security headers.";
      }

      return NextResponse.json({
        success: true,
        data: {
          name: "HTTP Security Headers",
          status,
          details,
          solution,
          link: `https://securityheaders.com/?q=${domain}&followRedirects=on`,
          raw: {
            hsts, csp, xframe, xcontent
          }
        }
      });

    } catch (fetchError) {
      return NextResponse.json({
        success: true,
        data: {
          name: "HTTP Security Headers",
          status: "danger",
          details: `Failed to fetch HTTP headers: ${fetchError.message}`,
          solution: "Ensure the domain resolves and is serving HTTPS traffic.",
          link: null
        }
      });
    }

  } catch (error) {
    console.error("Headers error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
