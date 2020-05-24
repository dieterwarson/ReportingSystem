import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';
import UserPermissions from './models/userPermissions';
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
import {Op} from "sequelize";
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

sequelize.sync( );
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
report1.save();

/* const report2 = new Report({
  date: new Date('2020/03/16 12:01:00'),
  temporary: false,
  nightShift: false,
});
// report2.save();

const report3 = new Report({
  date: new Date('2020/03/18 00:01:00'),
  temporary: false,
  nightShift: true,
});
// report3.save(); */

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

const workplaceEvent2 = new WorkplaceEvent({
  authorId: 1,
  administrativeId: 1,
  workplaceTypeId: 1,
  description: 'Ziekte',
  absentee: 'Remans Luc',
  substitute: 'Jan Janssens',
  monitoring: false,
  date: new Date('2020/12/11 9:10:23'),
  shift: false,
});
// workplaceEvent2.save();

const workplaceType1 = new WorkplaceType({
  typeName: 'Arbeidsongeval',
});
// workplaceType1.save();

const workplaceType2 = new WorkplaceType({
  typeName: 'Ziekte',
});
// workplaceType1.save();

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
  signaling: 'Verlies inschrijvingsbewijs CIM NR 545102920 / 1ABC123',
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
  description: 'Lokalisatie gsmnr via provider, Nav onrustwekkende verdwijning meerderjarige : zelfmoordbericht',
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
  description: 'Verwittigen labo, verwittigen team Vandevoorde',
  location: null,
  unit: 'HANO',
  date: new Date('2020/03/16 22:05:18'),
});
//  operationalEvent3.save();

const operationalEvent4 = new OperationalEvent({
  authorId: 1,
  operationalId: 1,
  signaling: 'Seining Jan Jansens - PZ LAMA',
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
  signaling: 'Seining persoon - Jan Jansens - PZ LOON',
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
  signaling: 'Seining Jan Jansens - PZ Bihori',
  plNumber: 'PL03170202',
  description: `ONRUSTWEKKENDE VERDWIJNING MEERDERJARIGE
  86 J dame vertrok te voet vanuit haar woning omstreeks 1600 u en keerde niet weer.
  
  Zoeking met Heli leverde niets op - einde 0015 u`,
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
  plNumber: 'PL03170315',
  description: `Autodiefstal te Rummen straat van een Mercedes E300
  - Melding binnen 101 Limburg
  - ANPR Hit te Nieuwerkerken richting Herk de Stad
  - Voertuig onderschept te Herk de Stad`,
  location: null,
  unit: 'LRH',
  date: new Date('2020/03/16 01:21:25'),
});
//  operationalEvent7.save();

 const operationalEvent8 = new OperationalEvent({
  authorId: 1,
  operationalId: 1,
  signaling: null,
  plNumber: 'PL03170322',
  description: `Inbraak in woning doch tussen melding en twee dagen ervoor. Geen BIN opgestart door onduidelijk tijdstip.`,
  location: null,
  unit: 'LRH',
  date: new Date('2020/03/16 01:21:25'),
});
//  operationalEvent8.save();

const eventType1 = new EventType({
  operationalEventId: 1,
  operationalTypeId: 5,
  operationalSubtypeId: 3,
});
// eventType1.save();

const eventType2 = new EventType({
  operationalEventId: 4,
  operationalTypeId: 5,
  operationalSubtypeId: 1,
});
// eventType2.save();

const eventType3 = new EventType({
  operationalEventId: 6,
  operationalTypeId: 6,
});
// eventType3.save();

const eventType4 = new EventType({
  operationalEventId: 5,
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
});
// eventType6.save();

const eventType7 = new EventType({
  operationalEventId: 8,
  operationalTypeId: 3,
});
// eventType7.save();

const eventType8 = new EventType({
  operationalEventId: 2,
  operationalTypeId: 4,
});
// eventType8.save();

const eventType9 = new EventType({
  operationalEventId: 3,
  operationalTypeId: 1,
});
// eventType9.save();


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
  technicalId: 1,
  authorId: 1,
  defectTypeId: 1,
  description: 'Voertuig P320 achterlicht kapot',
  monitoring: true,
  date: new Date('2020/04/15 13:03:57'),
});
// defect1.save();


