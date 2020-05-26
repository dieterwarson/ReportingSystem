import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';
import UserPermissions from './models/userPermissions';

const { QueryTypes } = require('sequelize');

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
import WorkplaceEvent from './models/workplaceEvent';
import Technical from './models/technical';
import Administrative from './models/administrative';
import Operational from './models/operational';
import DefectType from './models/defectType';
import DefectSubtype from './models/defectSubtype';
import MalfunctionType from './models/malfunctionType';
import MalfunctionSubtype from './models/malfunctionSubtype';
import WorkplaceSubtype from './models/workplaceSubtype';
import WorkplaceType from './models/workplaceType';
import EventType from './models/eventType';
import OperationalType from './models/operationalType';
import OperationalSubtype from './models/operationalSubtype';
const checkAuth = require('middleware/check-auth');
import cronServer from './cron'
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { Op } from "sequelize";
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
// Om de volgende data toe te voegen, moeten de save()'s uncomment worden
// Na eenmaal toevoegen, dus eenmaal herstarten via nodemon, moeten de save()'s terug gecomment worden
// Anders wordt elke keer nodemon hetstart opnieuw al deze kolommen toegevoegd



const user1 = new User({
  username: 'jan_janssens',
  password: '',
  accessRights: 0,
});
// user1.save();

const user2 = new User({
  username: 'chass_beerts',
  password: 'test',
  accessRights: 0,
});
//  user2.save();

const user = new User({
  username: 'test',
  password: '$2y$10$5lQ9MLhJ0Z1QviN9NM6kze79nmlqLOV54UEOfCBvvfrRYK69psKpO',
  accessRights: 0,
  email: 'chassbeerts@beerts.be',
  subscription: false,
  loggedIn: false,
})
user.save();

const report1 = new Report({
  date: new Date('2020/03/16 00:01:00'),
  temporary: false,
  nightShift: true,
});
// report1.save();

const report2 = new Report({
  date: new Date('2020/03/16 12:01:00'),
  temporary: false,
  nightShift: false,
});
// report2.save();

const report3 = new Report({
  date: new Date('2020/03/17 00:01:00'),
  temporary: false,
  nightShift: true,
});
// report3.save();

const report4 = new Report({
  date: new Date('2020/03/17 12:01:00'),
  temporary: false,
  nightShift: false,
});
// report4.save();

const report5 = new Report({
  date: new Date('2020/03/18 00:01:00'),
  temporary: false,
  nightShift: true,
});
// report5.save();

const report6 = new Report({
  date: new Date('2020/03/18 12:01:00'),
  temporary: false,
  nightShift: false,
});
// report6.save();

const report7 = new Report({
  date: new Date('2020/03/19 00:01:00'),
  temporary: false,
  nightShift: true,
});
// report7.save();

const report8 = new Report({
  date: new Date('2020/03/19 12:01:00'),
  temporary: false,
  nightShift: false,
});
// report8.save();

const report9 = new Report({
  date: new Date('2020/03/20 00:01:00'),
  temporary: false,
  nightShift: true,
});
// report9.save();

const report10 = new Report({
  date: new Date('2020/03/20 12:01:00'),
  temporary: false,
  nightShift: false,
});
// report10.save();

const report11 = new Report({
  date: new Date('2020/03/21 00:01:00'),
  temporary: false,
  nightShift: true,
});
// report11.save();

const report12 = new Report({
  date: new Date('2020/03/21 12:01:00'),
  temporary: false,
  nightShift: false,
});
// report12.save();

const report13 = new Report({
  date: new Date('2020/03/22 00:01:00'),
  temporary: false,
  nightShift: true,
});
// report13.save();

const report14 = new Report({
  date: new Date('2020/03/22 12:01:00'),
  temporary: false,
  nightShift: false,
});
// report14.save();

const report15 = new Report({
  date: new Date('2020/03/23 00:01:00'),
  temporary: false,
  nightShift: true,
});
// report15.save();

const report16 = new Report({
  date: new Date('2020/03/23 12:01:00'),
  temporary: false,
  nightShift: false,
});
// report16.save();

const report17 = new Report({
  date: new Date('2020/03/24 00:01:00'),
  temporary: false,
  nightShift: true,
});
// report17.save();

const report18 = new Report({
  date: new Date('2020/03/24 12:01:00'),
  temporary: false,
  nightShift: false,
});
// report18.save();


const technical1 = new Technical({
  reportId: 1,
});
// technical1.save();

const technical2 = new Technical({
  reportId: 2,
});
// technical2.save();

const technical3 = new Technical({
  reportId: 3,
});
// technical3.save();

const technical4 = new Technical({
  reportId: 4,
});
// technical4.save();

const technical5 = new Technical({
  reportId: 11,
});
// technical5.save();

const technical6 = new Technical({
  reportId: 12,
});
// technical6.save();


