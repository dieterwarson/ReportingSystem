import express, { Request, Response, NextFunction } from "express";
import { BAD_REQUEST } from "http-status-codes";
import "express-async-errors";

import BaseRouter from "./routes";
import logger from "@shared/Logger";
import { Sequelize } from "sequelize-typescript";
import Report from "./models/report";
import OperationalEvent from "./models/operationalEvent";
import SecretariatNotification from "./models/secretariatNotification";
import Author from "./models/user";
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
const cors = require("cors");





// var index = require('./routes/index');
// var users = require('./routes/users');

// Init express
const app = express();


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

// Add APIs
app.use("/api", BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

// add sequelize
const sequelize = new Sequelize({
  database: "reports",
  dialect: "mysql",
  username: "root",
  password: "mysqlroot",
  models: [__dirname + "/models"], // or [Player, Team],
});

sequelize.sync();
console.log("All models were synchronized successfully.");

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

app.get("*", (req: Request, res: Response) => {
  res.sendFile("index.html", { root: staticDir });
});

/************************************************************************************
 *                              Add hardcoded reports data to db
 ***********************************************************************************/

 // Belangrijk:
 // Elke keer dat de container opnieuw gestart wordt, is de database leeg
 // Om de volgende data toe te voegen, moeten de save()'s oncomment worden
 // Na eenmaal toevoegen, dus eenmaal herstarten via nodemon, moeten de save()'s terug gecomment worden
 // Anders wordt elke keer nodemon hetstart opnieuw al deze kolommen toegevoegd

const author1 = new Author({
    username: "jan_janssens",
    password: "",
    accessRights: 0
})
// author1.save();

 const report1 = new Report({
     authorId: 1,
     date: new Date("2020/03/16 21:13:48"),
     temporary: false
 })
 // report1.save();

const operationalEvent1 = new OperationalEvent({
  operationalTypeId: 1,
  signaling: "Verlies inschrijvingsbewijs",
  plNumber: null,
  description: null,
  location: null,
  unit: "KEMPLA",
  date: new Date("2020/03/16 18:13:48"),
});
// operationalEvent1.save();

const operationalEvent2 = new OperationalEvent({
  operationalTypeId: 2,
  signaling: null,
  plNumber: "PL031770168",
  description: null,
  location: null,
  unit: "CARMA",
  date: new Date("2020/03/16 21:34:37"),
});
// operationalEvent2.save();

const operationalEvent3 = new OperationalEvent({
  operationalTypeId: 3,
  signaling: null,
  plNumber: "PL03170104",
  description: null,
  location: null,
  unit: "HANO",
  date: new Date("2020/03/16 22:05:18"),
});
// operationalEvent3.save();

const operationalEvent4 = new OperationalEvent({
  operationalTypeId: 4,
  signaling: "Seining persoon",
  plNumber: null,
  description: null,
  location: null,
  unit: "LAMA",
  date: new Date("2020/03/16 23:34:33"),
});
// operationalEvent4.save();

const operationalEvent5 = new OperationalEvent({
  operationalTypeId: 5,
  signaling: "Seining persoon",
  plNumber: null,
  description: null,
  location: null,
  unit: "LOON",
  date: new Date("2020/03/16 23:57:10"),
});
// operationalEvent5.save();

const operationalEvent6 = new OperationalEvent({
  operationalTypeId: 6,
  signaling: "Seining persoon",
  plNumber: "PL03170202",
  description: null,
  location: null,
  unit: "BIHORI",
  date: new Date("2020/03/16 00:18:57"),
});
// operationalEvent6.save();

const operationalEvent7 = new OperationalEvent({
  operationalTypeId: 7,
  signaling: null,
  plNumber: "PL03170104",
  description: null,
  location: null,
  unit: "HANO",
  date: new Date("2020/03/16 00:45:45"),
});
// operationalEvent7.save();

const operationalEvent8 = new OperationalEvent({
  operationalTypeId: 8,
  signaling: null,
  plNumber: "PL03170315",
  description: null,
  location: null,
  unit: "LRH",
  date: new Date("2020/03/16 01:21:25"),
});
// operationalEvent8.save();

const operationalEvent9 = new OperationalEvent({
  operationalTypeId: 9,
  signaling: null,
  plNumber: "PL03170322",
  description: null,
  location: null,
  unit: "LRH",
  date: new Date("2020/03/16 01:51:47"),
});
// operationalEvent9.save();

const secretariatNotification1 = new SecretariatNotification({
  monitoring: true,
  date: new Date("2020/03/16 19:19:49"),
  shift: true,
  description: "Jan Janssens Inp ziek",
});
// secretariatNotification1.save();

const secretariatNotification2 = new SecretariatNotification({
  monitoring: true,
  date: new Date("2020/03/16 19:21:46"),
  shift: true,
  description: "Remans Luc Inp ziek",
});
// secretariatNotification2.save();

/************************************************************************************
 *                              AXIOS
 ***********************************************************************************/
app.post('/addReport', (req, res) => {
    res.send({
        message: "your plnumber: ${req.plnumber}"
    })
})


// Export express instance
export default app;
