import { NextResponse } from 'next/server';
import tls from 'tls';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    return new Promise((resolve) => {
      const socket = tls.connect({
        port: 443,
        host: domain,
        servername: domain,
        rejectUnauthorized: false
      }, () => {
        const cert = socket.getPeerCertificate();
        if (!cert || Object.keys(cert).length === 0) {
          socket.destroy();
          resolve(NextResponse.json({
            success: true,
            data: {
              name: "SSL/TLS Security",
              status: "danger",
              details: "No SSL Certificate found on port 443.",
              solution: "Deploy an SSL certificate (e.g., Let's Encrypt) to secure transit.",
              link: null
            }
          }));
          return;
        }

        const validTo = new Date(cert.valid_to);
        const daysRemaining = Math.floor((validTo - new Date()) / (1000 * 60 * 60 * 24));
        const issuer = cert.issuer.O || cert.issuer.CN;

        let status = "success";
        let details = `Valid certificate issued by ${issuer}. Expires in ${daysRemaining} days.`;
        let solution = "Certificate is healthy. Set up automated renewal.";

        if (daysRemaining < 0) {
          status = "danger";
          details = `Certificate EXPIRED ${Math.abs(daysRemaining)} days ago!`;
          solution = "Renew certificate immediately to restore secure connections.";
        } else if (daysRemaining < 15) {
          status = "warning";
          details = `Certificate expires very soon (${daysRemaining} days).`;
          solution = "Ensure auto-renewal scripts (certbot) are functioning properly.";
        }

        socket.destroy();
        resolve(NextResponse.json({
          success: true,
          data: {
            name: "SSL/TLS Security",
            status,
            details,
            solution,
            link: `https://crt.sh/?q=${domain}`,
            raw: {
              issuer: cert.issuer,
              subject: cert.subject,
              valid_from: cert.valid_from,
              valid_to: cert.valid_to
            }
          }
        }));
      });

      socket.on('error', (error) => {
        resolve(NextResponse.json({
          success: true,
          data: {
            name: "SSL/TLS Security",
            status: "danger",
            details: `Failed to connect via HTTPS: ${error.message}`,
            solution: "Ensure port 443 is open and a web server is configured to handle HTTPS traffic.",
            link: null
          }
        }));
      });
      
      socket.setTimeout(5000, () => {
          socket.destroy();
          resolve(NextResponse.json({
            success: true,
            data: {
                name: "SSL/TLS Security",
                status: "warning",
                details: "Connection timed out checking SSL.",
                solution: "Verify firewall rules allow inbound 443 traffic.",
                link: null
            }
          }));
      });
    });

  } catch (error) {
    console.error("SSL error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