const administrative1 = new Administrative({
  reportId: 1,
});
// administrative1.save();

const administrative2 = new Administrative({
  reportId: 3,
});
// administrative2.save();

const administrative3 = new Administrative({
  reportId: 5,
});
// administrative3.save();

const administrative4 = new Administrative({
  reportId: 6,
});
// administrative4.save();

const administrative5 = new Administrative({
  reportId: 13,
});
// administrative5.save();

const administrative6 = new Administrative({
  reportId: 14,
});
// administrative6.save();

const administrative7 = new Administrative({
  reportId: 15,
});
// administrative7.save();

const administrative8 = new Administrative({
  reportId: 16,
});
// administrative8.save();


const operational1 = new Operational({
  reportId: 2,
});
// operational1.save();

const operational2 = new Operational({
  reportId: 4,
});
// operational2.save();

const operational3 = new Operational({
  reportId: 5,
});
// operational3.save();

const operational4 = new Operational({
  reportId: 7,
});
// operational4.save();

const operational5 = new Operational({
  reportId: 8,
});
// operational5.save();

const operational6 = new Operational({
  reportId: 9,
});
// operational6.save();

const operational7 = new Operational({
  reportId: 10,
});
// operational7.save();

const operational8 = new Operational({
  reportId: 16,
});
// operational8.save();

const operational9 = new Operational({
  reportId: 17,
});
// operational9.save();

const operational10 = new Operational({
  reportId: 18,
});
// operational10.save();


const workplaceEvent1 = new WorkplaceEvent({
  authorId: 1,
  administrativeId: 1,
  workplaceTypeId: 1,
  workplaceSubtypeId: 1,
  description: 'Jacob sleutelbeen gebroken',
  absentee: 'Jacob Franssen',
  substitute: 'James Brook',
  monitoring: true,
  date: new Date('2020/03/16 9:10:23'),
});
// workplaceEvent1.save();

const workplaceEvent2 = new WorkplaceEvent({
  authorId: 2,
  administrativeId: 4,
  workplaceTypeId: 2,
  workplaceSubtypeId: 1,
  description: 'Ziekte',
  absentee: 'Remans Luc',
  substitute: 'Jan Janssens',
  monitoring: true,
  date: new Date('2020/03/18 13:03:14'),
});
// workplaceEvent2.save();

const workplaceEvent3 = new WorkplaceEvent({
  authorId: 1,
  administrativeId: 5,
  workplaceTypeId: 1,
  workplaceSubtypeId: 1,
  description: 'Hans verstuikte voet',
  absentee: 'Hans Hendrickx',
  substitute: 'Adam Franssen',
  monitoring: true,
  date: new Date('2020/03/22 7:59:34'),
});
// workplaceEvent3.save();

const workplaceEvent4 = new WorkplaceEvent({
  authorId: 2,
  administrativeId: 6,
  workplaceTypeId: 2,
  workplaceSubtypeId: 1,
  description: 'Ziekte',
  absentee: 'James Brook',
  substitute: 'Jacob Franssen',
  monitoring: false,
  date: new Date('2020/03/22 19:00:54'),
});
// workplaceEvent4.save();

const workplaceEvent5 = new WorkplaceEvent({
  authorId: 2,
  administrativeId: 6,
  workplaceTypeId: 2,
  workplaceSubtypeId: 1,
  description: 'Ziekte',
  absentee: 'Jan Janssens',
  substitute: 'Remans Luc',
  monitoring: true,
  date: new Date('2020/03/22 20:26:14'),
});
// workplaceEvent5.save();


const workplaceType1 = new WorkplaceType({
  typeName: 'Arbeidsongeval',
});
// workplaceType1.save();

const workplaceType2 = new WorkplaceType({
  typeName: 'Ziekte',
});
// workplaceType2.save();


const secretariatNotification1 = new SecretariatNotification({
  authorId: 2,
  administrativeId: 6,
  description: 'Jan Janssens Inp ziek',
  monitoring: true,
  date: new Date('2020/03/22 20:30:46'),
});
//  secretariatNotification1.save();

const secretariatNotification2 = new SecretariatNotification({
  authorId: 2,
  administrativeId: 4,
  description: 'Remans Luc Inp ziek',
  monitoring: true,
  date: new Date('2020/03/18 13:05:24'),
});
// secretariatNotification2.save();

const secretariatNotification3 = new SecretariatNotification({
  authorId: 2,
  administrativeId: 6,
  description: 'James Brook Inp ziek',
  monitoring: false,
  date: new Date('2020/03/22 19:06:54'),
});
// secretariatNotification3.save();


const operationalEvent1 = new OperationalEvent({
  authorId: 2,
  operationalId: 1,
  signaling: 'Verlies inschrijvingsbewijs CIM NR 545102920 / 1ABC123',
  plNumber: null,
  description: null,
  location: null,
  unit: 'KEMPLA',
  date: new Date('2020/03/16 18:13:48'),
});
//  operationalEvent1.save();

