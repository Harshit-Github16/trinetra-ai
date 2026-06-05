import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    const sensitivePaths = [
      '/.env',
      '/.git/config',
      '/backup.zip',
      '/config.json',
      '/docker-compose.yml',
      '/phpinfo.php',
      '/.htaccess',
      '/server-status'
    ];

    const results = [];
    const baseUrl = domain.startsWith('http') ? domain : `http://${domain}`;

    // Use Promise.allSettled for concurrent scanning with a short timeout
    const fetchPromises = sensitivePaths.map(path => {
      const url = `${baseUrl}${path}`;
      // Use AbortController for a strict timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout per request
      
      return fetch(url, { method: 'HEAD', signal: controller.signal })
        .then(res => {
          clearTimeout(timeoutId);
          if (res.status === 200 || res.status === 403) {
             return { path, status: res.status };
          }
          return null;
        })
        .catch(() => {
          clearTimeout(timeoutId);
          return null;
        });
    });

    const responses = await Promise.allSettled(fetchPromises);
    responses.forEach(r => {
       if (r.status === 'fulfilled' && r.value) {
          results.push(r.value);
       }
    });

    let status = "success";
    let details = "No exposed sensitive files detected on common paths.";
    let solution = "Continue maintaining strict access controls and preventing directory listing.";

    if (results.length > 0) {
      status = "danger";
      const fileList = results.map(r => r.path).join(', ');
      details = `CRITICAL ALERT: Detected potentially exposed sensitive paths: ${fileList}.`;
      solution = "Immediately block public access to these files via web server configuration (e.g. Nginx/Apache deny rules).";
    }

    return NextResponse.json({
      success: true,
      data: {
        name: "Exposed Sensitive Files",
        status,
        details,
        solution,
        link: null,
        raw: results.length > 0 ? results : null
      }
    });

  } catch (error) {
    console.error("Exposed Files API error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
