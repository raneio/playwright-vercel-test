const playwright = require("playwright");

module.exports = async (req, res) => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://wikipedia.org/");
  const pageTitle = await page.title();
  await browser.close();

  res.json({
    pageTitle: pageTitle,
  });
};