const operationalEvent2 = new OperationalEvent({
  authorId: 2,
  operationalId: 2,
  signaling: null,
  plNumber: 'PL031770168',
  description: 'Lokalisatie gsmnr via provider, Nav onrustwekkende verdwijning meerderjarige : zelfmoordbericht',
  location: null,
  unit: 'CARMA',
  date: new Date('2020/03/16 21:34:37'),
});
//  operationalEvent2.save();

const operationalEvent3 = new OperationalEvent({
  authorId: 2,
  operationalId: 4,
  signaling: null,
  plNumber: 'PL03170104',
  description: 'Verwittigen labo, verwittigen team Vandevoorde',
  location: null,
  unit: 'HANO',
  date: new Date('2020/03/16 22:05:18'),
});
//  operationalEvent3.save();

const operationalEvent4 = new OperationalEvent({
  authorId: 2,
  operationalId: 5,
  signaling: 'Seining Jan Jansens - PZ LAMA',
  plNumber: null,
  description: null,
  location: null,
  unit: 'LAMA',
  date: new Date('2020/03/16 23:34:33'),
});
//  operationalEvent4.save();

const operationalEvent5 = new OperationalEvent({
  authorId: 2,
  operationalId: 5,
  signaling: 'Seining persoon - Jan Jansens - PZ LOON',
  plNumber: null,
  description: null,
  location: null,
  unit: 'LOON',
  date: new Date('2020/03/16 23:57:10'),
});
//  operationalEvent5.save();

const operationalEvent6 = new OperationalEvent({
  authorId: 2,
  operationalId: 6,
  signaling: 'Seining Jan Jansens - PZ Bihori',
  plNumber: 'PL03170202',
  description: `ONRUSTWEKKENDE VERDWIJNING MEERDERJARIGE
  86 J dame vertrok te voet vanuit haar woning omstreeks 1600 u en keerde niet weer.
  
  Zoeking met Heli leverde niets op - einde 0015 u`,
  priority: true,
  location: null,
  unit: 'BIHORI',
  date: new Date('2020/03/17 00:18:57'),
});
//  operationalEvent6.save();

const operationalEvent7 = new OperationalEvent({
  authorId: 2,
  operationalId: 8,
  signaling: null,
  plNumber: 'PL03170315',
  description: `Autodiefstal te Rummen straat van een Mercedes E300
  - Melding binnen 101 Limburg
  - ANPR Hit te Nieuwerkerken richting Herk de Stad
  - Voertuig onderschept te Herk de Stad`,
  location: null,
  unit: 'LRH',
  date: new Date('2020/03/17 01:21:25'),
});
//  operationalEvent7.save();

const operationalEvent8 = new OperationalEvent({
  authorId: 2,
  operationalId: 9,
  signaling: null,
  plNumber: 'PL03170322',
  description: `Inbraak in woning doch tussen melding en twee dagen ervoor. Geen BIN opgestart door onduidelijk tijdstip.`,
  location: null,
  unit: 'LRH',
  date: new Date('2020/03/17 01:21:25'),
});
//  operationalEvent8.save();

const operationalEvent9 = new OperationalEvent({
  authorId: 1,
  operationalId: 8,
  signaling: 'Seining Alfred Brouns - PZ LAMA',
  plNumber: null,
  description: null,
  location: null,
  unit: 'LAMA',
  date: new Date('2020/03/23 13:21:25'),
});
//  operationalEvent9.save();

const operationalEvent10 = new OperationalEvent({
  authorId: 2,
  operationalId: 9,
  signaling: 'Seining Erica De Beeck - PZ LOON',
  plNumber: null,
  description: null,
  location: null,
  unit: 'LOON',
  date: new Date('2020/03/24 02:21:25'),
});
//  operationalEvent10.save();


const eventType1 = new EventType({
  operationalEventId: 4,
  operationalTypeId: 5,
  operationalSubtypeId: 3,
});
// eventType1.save();

const eventType2 = new EventType({
  operationalEventId: 1,
  operationalTypeId: 5,
  operationalSubtypeId: 1,
});
// eventType2.save();

const eventType3 = new EventType({
  operationalEventId: 7,
  operationalTypeId: 6,
  operationalSubtypeId: null,
});
// eventType3.save();

const eventType4 = new EventType({
  operationalEventId: 8,
  operationalTypeId: 5,
  operationalSubtypeId: 1,
});
// eventType4.save();

const eventType5 = new EventType({
  operationalEventId: 6,
  operationalTypeId: 5,
  operationalSubtypeId: 1,
});
// eventType5.save();

const eventType6 = new EventType({
  operationalEventId: 7,
  operationalTypeId: 1,
  operationalSubtypeId: null,
});
// eventType6.save();

