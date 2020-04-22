import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import { Sequelize } from 'sequelize-typescript';
import Report from './models/report';
import OperationalEvent from './models/operationalEvent';
import SecretariatNotification from './models/secretariatNotification';
import User from './models/user';
import DummyDatabase from './models/dummyDataBase';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import Defect from './models/defect';
import Malfunction from './models/malfunction';
import Replacement from './models/replacement';
import WorkplaceEvent from './models/workplaceEvent';
import Technical from './models/technical';
import Administrative from './models/administrative';
import Operational from './models/operational';
const cors = require('cors');

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
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

// Add sequelize
const sequelize = new Sequelize({
  database: 'reports',
  dialect: 'mysql',
  username: 'root',
  password: 'mysqlroot',
  models: [__dirname + '/models'], // or [Player, Team],
});

sequelize.sync();
console.log('All models were synchronized successfully.');

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.get('*', (req: Request, res: Response) => {
  res.sendFile('index.html', { root: staticDir });
});

/************************************************************************************
 *                              Add hardcoded reports data to db
 ***********************************************************************************/

// Belangrijk:
// Elke keer dat de container opnieuw gestart wordt, is de database leeg
// Om de volgende data toe te voegen, moeten de save()'s oncomment worden
// Na eenmaal toevoegen, dus eenmaal herstarten via nodemon, moeten de save()'s terug gecomment worden
// Anders wordt elke keer nodemon hetstart opnieuw al deze kolommen toegevoegd

const user1 = new User({
  username: 'jan_janssens',
  password: '',
  accessRights: 0,
});
// user1.save();

const report1 = new Report({
  date: new Date('2020/03/16 21:13:48'),
  temporary: false,
});
// report1.save();

// heeft geen columns
const technical1 = new Technical({
  reportId: 1,
});
// technical1.save();

// heeft geen columns
const administrative1 = new Administrative({
  reportId: 1,
});
// administrative1.save();

// heeft geen columns
const operational1 = new Operational({
  reportId: 1,
});
// operational1.save();

const operationalEvent1 = new OperationalEvent({
  operationalId: 1,
  authorId: 1,
  operationalTypeId: 1,
  monitoring: true,
  signaling: 'Verlies inschrijvingsbewijs',
  plNumber: null,
  description: null,
  location: null,
  unit: 'KEMPLA',
  date: new Date('2020/03/16 18:13:48'),
});
//  operationalEvent1.save();

const operationalEvent2 = new OperationalEvent({
  operationalId: 1,
  authorId: 1,
  operationalTypeId: 2,
  monitoring: true,
  signaling: null,
  plNumber: 'PL031770168',
  description: null,
  location: null,
  unit: 'CARMA',
  date: new Date('2020/03/16 21:34:37'),
});
//  operationalEvent2.save();

const operationalEvent3 = new OperationalEvent({
  operationalId: 1,
  authorId: 1,
  operationalTypeId: 3,
  monitoring: true,
  signaling: null,
  plNumber: 'PL03170104',
  description: null,
  location: null,
  unit: 'HANO',
  date: new Date('2020/03/16 22:05:18'),
});
//  operationalEvent3.save();

const operationalEvent4 = new OperationalEvent({
  operationalId: 1,
  authorId: 1,
  operationalTypeId: 4,
  monitoring: true,
  signaling: 'Seining persoon',
  plNumber: null,
  description: null,
  location: null,
  unit: 'LAMA',
  date: new Date('2020/03/16 23:34:33'),
});
//  operationalEvent4.save();

const operationalEvent5 = new OperationalEvent({
  operationalId: 1,
  authorId: 1,
  operationalTypeId: 5,
  monitoring: true,
  signaling: 'Seining persoon',
  plNumber: null,
  description: null,
  location: null,
  unit: 'LOON',
  date: new Date('2020/03/16 23:57:10'),
});
//  operationalEvent5.save();

const operationalEvent6 = new OperationalEvent({
  operationalId: 1,
  authorId: 1,
  operationalTypeId: 6,
  monitoring: true,
  signaling: 'Seining persoon',
  plNumber: 'PL03170202',
  description: null,
  location: null,
  unit: 'BIHORI',
  date: new Date('2020/03/16 00:18:57'),
});
//  operationalEvent6.save();

