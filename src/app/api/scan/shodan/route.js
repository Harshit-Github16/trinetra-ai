import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    const API_KEY = process.env.SHODAN_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ success: false, error: "API Key missing" }, { status: 500 });
    }

    // 1. Resolve domain to IP using Node's native DNS module (Free tier safe)
    let targetIp = null;
    try {
      const dns = require('dns').promises;
      const records = await dns.resolve4(domain);
      if (records && records.length > 0) {
        targetIp = records[0];
      }
    } catch (err) {
      // DNS resolution failed
    }
    
    if (!targetIp) {
      return NextResponse.json({
        success: true,
        data: {
          name: "External Attack Surface (EASM)",
          status: "warning",
          details: "Domain could not be resolved to an IPv4 address.",
          solution: "Ensure domain has valid A records.",
          link: null
        }
      });
    }
    
    // 2. Query Shodan Host API
    const hostRes = await fetch(`https://api.shodan.io/shodan/host/${targetIp}?key=${API_KEY}`);
    
    if (hostRes.status === 404) {
       return NextResponse.json({
          success: true,
          data: {
            name: "External Attack Surface (EASM)",
            status: "success",
            details: "No active footprint found for this IP on Shodan.",
            solution: "Continue maintaining a minimal public attack surface.",
            link: `https://www.shodan.io/host/${targetIp}`
          }
       });
    }

    const hostData = await hostRes.json();
    
    if (hostData.error) {
       return NextResponse.json({ success: false, error: hostData.error }, { status: 400 });
    }

    const openPorts = hostData.ports || [];
    const vulns = hostData.vulns || [];

    let status = "success";
    let details = `Discovered ${openPorts.length} open ports and ${vulns.length} known vulnerabilities.`;
    let solution = "Ensure all discovered ports are intentionally public.";

    if (vulns.length > 0) {
      status = "danger";
      details = `CRITICAL: ${vulns.length} unpatched CVEs found on public IP ${targetIp}.`;
      solution = "Immediately patch the vulnerable services and restrict network access.";
    } else if (openPorts.length > 2) {
      status = "warning";
      details = `Found ${openPorts.length} open ports on ${targetIp}.`;
      solution = "Review security groups to ensure no unnecessary ports are exposed to 0.0.0.0/0.";
    }

    return NextResponse.json({
      success: true,
      data: {
        name: "External Attack Surface (EASM)",
        status,
        details,
        solution,
        link: `https://www.shodan.io/host/${targetIp}`,
        raw: {
          ip: targetIp,
          os: hostData.os,
          ports: openPorts,
          vulns: vulns
        }
      }
    });

  } catch (error) {
    console.error("Shodan error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