const eventType7 = new EventType({
  operationalEventId: 8,
  operationalTypeId: 3,
  operationalSubtypeId: null,
});
// eventType7.save();

const eventType8 = new EventType({
  operationalEventId: 2,
  operationalTypeId: 4,
  operationalSubtypeId: null,
});
// eventType8.save();

const eventType9 = new EventType({
  operationalEventId: 3,
  operationalTypeId: 1,
  operationalSubtypeId: null,
});
// eventType9.save();

const eventType10 = new EventType({
  operationalEventId: 9,
  operationalTypeId: 5,
  operationalSubtypeId: 1,
});
// eventType10.save();

const eventType11 = new EventType({
  operationalEventId: 10,
  operationalTypeId: 5,
  operationalSubtypeId: 1,
});
// eventType11.save();


const operationalType1 = new OperationalType({
  typeName: 'Specifieke gebeurtenis',
});
// operationalType1.save();

const operationalType2 = new OperationalType({
  typeName: 'Grensoverschrijdende achtervolging',
});
// operationalType2.save();

const operationalType3 = new OperationalType({
  typeName: 'BIN-alarm',
});
// operationalType3.save();

const operationalType4 = new OperationalType({
  typeName: 'Bevraging GSM operatoren',
});
// operationalType4.save();

const operationalType5 = new OperationalType({
  typeName: 'Signalering',
});
// operationalType5.save();

const operationalType6 = new OperationalType({
  typeName: 'Zoeking met helikopter',
});
// operationalType6.save();


const operationalSubtype1 = new OperationalSubtype({
  operationalTypeId: 5,
  typeName: 'Persoon',
});
// operationalSubtype1.save();

const operationalSubtype2 = new OperationalSubtype({
  operationalTypeId: 5,
  typeName: 'Voertuig',
});
// operationalSubtype2.save();

const operationalSubtype3 = new OperationalSubtype({
  operationalTypeId: 5,
  typeName: 'Voorwerp',
});
// operationalSubtype3.save();


const defect1 = new Defect({
  technicalId: 4,
  authorId: 2,
  defectTypeId: 1,
  defectSubtypeId: 1,
  description: 'Voertuig P320 achterlicht kapot',
  monitoring: true,
  date: new Date('2020/03/17 13:03:57'),
});
// defect1.save();

const defect2 = new Defect({
  technicalId: 5,
  authorId: 1,
  defectTypeId: 1,
  defectSubtypeId: 1,
  description: 'Voertuig P321 achterlicht kapot',
  monitoring: false,
  date: new Date('2020/03/21 06:14:23'),
});
// defect2.save();

const defect3 = new Defect({
  technicalId: 5,
  authorId: 1,
  defectTypeId: 1,
  defectSubtypeId: 1,
  description: 'Voertuig P256 voorlicht kapot',
  monitoring: true,
  date: new Date('2020/03/21 11:00:03'),
});
// defect3.save();

const defect4 = new Defect({
  technicalId: 6,
  authorId: 2,
  defectTypeId: 1,
  defectSubtypeId: 1,
  description: 'Voertuig P320 voorlicht kapot',
  monitoring: true,
  date: new Date('2020/03/21 15:33:47'),
});
// defect4.save();


const defectType1 = new DefectType({
  typeName: 'Schade aan voertuig',
});
// defectType1.save();


const defectSubtype1 = new DefectSubtype({
  defectTypeId: 1,
  typeName: 'Voertuig',
  description: 'Zichtbare schade'
});
// defectSubtype1.save();


const malfunction1 = new Malfunction({
  technicalId: 1,
  authorId: 1,
  malfunctionTypeId: 1,
  malfunctionSubtypeId: 1,
  description: 'lekkende kraan in kamer 304',
  monitoring: true,
  date: new Date('2020/03/16 10:46:45'),
  duration: '2:16'
});
// malfunction1.save();

const malfunction2 = new Malfunction({
  technicalId: 3,
  authorId: 1,
  malfunctionTypeId: 1,
  malfunctionSubtypeId: 1,
  description: 'krakende deur in kamer 104',
  monitoring: true,
  date: new Date('2020/03/17 03:03:57'),
  duration: '5:07'
});
// malfunction2.save();

const malfunction3 = new Malfunction({
  technicalId: 4,
  authorId: 2,
  malfunctionTypeId: 1,
  malfunctionSubtypeId: 1,
  description: 'niet sluitend raam in kamer 302',
  monitoring: true,
  date: new Date('2020/03/17 04:23:57'),
  duration: '1:56'
});
// malfunction3.save();

const malfunction4 = new Malfunction({
  technicalId: 5,
  authorId: 1,
  malfunctionTypeId: 2,
  malfunctionSubtypeId: 1,
  description: 'alarm kapot verdieping 2',
  monitoring: true,
  date: new Date('2020/03/21 01:15:34'),
  duration: '0:29'
});
// malfunction4.save();

