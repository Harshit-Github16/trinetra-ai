import { NextResponse } from 'next/server';
import net from 'net';

const checkPort = (port, host) => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let status = 'closed';

    socket.setTimeout(2000); // 2 second timeout per port

    socket.on('connect', () => {
      status = 'open';
      socket.destroy();
    });

    socket.on('timeout', () => {
      status = 'closed';
      socket.destroy();
    });

    socket.on('error', () => {
      status = 'closed';
    });

    socket.on('close', () => {
      resolve({ port, status });
    });

    socket.connect(port, host);
  });
};

export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    const criticalPorts = [21, 22, 23, 3306, 3389]; // FTP, SSH, Telnet, MySQL, RDP
    
    // We only scan a small subset of critical ports for the free feature to prevent long blocking
    const results = await Promise.all(criticalPorts.map(port => checkPort(port, domain)));
    
    const openPorts = results.filter(r => r.status === 'open').map(r => r.port);

    let status = "success";
    let details = `0 critical management ports exposed. (Scanned: 21, 22, 23, 3306, 3389)`;
    let solution = "Continue enforcing Zero Trust access policies.";

    if (openPorts.length > 0) {
      status = "danger";
      details = `${openPorts.length} critical management ports EXPOSED: ${openPorts.join(', ')}.`;
      solution = "Immediately block public access to these ports using Security Groups or Firewalls. Use a VPN or Bastion host for administrative access.";
    }

    return NextResponse.json({
      success: true,
      data: {
        name: "Shadow IT & Port Scan",
        status,
        details,
        solution,
        link: `https://www.shodan.io/search?query=${domain}`,
        raw: results
      }
    });

  } catch (error) {
    console.error("Port scan error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
