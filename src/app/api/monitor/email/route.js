import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({
        success: false,
        message: 'A valid email address is required.'
      }, { status: 400 });
    }

    const response = await fetch(`https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email.trim())}`, {
      headers: { 'User-Agent': 'TrinetraAI/1.0' }
    });

    if (response.status === 200) {
      const resJson = await response.json();
      return NextResponse.json({
        success: true,
        email,
        compromised: true,
        breachesCount: resJson.breaches[0]?.length || 0,
        databases: resJson.breaches[0] || []
      });
    } else if (response.status === 404) {
      return NextResponse.json({
        success: true,
        email,
        compromised: false,
        breachesCount: 0,
        databases: []
      });
    } else {
      throw new Error(`XposedOrNot returned status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error checking single email leaks:', error);
    return NextResponse.json({
      success: false,
      message: `Failed to query leak database: ${error.message}`
    }, { status: 500 });
  }
}