const operationalEvent7 = new OperationalEvent({
  operationalId: 1,
  authorId: 1,
  operationalTypeId: 7,
  monitoring: true,
  signaling: null,
  plNumber: 'PL03170104',
  description: null,
  location: null,
  unit: 'HANO',
  date: new Date('2020/03/16 00:45:45'),
});
//  operationalEvent7.save();

const operationalEvent8 = new OperationalEvent({
  operationalId: 1,
  authorId: 1,
  operationalTypeId: 8,
  monitoring: true,
  signaling: null,
  plNumber: 'PL03170315',
  description: null,
  location: null,
  unit: 'LRH',
  date: new Date('2020/03/16 01:21:25'),
});
//  operationalEvent8.save();

const operationalEvent9 = new OperationalEvent({
  operationalId: 1,
  authorId: 1,
  operationalTypeId: 9,
  monitoring: true,
  signaling: null,
  plNumber: 'PL03170322',
  description: null,
  location: null,
  unit: 'LRH',
  date: new Date('2020/03/16 01:51:47'),
});
//  operationalEvent9.save();

const secretariatNotification1 = new SecretariatNotification({
  administrativeId: 1,
  authorId: 1,
  monitoring: true,
  date: new Date('2020/03/16 19:19:49'),
  shift: true,
  description: 'Jan Janssens Inp ziek',
});
//  secretariatNotification1.save();

const secretariatNotification2 = new SecretariatNotification({
  administrativeId: 1,
  authorId: 1,
  monitoring: true,
  date: new Date('2020/03/16 19:21:46'),
  shift: true,
  description: 'Remans Luc Inp ziek',
});
// secretariatNotification2.save();

const dummyData1 = new DummyDatabase({
  plNumber: 'PL12536432',
  unit: 'CARMA',
  location: 'Markt 37, 3740 Bilzen',
  date: new Date('2020/04/13 12:40:32'),
  actions: 'NAV zelfmoord te Overpelt',
});
// dummyData1.save();

const defect1 = new Defect({
  technicalId: 1,
  authorId: 1,
  defectTypeId: 1,
  description: 'lekkende kraan in kamer 304',
  monitoring: true,
  date: new Date('2020/04/15 13:03:57'),
});
// defect1.save();

const defect2 = new Defect({
  technicalId: 1,
  authorId: 1,
  defectTypeId: 2,
  description: 'krakende deur in kamer 512',
  monitoring: true,
  date: new Date('2020/04/15 16:58:34'),
});
// defect2.save();

const malfunction1 = new Malfunction({
  technicalId: 1,
  authorId: 1,
  malfunctionTypeId: 1,
  description: 'lekkende kraan in kamer 304',
  monitoring: true,
  date: new Date('2020/04/15 13:03:57'),
  duration: 6,
});
// malfunction1.save();

const replacement1 = new Replacement({
  administrativeId: 1,
  authorId: 1,
  absentee: 'Jan Jacobs',
  substitute: 'Geordy Hendricks',
  monitoring: true,
  date: new Date('2020/03/30 15:46:36'),
  shift: true,
});
// replacement1.save();

const workplaceEvent1 = new WorkplaceEvent({
  administrativeId: 1,
  authorId: 1,
  workplaceTypeId: 1,
  description: 'Jacob sleutelbeen gebroken',
  absentee: 'Jacob Franssen',
  substitute: 'James Brook',
  monitoring: true,
  date: new Date('2020/12/11 9:10:23'),
  shift: false,
});
// workplaceEvent1.save();

/************************************************************************************
 *                              AXIOS
 ***********************************************************************************/
app.post('/addReport', async (req, res) => {
  console.log(req.body.plNumber);
  const file = await DummyDatabase.findOne({
    where: {
      plNumber: req.body.plNumber,
    },
  });
  if (file !== null) {
    res.send(file);
  } else {
    console.log('file is empty');
  }
});

// Export express instance
export default app;
