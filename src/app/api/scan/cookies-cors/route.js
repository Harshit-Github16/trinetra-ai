import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    const baseUrl = domain.startsWith('http') ? domain : `https://${domain}`;
    
    // We'll perform a preflight OPTIONS request and a normal GET request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    let res;
    try {
      res = await fetch(baseUrl, { 
        method: 'GET',
        headers: { 'Origin': 'https://evil-hacker.com' }, // Testing CORS
        signal: controller.signal 
      });
      clearTimeout(timeoutId);
    } catch(e) {
      clearTimeout(timeoutId);
      return NextResponse.json({
        success: true,
        data: {
          name: "Session & CORS Security",
          status: "warning",
          details: "Could not establish HTTP connection to analyze headers.",
          solution: "Ensure the web server is online and reachable.",
          link: null
        }
      });
    }

    const headers = {};
    res.headers.forEach((value, name) => {
      headers[name.toLowerCase()] = value;
    });

    const results = {
      cors: {
        allowOrigin: headers['access-control-allow-origin'] || 'None',
        vulnerable: headers['access-control-allow-origin'] === '*'
      },
      cookies: []
    };

    const setCookies = res.headers.getSetCookie ? res.headers.getSetCookie() : [];
    
    let status = "success";
    let details = "CORS policies and Cookies appear secure.";
    let solution = "Continue monitoring headers for secure configurations.";

    let insecureCookies = 0;

    if (setCookies.length > 0) {
      setCookies.forEach(cookie => {
        const isSecure = cookie.toLowerCase().includes('secure');
        const isHttpOnly = cookie.toLowerCase().includes('httponly');
        const isSameSite = cookie.toLowerCase().includes('samesite');
        
        if (!isSecure || !isHttpOnly || !isSameSite) insecureCookies++;
        
        results.cookies.push({
          cookieStr: cookie.split(';')[0],
          secure: isSecure,
          httpOnly: isHttpOnly,
          sameSite: isSameSite
        });
      });
    }

    if (results.cors.vulnerable) {
       status = "danger";
       details = "Wildcard CORS (* wildcard) detected! This allows any website to read your users' private data.";
       solution = "Configure 'Access-Control-Allow-Origin' to explicitly allow only trusted domains.";
    } else if (insecureCookies > 0) {
       status = "warning";
       details = `Detected ${insecureCookies} session cookies missing Secure/HttpOnly/SameSite flags.`;
       solution = "Enforce 'Secure' and 'HttpOnly' flags on all sensitive cookies to prevent XSS theft.";
    }

    return NextResponse.json({
      success: true,
      data: {
        name: "Session & CORS Security",
        status,
        details,
        solution,
        link: null,
        raw: results
      }
    });

  } catch (error) {
    console.error("Cookies/CORS API error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
