const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function extractText() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Wait for splash screen to complete (1.5s)
  await new Promise(r => setTimeout(r, 2000));

  // Scroll smoothly down the page to trigger all IntersectionObservers / typing
  await page.evaluate(async () => {
    const distance = 400;
    const delay = 100;
    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance);
      await new Promise(r => setTimeout(r, delay));
    }
  });

  // Wait for typing animations in CTA to finish
  await new Promise(r => setTimeout(r, 2000));

  // Scroll back to top
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 500));

  // Extract visible text in DOM order
  const extracted = await page.evaluate(() => {
    const results = [];

    function isVisible(el) {
      if (!el) return false;
      if (el.getAttribute && el.getAttribute('aria-hidden') === 'true') return false;
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') return false;
      return true;
    }

    function walk(node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (!isVisible(node)) return;

        const tagName = node.tagName.toLowerCase();
        if (tagName === 'script' || tagName === 'style' || tagName === 'noscript' || tagName === 'svg') {
          return;
        }

        // Check img alt
        if (tagName === 'img' && node.alt && node.alt.trim()) {
          results.push(`[alt] ${node.alt.trim()}`);
        }

        // Check input/textarea placeholder
        if ((tagName === 'input' || tagName === 'textarea') && node.placeholder && node.placeholder.trim()) {
          results.push(`[placeholder] ${node.placeholder.trim()}`);
        }

        for (const child of node.childNodes) {
          walk(child);
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (text) {
          if (isVisible(node.parentElement)) {
            results.push(text);
          }
        }
      }
    }

    walk(document.body);
    return results;
  });

  await browser.close();
  return extracted;
}

const outputFile = process.argv[2] || 'text-after.txt';

extractText().then(items => {
  console.log(`Extracted ${items.length} items`);
  fs.writeFileSync(outputFile, items.join('\n'), 'utf8');
  console.log(`Saved to ${outputFile}`);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
