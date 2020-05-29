import Report from './models/report';

const puppeteer = require('puppeteer');

export default class pdfGenerator {

    async generateReport() {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
        const username = await page.$('#username');
        await username.type('test');
        const password = await page.$('#password');
        await password.type('test');
        const login = await page.$('#login');
        await login.click();
        await page.waitFor(1000)

        const report = await Report.findOne({
            order: [['date', 'DESC']],
            offset: 1,
            where: {
              temporary: false,
            },
            attributes: ['id'],
          });
        await page.goto('http://localhost:3000/printReportView?reportId='  + report?.id, { waitUntil: 'networkidle2' });
        await page.pdf({ path: 'verslag.pdf', format: 'A4', printBackground: true });

        await browser.close();
    }

}


