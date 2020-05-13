const cron = require("node-cron");
const nodemailer = require("nodemailer")
import pdfGenerator from './pdfgenerator'
import Report from './models/report';

export default class cronServer{

    constructor(hour: number){
        // cron.schedule("* "+ hour.toString+ " * * *", this.cronTask)
        // this.cronTask();
    }

    cronTask(){
        this.sendEmail();
        // this.makeNewReport();
    }

    sendEmail() {
        let pg = new pdfGenerator();
        pg.generateReport();

        var transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
            ciphers:'SSLv3'
            },
            auth: {
                user: '',
                pass: '',
            }
        })

        var mailOptions = {
            from: '" Verslag Systeem " <dieter09@live.be>', // sender address (who sends)
            to: 'dieter.warson@student.uhasselt.be, dieter09@live.be', // list of receivers (who receives)
            subject: 'test ', // Subject line
            text: 'Hello world ', // plaintext body
            attachments: [
                {
                    path: './page.pdf'
                }
            ]
        };

        transporter.sendMail(mailOptions, function(error:any, info:any){
            if(error){
                return console.log(error);
            }
        
            console.log('Message sent: ' + info.response);
        });

    }

    makeNewReport() {
        const report1 = new Report({
            date: new Date('2020/03/16 21:13:48'),
            temporary: false,
            nightShift: true,
          });
          // report1.save();          
    }

    
}