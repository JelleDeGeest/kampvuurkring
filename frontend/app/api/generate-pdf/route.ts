import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json();

    if (!html) {
      return NextResponse.json({ error: 'HTML content is required' }, { status: 400 });
    }

    // Launch the browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Set viewport to ensure desktop layout, not mobile
    await page.setViewport({ width: 1280, height: 1024, deviceScaleFactor: 2 });

    // Emulate screen media to avoid print stylesheets hiding elements
    await page.emulateMediaType('screen');

    // Set the content
    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Calculate body height to ensure single-page if desired
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);

    // Use a custom height to fit all content (mimicking the "single page" behavior)
    // We add a tiny buffer (1px) to prevent scrollbar rendering, but otherwise trust the height.
    // Ensure at least some reasonable minimum to not break PDF process
    const finalHeight = Math.max(bodyHeight + 1, 500);

    const pdf = await page.pdf({
      printBackground: true,
      width: '210mm',
      height: `${Math.round(finalHeight)}px`,
      margin: {
        top: '0mm', // Margins are handled by the HTML padding
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
    });

    await browser.close();

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="inschrijvingsbewijs.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF with Puppeteer:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
