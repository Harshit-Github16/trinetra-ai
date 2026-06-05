import { NextResponse } from 'next/server';
const dns = require('dns').promises;

export async function POST(request) {
  try {
    const { domain, selector } = await request.json();

    if (!domain || !selector || typeof domain !== 'string' || typeof selector !== 'string') {
      return NextResponse.json({
        success: false,
        message: 'Domain and selector parameters are required.'
      }, { status: 400 });
    }

    const dkimDomain = `${selector.trim()}._domainkey.${domain.trim()}`;
    try {
      const records = await dns.resolveTxt(dkimDomain);
      const rawRecord = records.map(r => r.join(' ')).join('\n');
      
      return NextResponse.json({
        success: true,
        dkimDomain,
        found: true,
        record: rawRecord
      });
    } catch (dnsErr) {
      return NextResponse.json({
        success: true,
        dkimDomain,
        found: false,
        message: `DKIM record not found: ${dnsErr.message}`
      });
    }
  } catch (error) {
    console.error('Error in DKIM resolution endpoint:', error);
    return NextResponse.json({
      success: false,
      message: `Failed to resolve DKIM record: ${error.message}`
    }, { status: 550 });
  }
}