const malfunction5 = new Malfunction({
  technicalId: 6,
  authorId: 2,
  malfunctionTypeId: 3,
  malfunctionSubtypeId: 1,
  description: 'stroom uitgevallen hoofdgebouw',
  monitoring: true,
  date: new Date('2020/03/21 16:26:24'),
  duration: '0:13'
});
// malfunction5.save();


const malfunctionType1 = new MalfunctionType({
  typeName: 'Voorwerp',
});
// malfunctionType1.save();

const malfunctionType2 = new MalfunctionType({
  typeName: 'Verwittiging ASC',
});
// malfunctionType2.save();

const malfunctionType3 = new MalfunctionType({
  typeName: 'Verwittiging (anderen)',
});
// malfunctionType3.save();


const malfunctionSubtype1 = new MalfunctionSubtype({
  malfunctinoTypeId: 1,
  typeName: 'Infrastructuur',
  description: 'Iets kapot',
});
// malfunctionSubtype1.save();

const malfunctionSubtype2 = new MalfunctionSubtype({
  malfunctinoTypeId: 1,
  typeName: 'Elektronica',
  description: 'Storing',
});
// malfunctionSubtype2.save();

const malfunctionSubtype3 = new MalfunctionSubtype({
  malfunctinoTypeId: 1,
  typeName: 'Elektriciteit',
  description: 'Uitgevallen',
});
// malfunctionSubtype3.save();


const dummyData1 = new DummyDatabase({
  plNumber: 'PL12536432',
  unit: 'CARMA',
  location: 'Markt 37, 3740 Bilzen',
  date: new Date('2020/04/13 12:40:32'),
  actions: 'NAV zelfmoord te Overpelt',
});
//  dummyData1.save();

const dummyData2 = new DummyDatabase({
  plNumber: 'PL12536433',
  unit: 'CARMA',
  location: 'Universiteitslaan 32, Diepenbeek',
  date: new Date('2020/04/13 12:40:32'),
  actions: 'NAV zelfmoord',
});
//  dummyData2.save();
sequelize.sync();

// DummyDatabase.sync();

/************************************************************************************
 *                              AXIOS     NEEDS TO BE REPLACED LATER
 ***********************************************************************************/

// REPORTS
app.post('/getFile', async (req, res) => {
  const file = await DummyDatabase.findOne({
    where: {
      plNumber: req.body.plNumber,
    },
  });
  if (file !== null) {
    res.send(file);
  } else {
    res.send(Error('File not found'));
  }
});

app.post('/addOperationalEvent', async (req, res) => {
  OperationalEvent.create({
    operationalId: 1,
    authorId: 3,
    operationalTypeId: 7,
    monitoring: true,
    signaling: null,
    plNumber: req.body.plNumber,
    description: req.body.message,
    location: req.body.location,
    unit: req.body.unit,
    date: new Date('2020/03/16 01:21:25'),
    //date: new Date(req.body.date),
  })
    .then(function () {
      res.send({
        bool: true,
      });
    })
    .catch(function (error) {
      console.log('ERR:' + error);
      res.send(false);
    });
  OperationalEvent.sync();
});

app.post('/addWorkForceEvent', async (req, res) => {
  WorkplaceEvent.create({
    administrativeId: 1,
    authorId: 1,
    absentee: req.body.absentee,
    substitute: req.body.replacement,
    monitoring: true,
    date: Date.now(),
  })
    .then(function () {
      res.send({
        bool: true,
      });
    })
    .catch(function (error) {
      console.log('ERR:' + error);
      res.send({
        bool: false,
      });
    });

  WorkplaceEvent.sync();
});

app.post('/addTechnicalEvent', async (req, res) => {
  Defect.create({
    technicalId: 1,
    authorId: 1,
    defectTypeId: 1,
    description: req.body.description,
    monitoring: true,
    date: Date.now(),
  })
    .then(function () {
      res.send({
        bool: true,
      });
    })
    .catch(function (error) {
      console.log('ERR: ' + error);
      res.send({
        bool: false,
      });
    });
  Defect.sync();
});

