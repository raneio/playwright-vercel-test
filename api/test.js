const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const pageTitle = await page.title();
  
  await browser.close();

  res.json({
    pageTitle: pageTitle,
  });
};
