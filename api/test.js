const puppeteer = require('puppeteer');
const chromium = require('chrome-aws-lambda');

module.exports = async (req, res) => {

  console.log('process.env.ENVIRONMENT', process.env.ENVIRONMENT)
  console.log('puppeteer', puppeteer)

  const browser = (process.env.ENVIRONMENT === "development") 
    ? await puppeteer.launch() 
    : await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

  const page = await browser.newPage();
  await page.goto('https://example.com');

  const pageTitle = await page.title();
  await browser.close();

  res.json({
    pageTitle: pageTitle,
    nodeVersion: process.versions,
  });
};
