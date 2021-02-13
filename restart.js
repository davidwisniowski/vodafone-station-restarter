const puppeteer = require('puppeteer');
const screenFolder = 'screens/'
 
(async () => {
  
  let browser;

  if(process.env.INTERNAL_BROWSER) {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      width: 1920,
      height: 1080
    });
  } else {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox']
    });
  }

  const page = await browser.newPage();

  // workaround for console log, use event
  page.on('console', msg => {
    for (let i = 0; i < msg.args().length; ++i)
      console.log(`${i}: ${msg.args()[i]}`);
  });

  // login
  await page.goto(process.env.STATION_ADDRESS);
  await page.type("#Password_m", process.env.PASSWORD);
  await page.evaluate(() => { document.querySelector('.tablet > [type=button]').click(); });  

  if(process.env.DEBUG) await page.screenshot({path: screenFolder + 'login.png'});

  // goto: restart page
  await page.goto(process.env.STATION_ADDRESS + '?status_restart&mid=StatusRestart');
  if(process.env.DEBUG) await page.screenshot({path: screenFolder + 'restart-page.png'});
  
  // wait for: restart popup  
  await page.waitFor("#PAGE_RESTART_RESTART");
  await page.click("#PAGE_RESTART_RESTART");
  if(process.env.DEBUG) await page.screenshot({path: screenFolder + 'before-restart.png'});  

  // action: restart
  await page.click("#PAGE_RESTART_POPUP_APPLY1");

  await browser.close();
})();