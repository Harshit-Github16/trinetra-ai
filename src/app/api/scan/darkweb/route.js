import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    if (!domain) return NextResponse.json({ success: false, error: "Domain is required" }, { status: 400 });

    const searchUrl = `https://ahmia.fi/search/?q=${encodeURIComponent(domain)}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error("Failed to reach Dark Web gateway.");
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    const results = [];
    $('.searchResults li.result').each((i, el) => {
      if (i >= 5) return false; // Only grab top 5 results
      
      const title = $(el).find('h4').text().trim();
      const cite = $(el).find('cite').text().trim();
      const snippet = $(el).find('p').text().trim();
      
      if (cite.includes('.onion')) {
        results.push({ title, url: cite, snippet });
      }
    });

    let status = "success";
    let details = "No mentions of this domain found on active Tor network indexes.";
    let solution = "Continue monitoring deep web repositories.";

    if (results.length > 0) {
      status = "danger";
      details = `CRITICAL: Found ${results.length} mentions of your domain on Tor (.onion) networks!`;
      solution = "Immediate investigation required. Your domain name or employee credentials may be listed on a Dark Web pastebin or marketplace.";
    }

    return NextResponse.json({
      success: true,
      data: {
        name: "Dark Web Crawler",
        status,
        details,
        solution,
        link: searchUrl,
        raw: results
      }
    });

  } catch (error) {
    console.error("DarkWeb scraper error:", error);
    return NextResponse.json({ 
      success: true, 
      data: {
        name: "Dark Web Crawler",
        status: "warning",
        details: "Tor gateway connection timed out. Could not complete deep web scan.",
        solution: "Retry the scan later or check your network firewall.",
        link: null
      }
    });
  }
}
