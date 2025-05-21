import { BrowserPool, PlaywrightPlugin } from '@crawlee/browser-pool';
import { chromium, webkit, firefox } from 'playwright-core';


const browserPool = new BrowserPool({
        browserPlugins: [
            new PlaywrightPlugin(chromium, {
                // executablePath: path.join(chromium.executablePath()),
                launchOptions: {
                    headless: true,
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-blink-features=AutomationControlled',
                        '--disable-infobars'
                    ],
                },
                useIncognitoPages: true,
                useFingerprints: true,
            }),
        ],
        retireBrowserAfterPageCount: 10,
        retireInactiveBrowserAfterSecs: 360,
        closeInactiveBrowserAfterSecs: 360,
});

let page = await browserPool.newPage();
await page.goto('https://google.com', { waitUntil: 'domcontentloaded' });
await page.close();
await browserPool.destroy();

