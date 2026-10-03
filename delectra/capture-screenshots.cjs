const puppeteer = require('puppeteer-core');

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  // 1. Desktop 1440px
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900 });
  await desktopPage.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  await desktopPage.screenshot({ path: 'screenshot-desktop-hero.png' });

  // Scroll to Why Us
  await desktopPage.evaluate(() => {
    document.getElementById('why-us')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await desktopPage.screenshot({ path: 'screenshot-desktop-whyus.png' });

  // Scroll to Services
  await desktopPage.evaluate(() => {
    document.getElementById('services')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await desktopPage.screenshot({ path: 'screenshot-desktop-services.png' });

  // Scroll to Portfolio
  await desktopPage.evaluate(() => {
    document.getElementById('portfolio')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await desktopPage.screenshot({ path: 'screenshot-desktop-portfolio.png' });

  // Scroll to Testimonials
  await desktopPage.evaluate(() => {
    document.getElementById('results')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await desktopPage.screenshot({ path: 'screenshot-desktop-testimonials.png' });

  // Scroll to Contact
  await desktopPage.evaluate(() => {
    document.getElementById('connect')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await desktopPage.screenshot({ path: 'screenshot-desktop-contact.png' });

  // Scroll to Footer
  await desktopPage.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 1000));
  await desktopPage.screenshot({ path: 'screenshot-desktop-footer.png' });

  // 2. Mobile 390px
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true });
  await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  await mobilePage.screenshot({ path: 'screenshot-mobile-hero.png' });

  await mobilePage.evaluate(() => {
    document.getElementById('why-us')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await mobilePage.screenshot({ path: 'screenshot-mobile-whyus.png' });

  await mobilePage.evaluate(() => {
    document.getElementById('services')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await mobilePage.screenshot({ path: 'screenshot-mobile-services.png' });

  await mobilePage.evaluate(() => {
    document.getElementById('connect')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await mobilePage.screenshot({ path: 'screenshot-mobile-contact.png' });

  await browser.close();
  console.log('Screenshots captured successfully!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
