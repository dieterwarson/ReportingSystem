const puppeteer = require('puppeteer');

export default class pdfGenerator{

    async generateReport(){
        const browser = await puppeteer.launch({args: ['--no-sandbox']});
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/reportView?reportId=1', {waitUntil: 'networkidle2'});
        await page.pdf({path: 'page.pdf', format: 'A4', printBackground: true});

        await browser.close();
    }

}


