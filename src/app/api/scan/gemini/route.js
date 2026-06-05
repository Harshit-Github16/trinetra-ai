import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain, scanData } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    const API_KEY = process.env.GEMINI_API_KEY1;
    if (!API_KEY) {
      return NextResponse.json({ success: false, error: "API Key missing" }, { status: 500 });
    }

    const prompt = `
      You are an elite CISO (Chief Information Security Officer) AI Copilot. 
      Review the following cybersecurity scan results for the domain: ${domain}.
      
      Scan Data Summary:
      ${JSON.stringify(scanData)}
      
      Write a highly professional, concise 2-sentence executive summary of their security posture. 
      Include a specific recommendation based on the data. Be direct and authoritative. Do not use markdown.
    `;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await res.json();

    let summary = "AI analysis failed.";
    if (data.error) {
      summary = `AI Error: ${data.error.message}`;
      console.error("Gemini API Error:", data.error);
    } else if (data.candidates && data.candidates[0].content.parts[0].text) {
      summary = data.candidates[0].content.parts[0].text;
    } else {
      console.error("Gemini Unexpected Response:", data);
      summary = "AI analysis blocked due to safety filters or unexpected response format.";
    }

    return NextResponse.json({
      success: true,
      data: {
        name: "AI Security Copilot",
        status: "success",
        details: summary,
        solution: "Follow the AI recommendations.",
        link: null,
        raw: data
      }
    });

  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
