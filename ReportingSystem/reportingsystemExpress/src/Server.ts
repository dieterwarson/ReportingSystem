import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

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
import Replacement from './models/replacement';
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
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
 //user2.save();

const report1 = new Report({
  date: new Date('2020/03/16 21:13:48'),
  temporary: false,
  nightShift: true,
});
// report1.save();

const technical1 = new Technical({
  reportId: 1,
});
// technical1.save();

const administrative1 = new Administrative({
  reportId: 1,
});
// administrative1.save();

const operational1 = new Operational({
  reportId: 1,
});
// operational1.save();

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

const defectType1 = new DefectType({
  typeName: 'lekkende kraan',
});
// defectType1.save();

const defectType2 = new DefectType({
  typeName: 'krakende deur',
});
// defectType2.save();

const defectSubtype1 = new DefectSubtype({
  defectTypeId: 1,
  typeName: 'defectSubtype typeName',
  description: 'defectSubtype lekkende kraan',
});
// defectSubtype1.save();

const defectSubtype2 = new DefectSubtype({
  defectTypeId: 2,
  typeName: 'defectSubtype typeName',
  description: 'defectSubtype krakende deur',
});
// defectSubtype2.save();

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

const malfunctionType1 = new MalfunctionType({
  typeName: 'malfunctionType typeName',
});
// malfunctionType1.save();

const malfunctionSubtype1 = new MalfunctionSubtype({
  typeName: 'malfunctionSubtype typeName',
  description: 'malfunctionSubtype description',
  malfunctionTypeId: 1,
});
// malfunctionSubtype1.save();

const replacement1 = new Replacement({
  authorId: 1,
  administrativeId: 1,
  absentee: 'Jan Jacobs',
  substitute: 'Geordy Hendricks',
  monitoring: true,
  date: new Date('2020/03/30 15:46:36'),
  shift: true,
});
// replacement1.save();

const workplaceEvent1 = new WorkplaceEvent({
  authorId: 1,
  administrativeId: 1,
  workplaceTypeId: 1,
  description: 'Jacob sleutelbeen gebroken',
  absentee: 'Jacob Franssen',
  substitute: 'James Brook',
  monitoring: true,
  date: new Date('2020/12/11 9:10:23'),
  shift: false,
});
// workplaceEvent1.save();

const workplaceType1 = new WorkplaceType({
  typeName: 'workplaceType typeName',
});
// workplaceType1.save();

const workplaceSubtype1 = new WorkplaceSubtype({
  workplaceTypeId: 1,
  typeName: 'workplaceSubtype typeName',
  description: 'workplaceSubtype description',
});
// workplaceSubtype1.save();

const secretariatNotification1 = new SecretariatNotification({
  authorId: 1,
  administrativeId: 1,
  description: 'Jan Janssens Inp ziek',
  monitoring: true,
  date: new Date('2020/03/16 19:19:49'),
  shift: true,
});
//  secretariatNotification1.save();

const secretariatNotification2 = new SecretariatNotification({
  authorId: 1,
  administrativeId: 1,
  description: 'Remans Luc Inp ziek',
  monitoring: true,
  date: new Date('2020/03/16 19:21:46'),
  shift: true,
});
// secretariatNotification2.save();

const operationalEvent1 = new OperationalEvent({
  authorId: 1,
  operationalId: 1,
  signaling: 'Verlies inschrijvingsbewijs',
  plNumber: null,
  description: null,
  location: null,
  unit: 'KEMPLA',
  date: new Date('2020/03/16 18:13:48'),
});
//  operationalEvent1.save();

const operationalEvent2 = new OperationalEvent({
  authorId: 1,
  operationalId: 1,
  signaling: null,
  plNumber: 'PL031770168',
  description: null,
  location: null,
  unit: 'CARMA',
  date: new Date('2020/03/16 21:34:37'),
});
//  operationalEvent2.save();

const operationalEvent3 = new OperationalEvent({
  authorId: 1,
  operationalId: 1,
  signaling: null,
  plNumber: 'PL03170104',
  description: null,
  location: null,
  unit: 'HANO',
  date: new Date('2020/03/16 22:05:18'),
});
//  operationalEvent3.save();

