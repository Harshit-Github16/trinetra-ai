import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    const brandName = domain.split('.')[0];
    const platforms = [
      { name: "GitHub", url: `https://github.com/${brandName}` },
      { name: "X/Twitter", url: `https://twitter.com/${brandName}` },
      { name: "Instagram", url: `https://www.instagram.com/${brandName}/` }
    ];

    const results = await Promise.all(platforms.map(async (platform) => {
      try {
        const res = await fetch(platform.url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 3000 });
        return { platform: platform.name, exists: res.status === 200 || res.status === 403 };
      } catch (err) {
        return { platform: platform.name, exists: false };
      }
    }));

    const claimed = results.filter(r => r.exists).map(r => r.platform);
    
    let status = "warning";
    let details = `Social media footprint check complete. Claimed handles: ${claimed.join(', ') || 'None found'}.`;
    let solution = "Ensure all social media handles matching your brand are officially controlled to prevent impersonation.";

    if (claimed.length === 0) {
      status = "danger";
      details = "No official social media footprint found. High risk of brand impersonation or typosquatting.";
      solution = "Immediately register your brand name across all major social media platforms.";
    } else if (claimed.length === platforms.length) {
      status = "success";
      details = "Strong brand presence. Core social media handles are claimed.";
      solution = "Enable 2FA on all corporate social media accounts and monitor for fake clone profiles.";
    }

    return NextResponse.json({
      success: true,
      data: {
        name: "Social Media Protection",
        status,
        details,
        solution,
        link: `https://namechk.com/?q=${brandName}`,
        raw: results
      }
    });

  } catch (error) {
    console.error("Social scan error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
