const minimist = require('minimist'); // 解析命令行传入参数的库
const puppeteer = require('puppeteer'); // 实现截图操作的库
const { v4: uuidV4 } = require('uuid'); // 生成UUID的库

// 检查项目当前的运行环境是否是 node 
if (process) {
    // 获取命令行传入的参数
    const args = minimist(process.argv.slice(2));
    console.info('[FullWebpageScreenshot] 命令行传入的参数：', args);

    // 检查命令行中是否传入 targetUrl 参数
    if (args['targetUrl']) {
        (async () => {
            // Launch the browser and open a new blank page
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // Navigate the page to a URL
            await page.goto(args['targetUrl']);

            // Set screen size
            await page.setViewport({ width: 2560, height: 1600 });

            const _photoName = `photos/example__${uuidV4()}.png`;
            await page.screenshot({ path: _photoName, fullPage: true });
            console.info('[FullWebpageScreenshot] 截图成功！截图名称为：', _photoName);

            await browser.close();
        })();
    } else {
        console.error('[FullWebpageScreenshot] 正确完成截图操作需要传入 targetUrl 参数！')
    }
} else {
    console.error('[FullWebpageScreenshot] 项目仅能在 Node.js 环境运行！')
}
