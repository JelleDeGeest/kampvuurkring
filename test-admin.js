const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Listen for console logs
  page.on('console', (msg) => {
    if (msg.text().includes('EnrollmentResponsesLink')) {
      console.log('CONSOLE:', msg.text());
    }
  });
  
  // Listen for errors
  page.on('pageerror', (error) => {
    console.log('PAGE ERROR:', error.message);
  });
  
  try {
    await page.goto('http://localhost:3000/admin/collections/activiteiten/1');
    await page.waitForTimeout(5000); // Wait for page to load
    
    // Take a screenshot
    await page.screenshot({ path: 'admin-screenshot.png' });
    console.log('Screenshot saved');
  } catch (error) {
    console.log('Error:', error.message);
  }
  
  await browser.close();
})();