const operationalEvent4 = new OperationalEvent({
  authorId: 1,
  operationalId: 1,
  signaling: 'Seining persoon',
  plNumber: null,
  description: null,
  location: null,
  unit: 'LAMA',
  date: new Date('2020/03/16 23:34:33'),
});
//  operationalEvent4.save();

const operationalEvent5 = new OperationalEvent({
  authorId: 1,
  operationalId: 1,
  signaling: 'Seining persoon',
  plNumber: null,
  description: null,
  location: null,
  unit: 'LOON',
  date: new Date('2020/03/16 23:57:10'),
});
//  operationalEvent5.save();

const operationalEvent6 = new OperationalEvent({
  authorId: 1,
  operationalId: 1,
  signaling: 'Seining persoon',
  plNumber: 'PL03170202',
  description: null,
  priority: true,
  location: null,
  unit: 'BIHORI',
  date: new Date('2020/03/16 00:18:57'),
});
//  operationalEvent6.save();

const operationalEvent7 = new OperationalEvent({
  authorId: 1,
  operationalId: 1,
  signaling: null,
  plNumber: 'PL03170104',
  description: null,
  location: null,
  unit: 'HANO',
  date: new Date('2020/03/16 00:45:45'),
});
//  operationalEvent7.save();

const operationalEvent8 = new OperationalEvent({
  authorId: 1,
  operationalId: 1,
  signaling: null,
  plNumber: 'PL03170315',
  description: null,
  location: null,
  unit: 'LRH',
  date: new Date('2020/03/16 01:21:25'),
});
//  operationalEvent8.save();

const operationalEvent9 = new OperationalEvent({
  authorId: 1,
  operationalId: 1,
  signaling: null,
  plNumber: 'PL03170322',
  description: null,
  location: null,
  unit: 'LRH',
  date: new Date('2020/03/16 01:51:47'),
});
//  operationalEvent9.save();

const eventType1 = new EventType({
  reportId: 1,
  operationalEventId: 1,
  operationalTypeId: 1,
});
// eventType1.save();

const eventType2 = new EventType({
  reportId: 1,
  operationalEventId: 1,
  operationalTypeId: 2,
});
// eventType2.save();

const eventType3 = new EventType({
  reportId: 1,
  operationalEventId: 1,
  operationalTypeId: 2,
});
// eventType3.save();

const operationalType1 = new OperationalType({
  eventTypeId: 1,
  typeName: 'Helikopter ingezet',
});
// operationalType1.save();

const operationalType2 = new OperationalType({
  eventTypeId: 2,
  typeName: 'Grensoverschrijdende achtervolging',
});
// operationalType2.save();

const operationalType3 = new OperationalType({
  eventTypeId: 3,
  typeName: 'Helikopter ingezet',
});
// operationalType3.save();

const operationalSubtype1 = new OperationalSubtype({
  operationalTypeId: 1,
  typeName: null,
  description: 'operationalSubtype description',
});
// operationalSubtype1.save();

const operationalSubtype2 = new OperationalSubtype({
  operationalTypeId: 2,
  typeName: null,
  description: 'operationalSubtype description',
});
// operationalSubtype2.save();

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

// DummyDatabase.sync();

/************************************************************************************
 *                              AXIOS     NEEDS TO BE REPLACED LATER
 ***********************************************************************************/

// REPORTS
app.post('/getFile', async (req, res) => {
  console.log(req.body.plNumber);
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
    authorId: 1,
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
    shift: true,
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
  // OperationalEvent.update({
  //   OperationalEventId: req.body.id
  // });
    console.log('\n\n\n');
    console.log(req.body);
    console.log('\n');

  const event = await OperationalEvent.findOne({
    where: {
      id: req.body.operationalId,
    },
    include: [
      {
        model: Operational,
      },
    ],
  });
  if (event != null) {
    console.log(event);

    event.description = req.body.message;
    event.save();
    
    console.log('\n\n\n');
    console.log(req.body);
    console.log('\n');

    console.log(event);
    console.log('\n\n\n');
  } else {
    res.send(Error('File not found'));
  }

  OperationalEvent.sync();
});

// USER
interface INewUserData {
  username: string;
  email: string;
  password: string;
  rptPassword: string;
  accessRights: number;
}



function checkUsername(username: string) {
  if (/^[a-z0-9_-]{3,15}$/.test(username)){
    console.log("username OK")
    return true;
  }
  return false;
}

