const sleep = require('sleep');
const puppeteer = require('puppeteer');
 
(async () => {
  
  let browser;

  if(process.env.MS_INTERNAL_BROWSER) {
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

  await page.goto('http://192.168.0.1/');
  //await page.waitForSelector('[type=password]');
  await page.type("#Password_m", process.env.PASSWORD);
  await page.evaluate(() => { document.querySelector('.tablet > [type=button]').click(); });  

  await page.screenshot({path: 'screens/login.png'});


  await page.goto('http://192.168.0.1/?status_restart&mid=StatusRestart');
  await page.screenshot({path: 'screens/restart-page.png'});
  
  await page.waitFor("#PAGE_RESTART_RESTART");
  await page.click("#PAGE_RESTART_RESTART");

  await page.screenshot({path: 'screens/before-restart.png'});  
  await page.click("#PAGE_RESTART_POPUP_APPLY");
  await browser.close();
})();