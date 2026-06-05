import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    // Use Google DNS-over-HTTPS to check DNSSEC (DO bit = 1)
    const res = await fetch(`https://dns.google/resolve?name=${domain}&type=A&do=1`);
    const data = await res.json();

    let status = "success";
    let details = "DNSSEC is enabled. Your DNS records are cryptographically signed.";
    let solution = "Continue maintaining DNSSEC keys and monitoring rollover periods.";

    // The 'ad' flag (Authentic Data) indicates DNSSEC validation was successful
    // Alternatively, checking if RRSIG records exist in the 'Answer' section
    const hasDnssec = data.AD === true || (data.Answer && data.Answer.some(record => record.type === 46));

    if (!hasDnssec) {
      status = "danger";
      details = "DNSSEC is NOT enabled. Domain is highly vulnerable to DNS Spoofing, Cache Poisoning, and Hijacking.";
      solution = "Enable DNSSEC at your domain registrar (e.g. GoDaddy, Cloudflare) and configure cryptographic signing for your zone.";
    }

    return NextResponse.json({
      success: true,
      data: {
        name: "DNSSEC & Zone Security",
        status,
        details,
        solution,
        link: "https://www.icann.org/resources/pages/dnssec-what-is-it-why-important-2019-03-05-en",
        raw: {
          ad_flag: data.AD || false,
          status_code: data.Status
        }
      }
    });

  } catch (error) {
    console.error("DNSSEC API error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