function checkPassword(password: string, rptPassword: string) {
  if (/^(?=.*?[0-9])(?=.*[A-Z]).{6,12}$/.test(password)){
    if (password.localeCompare(rptPassword) == 0){
      console.log("password OK")
      return true;
    }
  }
  return false;
}

function checkAccessRights(accessRights: number) {
  if (accessRights >= 0 && accessRights < 3){
    console.log("access OK")
    return true;
  }
  return false;
}



function checkUserData(newUser: INewUserData){
  console.log(newUser)
  return checkUsername(newUser.username) && checkPassword(newUser.password, newUser.rptPassword) && checkAccessRights(newUser.accessRights);
}


app.post('/addUser',  async (req, res) => {
  
  const userData:INewUserData = {
    username: req.body.username,
    password: req.body.password,
    rptPassword: req.body.rptPassword,
    email: req.body.email,
    accessRights: req.body.accessRights,
  };
  var matched_users_promise = User.findAll({
    where : {username: userData.username}
  });
  matched_users_promise.then(function(users) {
    if (users.length == 0) {
      const passwordHash = bcrypt.hashSync(userData.password, 10);
      User.create({
        username: userData.username,
        password: passwordHash,
        email: userData.email,
        accessRights: userData.accessRights
      }).then(function() {
          res.json({
          message: "Gebruiker aangemaakt"
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


function checkChangePasswordData(newPasswordData: any){
  return checkUsername(newPasswordData.username) && checkPassword(newPasswordData.password, newPasswordData.rptPassword);
}

app.post('/changePassword', async (req, res) => {
  const userData = req.body;
  if (userData.username, userData.password, userData.rptPassword){
    if (checkChangePasswordData(userData)){
      userData.password = bcrypt.hashSync(req.body.password, 10);
      const user = User.findOne({
        where: {username: userData.username}
      });
      if (user !== null) {
        User.update(
          {password: userData.password},
          {where: {username: userData.username}}
        ).then(function() {
          res.json({
            message: "Wachtwoord gewijzigd"
          })
        })
        .catch(function (err) {
          res.json({
            message: "Error"  + err
          })
        })
      } else {
        res.status(401).json({
          message: "Deze gebruiker bestaat niet"
        })
      }
    } else {
      res.status(401).json({
        message: "Niet alle data werd correct ingevuld"
      })
    } 
    }else {
      res.status(401).json({
        message: "Niet alle data werd correct ingevuld"
      })
  }
});

function checkChangeAccessRights(newAccessRights: any) {
  return checkUsername(newAccessRights.username) && checkAccessRights(newAccessRights.accessRights);
}

app.post('/changeAccess', async (req, res) => {
  const data = req.body;
  if (data.username && data.accessRights) {
    if (checkAccessRights(data)) {
      const user = User.findOne({
        where: {username: data.username}
      });
      if (user !== null) {
        User.update(
          {accessRights: data.accessRights},
          {where: {username: data.username}}
        ).then(function(){
          res.json({
            message: "De toegangsrechten zijn gewijzigd"
          })
        })
        .catch(function (error){
          res.json({
            message: "Error: " + error
          })
        })
      } else {
        res.json({
          message: "Deze gebruiker bestaat niet"
        })
      }
    } else {
      res.status(401).json({
        message: "Niet alle data werd correct ingecvuld"
      })
    }
  } else {
    res.status(401).json({
      message: "Niet alle data werd correct ingevuld"
    })
  }
});

app.post('/loginUser', async (req, res) => {
  var matched_users_promise = User.findAll({
    where: {username: req.body.username}
  });
  matched_users_promise.then(function(users){
    if (users.length > 0 ) {
      let user = users[0];
      let passwordHash = user.password;
      console.log(passwordHash);
      if (bcrypt.compareSync(req.body.password, passwordHash, 10)) {
        const token = jwt.sign({
          username: user.username,
          id: user.id,
          rights: user.accessRights
        },
        process.env.JWT_KEY,
        {
          expiresIn: '12h'
        })
        res.json({
          message: "Authenticatie geslaagd",
          token: token,
          redirect: "/"
        });
      } else {
        res.json({
          message: "password doesnt match?"
        });
      }
    } else {
      res.json({
        message: "user bestaat niet"
      });
    }
  });
});

app.post('/addField', async (req, res) => {
  console.log(req.body.newField);
});

// Export express instance
export default app;
