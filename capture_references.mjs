import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REF_DIR = path.join(__dirname, 'brand_assets', 'reference_sites');

if (!fs.existsSync(REF_DIR)) fs.mkdirSync(REF_DIR, { recursive: true });

async function captureSite(url) {
  let browser;
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `${domain}_${timestamp}.png`;
    const outPath = path.join(REF_DIR, filename);

    console.log(`📸 Capturing ${url}...`);

    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    
    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Wait a bit for animations/lazy loading
    await new Promise(r => setTimeout(r, 2000));

    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`✅ Saved reference to ${outPath}`);
  } catch (err) {
    console.error(`❌ Failed to capture ${url}: ${err.message}`);
  } finally {
    if (browser) await browser.close();
  }
}

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.log('Usage: node capture_references.mjs <url1> <url2> ...');
  process.exit(1);
}

for (const url of urls) {
  await captureSite(url);
}