app.post('/changeOperationalEvent', async (req, res) => {
  const selectedTypes = req.body.types;
  const selectedSubtypes = req.body.subtypes;

  const event = await OperationalEvent.findOne({
    where: {
      id: req.body.operationalEventId,
    },
    include: [
      {
        model: Operational,
      },
    ],
  });
  if (event != null) {
    event.description = req.body.message;
    event.save();

    await EventType.destroy({
      where: {
        operationalEventId: event.id
      }
    });

    for (let i = 0; i < selectedTypes.length; i++) {
      const curType = selectedTypes[i];
      let curTypeId = null;
      let curSubtypeId = null;

      let curTypeObject = await OperationalType.findOne({
        where: {
          typeName: curType
        }
      });
      let curEvent;
      if (curTypeObject != null) {
        let isMade = false;
        curTypeId = curTypeObject.id;
        if (selectedSubtypes.length == 0) {
          curEvent = await EventType.create({
            operationalEventId: event.id,
            operationalTypeId: curTypeId,
            operationalSubtypeId: null,
          });
          EventType.sync();
        }
        console.log(selectedTypes.length)
        for (let j = 0; j < selectedSubtypes.length; j++) {
          const curSubtype = selectedSubtypes[j];

          let curSubtypeObject = await OperationalSubtype.findOne({
            where: {
              typeName: curSubtype
            }
          });
          if (curSubtypeObject != null) {
            curSubtypeId = curSubtypeObject.id;
            if (curSubtypeObject.operationalTypeId == curTypeObject.id) {
              curEvent = await EventType.create({
                operationalEventId: event.id,
                operationalTypeId: curTypeId,
                operationalSubtypeId: curSubtypeId,
              });
            } else {
              if (!isMade) {
                curEvent = await EventType.create({
                  operationalEventId: event.id,
                  operationalTypeId: curTypeId,
                  operationalSubtypeId: null,
                });
                isMade = true;
              }
            }
            EventType.sync();
          }
        }
      }
    }

  } else {
    res.send(false);
  }

  OperationalEvent.sync();
  res.send(true);
});

app.post('/changeWorkplaceEvent', async (req, res) => {
  let type = req.body.type;
  let subtype = req.body.subtype;

  let workplaceType = await WorkplaceType.findOne({
    where: {
      typename: type
    },
    attributes: ['id', 'typeName'],
  });

  let workplaceSubtype = await WorkplaceSubtype.findOne({
    where: {
      typename: subtype
    },
    attributes: ['id', 'typeName'],
  });

  let workplaceTypeId = null;
  if (workplaceType != null) {
    workplaceTypeId = workplaceType.id;
  }

  let workplaceSubtypeId = null;
  if (workplaceSubtype != null) {
    workplaceSubtypeId = workplaceSubtype.id;
  }

  const event = await WorkplaceEvent.findOne({
    where: {
      id: req.body.administrativeId,
    },
    include: [
      {
        model: Administrative,
      },
    ],
  });

  if (event != null) {
    event.description = req.body.message;
    event.monitoring = req.body.monitoring;
    event.workplaceTypeId = workplaceTypeId;
    event.workplaceSubtypeId = workplaceSubtypeId;
    event.save();
  } else {
    res.send(false);
  }

  WorkplaceEvent.sync();
  res.send(true);
});

app.post('/changeSecretariatNotification', async (req, res) => {

  const event = await SecretariatNotification.findOne({
    where: {
      id: req.body.administrativeId,
    },
    include: [
      {
        model: Administrative,
      },
    ],
  });
  if (event != null) {
    event.description = req.body.message;
    event.monitoring = req.body.monitoring;
    event.save();
  } else {
    res.send(Error('File not found'));
  }

  SecretariatNotification.sync();
});

app.post('/changeDefect', async (req, res) => {
  let type = req.body.type;
  let subtype = req.body.subtype;

  let defectType = await DefectType.findOne({
    where: {
      typename: type
    },
    attributes: ['id', 'typeName'],
  });

  let defectSubtype = await DefectSubtype.findOne({
    where: {
      typename: subtype
    },
    attributes: ['id', 'typeName'],
  });

  let defectTypeId = null;
  if (defectType != null) {
    defectTypeId = defectType.id
  }

  let defectSubtypeId = null;
  if (defectSubtype != null) {
    defectSubtypeId = defectSubtype.id;
  }

  const event = await Defect.findOne({
    where: {
      id: req.body.technicalId,
    },
    include: [
      {
        model: Technical,
      },
    ],
  });

  if (event != null) {
    event.description = req.body.message;
    event.monitoring = req.body.monitoring;
    event.defectTypeId = defectTypeId;
    event.defectSubtypeId = defectSubtypeId;
    event.save();
  } else {
    res.send(false);
  }

  Defect.sync();
  res.send(true);
});

app.post('/changeMalfunction', async (req, res) => {
  let type = req.body.type;
  let subtype = req.body.subtype;

  let malfunctionType = await MalfunctionType.findOne({
    where: {
      typename: type
    },
    attributes: ['id', 'typeName'],
  });

  let malfunctionSubtype = await MalfunctionSubtype.findOne({
    where: {
      typename: subtype
    },
    attributes: ['id', 'typeName'],
  });

  let malfunctionTypeId = null
  if (malfunctionType != null) {
    malfunctionTypeId = malfunctionType.id
  }

  let malfunctionSubtypeId = null;
  if (malfunctionSubtype != null) {
    malfunctionSubtypeId = malfunctionSubtype.id;
  }

  const event = await Malfunction.findOne({
    where: {
      id: req.body.technicalId,
    },
    include: [
      {
        model: Technical,
      },
    ],
  });

  if (event != null) {
    event.description = req.body.message;
    event.monitoring = req.body.monitoring;
    event.malfunctionTypeId = malfunctionTypeId;
    event.malfunctionSubtypeId = malfunctionSubtypeId;
    event.save();
  } else {
    res.send(false);
  }

  Malfunction.sync();
  res.send(true);
});