const defectType1 = new DefectType({
  typeName: 'Schade aan voertuig',
});
// defectType1.save();


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
 sequelize.sync( );

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
  if (/^[a-z0-9_-]{3,15}$/.test(username)){
    return true;
  }
  return false;
}

function checkPassword(password: string, rptPassword: string) {
  if (/^(?=.*?[0-9])(?=.*[A-Z]).{6,12}$/.test(password)){
    if (password.localeCompare(rptPassword) == 0){
      return true;
    }
  }
  return false;
}

function checkAccessRights(accessRights: number) {
  if (accessRights >= 0 && accessRights < 3){
    return true;
  }
  return false;
}



function checkUserData(newUser: INewUserData){
  return checkUsername(newUser.username) && checkPassword(newUser.password, newUser.rptPassword) && checkAccessRights(newUser.accessRights);
}


app.post('/addUser',  async (req, res) => {
  
  const userData:INewUserData = {
    username: req.body.username,
    password: req.body.password,
    rptPassword: req.body.rptPassword,
    mail: req.body.mail,
    accessRights: req.body.accessRights,
    subscription: req.body.subscription,
  };
  var matched_users_promise = User.findAll({
    where : {username: userData.username},
    attributes: ['id'],
  });
  matched_users_promise.then(function(users) {

    if (users.length == 0) {
      const passwordHash = bcrypt.hashSync(userData.password, 10);
      User.create({
        username: userData.username,
        password: passwordHash,
        accessRights: userData.accessRights,
        email: userData.mail,
        subscription: userData.subscription,
        loggedIn: false
      }).then(function() {
          res.json({
          message: "Gebruiker aangemaakt"
        });
      })
      .catch(function( error)  {
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


function checkChangePasswordData(newPasswordData: any){
  return checkUsername(newPasswordData.username) && checkPassword(newPasswordData.password, newPasswordData.rptPassword);
}

app.post('/changePassword', async (req, res) => {
  const userData = req.body;
  if (userData.username, userData.Password, userData.rptPassword){
    const passwordHash = bcrypt.hashSync(userData.Password, 10);
        User.update(
          {password: passwordHash},
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
    }else {
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
        {accessRights: req.body.newAcces},
        {where: {username: data.username}}
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
    where: {username: req.body.username},
  });
  matched_users_promise.then(function(users){
    if (users.length > 0 ) {
      let user = users[0];
      let passwordHash = user.password;
      if (bcrypt.compareSync(req.body.password, passwordHash, 10)) {
        User.update(
          {loggedIn: true},
          {where: {username: req.body.username}}
        );
        User.sync();
        var matched_perm_promise = UserPermissions.findAll({
          where: {id: user.accessRights},
        });
        matched_perm_promise.then(function(roles) {
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
    where: {id: req.body.id}
  });
  matched_user.then(function(users){
    if (users.length > 0) {
      let user = users[0];
      user.subscription = req.body.subscription;
      user.save();
      res.json(
        {message:"Subscription has changed"}
      )
    }
  })
});

app.post("/getOperationalEvents", async (req, res) => {
  console.log(req.body.plNumber);
  var matched_events = await OperationalEvent.findAll({
    where: {plNumber: {[Op.like]: req.body.plNumber}},
    limit: 5
  });
  console.log(matched_events.length);
  res.json(matched_events);
})

app.post("/deleteUser", async (req, res) => {
  User.destroy(
    {where: {
      id: req.body.id,
    }}
  );
  
  res.json({
    message: "User deleted"
  })
})

app.post("/checkAuthentication", async (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_KEY, function(err: Error) {
      const decoded = jwt.decode(req.body.token);
      var matched_users_promise = User.findAll({
        where: {
          username: decoded.username,
          loggedIn: true
        }
      });
      matched_users_promise.then(function(user){
        if (err) {
          if (user[0]) {
            user[0].update({
              loggedIn : false
            });
          }
          return res.json({check: false, message: "Failed to authenticate token"});
        } else if (user.length <= 0) {
          return res.json({check: false, message: "Failed to authenticate token"});
        } else {
          res.json({check: true, message: 'Authentication succesfull'})
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
    {loggedIn: false},
    {where: {username: req.body.username}}
  ).then(function() {
    res.json({
      message: "afgemeld"
    })
  })
  .catch(function (err) {
    res.json({
      message: "Error"  + err
    })
  })
});




let cronInstance = new cronServer(1);

// Export express instance
export default app;
