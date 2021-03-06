const nodemailer = require("nodemailer")
import pdfGenerator from './pdfgenerator'
import Report from './models/report';
import User from './models/user';
import Technical from './models/technical';
import Administrative from './models/administrative';
import Operational from './models/operational';

export default class cronServer{

    shiftswitch: number;

    constructor(hour: number){
        this.shiftswitch = hour;
    }

    cronTask(user:string, pass:string) {
        this.sendEmail(user, pass);
        this.makeNewReport();
        console.log("crontask");
    }

    sendEmail(user: string, pass:string) {
        let pg = new pdfGenerator();
        pg.generateReport();

        var transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
                ciphers: 'SSLv3'
            },
            auth: {
                user: user,
                pass: pass,
            }
        })
        var mailOptions = {
            from: '" Verslag Systeem " <' + user + '>', // sender address (who sends)
            to: this.getEmails(), // list of receivers (who receives)
            subject: 'Verslag van ' + new Date().getDate() + "/" + (new Date().getMonth() + 1), // Subject line
            text: 'Beste, \n \n In bijlage het verslag van de vorige shift ', // plaintext body
            attachments: [
                {
                    path: './verslag.pdf'
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
        const currDate: Date = new Date();
        let shift: boolean;
        if(currDate.getHours() >= this.shiftswitch && currDate.getHours() < this.shiftswitch + 12){
            shift = false;
        }
        else{
            shift = true;
        }
        const report = new Report({
            date: Date.now(),
            nightShift: shift,
            temporary: false,
        });
        report.save();          
        const technical = new Technical({
            reportId: report.id,
          });
        technical.save();
        const administrative = new Administrative({
            reportId: report.id,
          });
        administrative.save();
        const operational = new Operational({
            reportId: report.id,
          });
        operational.save();
    }

    async getEmails() {
        let emails = await User.findAll({
            where: {
                subscription: true,
            },
            attributes: ['email']
        })
        console.log(emails);

        return emails;
    }


}