// USER
interface INewUserData {
  username: string;
  mail: string;
  password: string;
  rptPassword: string;
  accessRights: number;
  subscription: boolean;
}

function checkUsername(username: string) {
  if (/^[a-z0-9_-]{3,15}$/.test(username)) {
    return true;
  }
  return false;
}

function checkPassword(password: string, rptPassword: string) {
  if (/^(?=.*?[0-9])(?=.*[A-Z]).{6,12}$/.test(password)) {
    if (password.localeCompare(rptPassword) == 0) {
      return true;
    }
  }
  return false;
}

function checkAccessRights(accessRights: number) {
  if (accessRights >= 0 && accessRights < 3) {
    return true;
  }
  return false;
}



function checkUserData(newUser: INewUserData) {
  return checkUsername(newUser.username) && checkPassword(newUser.password, newUser.rptPassword) && checkAccessRights(newUser.accessRights);
}


app.post('/addUser', async (req, res) => {

  const userData: INewUserData = {
    username: req.body.username,
    password: req.body.password,
    rptPassword: req.body.rptPassword,
    mail: req.body.mail,
    accessRights: req.body.accessRights,
    subscription: req.body.subscription,
  };
  var matched_users_promise = User.findAll({
    where: { username: userData.username },
    attributes: ['id'],
  });
  matched_users_promise.then(function (users) {

    if (users.length == 0) {
      const passwordHash = bcrypt.hashSync(userData.password, 10);
      User.create({
        username: userData.username,
        password: passwordHash,
        accessRights: userData.accessRights,
        email: userData.mail,
        subscription: userData.subscription,
        loggedIn: false
      }).then(function () {
        res.json({
          message: "Gebruiker aangemaakt"
        });
      })
        .catch(function (error) {
          res.json({
            message: error
          })
        })
      User.sync();
    } else {
      res.status(409).json({
        message: "This user already exists"
      })
    }
  })
});


function checkChangePasswordData(newPasswordData: any) {
  return checkUsername(newPasswordData.username) && checkPassword(newPasswordData.password, newPasswordData.rptPassword);
}

app.post('/changePassword', async (req, res) => {
  const userData = req.body;
  if (userData.username, userData.Password, userData.rptPassword) {
    const passwordHash = bcrypt.hashSync(userData.Password, 10);
    User.update(
      { password: passwordHash },
      { where: { username: userData.username } }
    ).then(function () {
      res.json({
        message: "Wachtwoord gewijzigd"
      })
    })
      .catch(function (err) {
        res.json({
          message: "Error" + err
        })
      })
      .catch(function (err) {
        res.json({
          message: "Error" + err
        })
      })
  } else {
    res.status(401).json({
      message: "Niet alle data werd correct ingevuld"
    })
  }
});

function checkChangeAccessRights(newAccessRights: any) {
  return checkUsername(newAccessRights.username) && checkAccessRights(newAccessRights.accessRights);
}

app.post('/changeAcces', async (req, res) => {
  const data = req.body;
  if (data.username && data.newAcces) {
    User.update(
      { accessRights: req.body.newAcces },
      { where: { username: data.username } }
    );
    User.sync();
    res.json({
      failed: false,
      message: "Toegangsrechten gewijzigd"
    })
  } else {
    res.status(401).json({
      message: "Niet alle data werd correct ingevuld"
    })
  }
});

app.post('/loginUser', async (req, res) => {
  var matched_users_promise = User.findAll({
    where: { username: req.body.username },
  });
  matched_users_promise.then(function (users) {
    if (users.length > 0) {
      let user = users[0];
      let passwordHash = user.password;
      if (bcrypt.compareSync(req.body.password, passwordHash, 10)) {
        User.update(
          { loggedIn: true },
          { where: { username: req.body.username } }
        );
        User.sync();
        var matched_perm_promise = UserPermissions.findAll({
          where: { id: user.accessRights },
        });
        matched_perm_promise.then(function (roles) {
          if (roles.length > 0) {
            let role = roles[0];
            const token = jwt.sign({
              username: user.username,
              id: user.id,
              rights: user.accessRights,
              makeReports: role.makeReports,
              seeNotifications: role.seeNotifications,
              seePreviousShift: role.seePreviousShift,
              seeStatistics: role.seeStatistics,
              seeReports: role.seeReports,
            },
              process.env.JWT_KEY,
              {
                expiresIn: '1h'
              })


            res.json({
              message: "Authenticatie geslaagd",
              token: token,
              redirect: "/"
            });
          }
        })

      } else {
        res.status(409).json({
          message: "password doesnt match",
          failed: true
        });
      }
    } else {
      res.status(409).json({
        message: "user doesnt exist",
        failed: true
      });
    }
  });
});

app.post('/addField', async (req, res) => {
  console.log(req.body.newField);
});

app.post('/changeSubscription', async (req, res) => {
  var matched_user = User.findAll({
    where: { id: req.body.id }
  });
  matched_user.then(function (users) {
    if (users.length > 0) {
      let user = users[0];
      user.subscription = req.body.subscription;
      user.save();
      res.json(
        { message: "Subscription has changed" }
      )
    }
  })
});

app.post("/getOperationalEvents", async (req, res) => {
  console.log(req.body.plNumber);
  var matched_events = await OperationalEvent.findAll({
    where: { plNumber: { [Op.like]: req.body.plNumber } },
    limit: 5
  });
  console.log(matched_events.length);
  res.json(matched_events);
})

app.post("/deleteUser", async (req, res) => {
  User.destroy(
    {
      where: {
        id: req.body.id,
      }
    }
  );

  res.json({
    message: "User deleted"
  })
})

app.post("/checkAuthentication", async (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_KEY, function (err: Error) {
    const decoded = jwt.decode(req.body.token);
    if (decoded === null) {
      return res.json({ check: false, message: "Failed to authenticate token" });
    }
    var matched_users_promise = User.findAll({
      where: {
        username: decoded.username,
        loggedIn: true
      }
    });
    matched_users_promise.then(function (user) {
      if (err) {
        if (user[0]) {
          user[0].update({
            loggedIn: false
          });
        }
        return res.json({ check: false, message: "Failed to authenticate token" });
      } else if (user.length <= 0) {
        return res.json({ check: false, message: "Failed to authenticate token" });
      } else {
        res.json({ check: true, message: 'Authentication succesfull' })
      }
    })
  })
});


app.post("/addTypes", async (req, res) => {
  const data = req.body;
  //OPERTATIONEEL TYPE TOEVOEGEN
  if (data.type == 0) {
    if (data.subtype == -1) {
      OperationalType.create({
        typeName: data.field,
      });
      OperationalType.sync();
      res.json({
        check: true,
        message: "Nieuw type aangemaakt"
      })
    } else {
      OperationalSubtype.create({
        typeName: data.field,
        operationalTypeId: data.subtype
      });
      OperationalSubtype.sync();
      res.json({
        check: true,
        message: "Nieuw subtype aangemaakt"
      })
    }
    // PERSONEEL TYPE TOEVOEGEN
  } else if (data.type == 1) {
    if (data.subtype == -1) {
      WorkplaceType.create({
        typeName: data.field,
      });
      WorkplaceType.sync();
      res.json({
        check: true,
        message: "Nieuw type aangemaakt"
      })
    } else {
      WorkplaceSubtype.create({
        typeName: data.field,
        workplaceTypeId: data.subtype
      });
      WorkplaceSubtype.sync();
      res.json({
        check: true,
        message: "Nieuw subtype aangemaakt"
      })
    }
    //LOGISTIEK TYPE TOEVOEGEN
  } else if (data.type == 2) { //LOG
    if (data.subtype == -1) {
      DefectType.create({
        typeName: data.field,
      });
      DefectType.sync();
      res.json({
        check: true,
        message: "Nieuw type aangemaakt"
      })
    } else {
      DefectSubtype.create({
        typeName: data.field,
        defectTypeId: data.subtype
      });
      DefectSubtype.sync();
      res.json({
        check: true,
        message: "Nieuw subtype aangemaakt"
      })
    }
    //TECHNISCH TYPE TOEVOEGEN
  } else if (data.type == 3) { //TECH
    if (data.subtype == -1) {
      MalfunctionType.create({
        typeName: data.field,
      });
      MalfunctionType.sync();
      res.json({
        check: true,
        message: "Nieuw type aangemaakt"
      })
    } else {
      MalfunctionSubtype.create({
        typeName: data.field,
        operationalTypeId: data.subtype
      });
      MalfunctionSubtype.sync();
      res.json({
        check: true,
        message: "Nieuw subtype aangemaakt"
      })
    }
  } else {
    console.log("fout type")
  }
});

app.post("/logoutUser", async (req, res) => {
  User.update(
    { loggedIn: false },
    { where: { username: req.body.username } }
  ).then(function () {
    res.json({
      message: "afgemeld"
    })
  })
    .catch(function (err) {
      res.json({
        message: "Error" + err
      })
    })
});




let cronInstance = new cronServer(1);

// Export express instance
export default app;
