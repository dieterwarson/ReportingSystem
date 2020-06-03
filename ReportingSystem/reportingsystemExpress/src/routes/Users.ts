import { Request, Response, Router } from 'express';
import User from 'src/models/user';
import UserPermissions from 'src/models/userPermissions'

const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/******************************************************************************
 *                   Get All USERS - "GET /api/users/all"
 ******************************************************************************/

// only get the reports that are finished
// joins report with user to get the Author's username

router.get('/all', async (req: Request, res: Response) => {
  const users = await User.findAll({
    attributes: ['id', 'username', 'email', 'accessRights', 'subscription'],
  });
  res.send(users);
});

/******************************************************************************
 *                   POST Add User - "GET /api/users/addUser"
 ******************************************************************************/

interface INewUserData {
  username: string;
  mail: string;
  password: string;
  rptPassword: string;
  accessRights: number;
  subscription: boolean;
}

function checkUsername(username: string) {
  if (/^[a-zA-Z0-9_-]{3,15}$/.test(username)) {
    return true;
  }
  return false;
}

function checkPassword(password: string, rptPassword: string) {
  if (/^(?=.*?[0-9])(?=.*[A-Z]).{6,12}$/.test(password)) {
    if (password.localeCompare(rptPassword) === 0) {
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


router.post('/addUser', async (req, res) => {

  const userData: INewUserData = {
    username: req.body.username,
    password: req.body.password,
    rptPassword: req.body.rptPassword,
    mail: req.body.mail,
    accessRights: req.body.accessRights,
    subscription: req.body.subscription,
  };
  if(!(checkUsername(userData.username) && checkPassword(userData.password, userData.rptPassword) &&checkAccessRights(userData.accessRights))){
    return res.json({
      message: "Gebruiker aanmaken mislukt"
    })
  }
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

/******************************************************************************
 *                   POST Change Password - "GET /api/users/changePassword"
 ******************************************************************************/

router.post('/changePassword', async (req, res) => {
  
  const userData = req.body;
  if(!checkPassword(userData.password, userData.rptPassword)){
    return res.json({
      message: "Wachtwoord wijzigen mislukt"
    })
  }
  if (userData.username, userData.password, userData.rptPassword) {
    const passwordHash = bcrypt.hashSync(userData.password, 10);
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
/******************************************************************************
 *                   POST change  AccessRights - "GET /api/users/changeAccess"
 ******************************************************************************/
router.post('/changeAcces', async (req, res) => {
  const data = req.body;
  if (data.username && (data.newAcces >= 0 && data.newAcces < 3)) {
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

/******************************************************************************
 *                   POST change  Subscriptio - "GET /api/users/changeSubscription"
 ******************************************************************************/
router.post('/changeSubscription', async (req, res) => {
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
/******************************************************************************
 *                   POST Delete USER - "GET /api/users/deleteUser"
 ******************************************************************************/

router.post("/deleteUser", async (req, res) => {
  User.findAll(
    {
      where: {
        id: req.body.deleteid,
      }
    }
  ).then(function(entries){
    const entry =  entries[0];
    (entry.defects).forEach(defect => {
      defect.authorId = req.body.id
    });
    (entry.malfunctions).forEach(malfunction => {
      malfunction.authorId = req.body.id
    });
    (entry.operationalEvents).forEach(event => {
      event.authorId = req.body.id
    });
    (entry.secretariatNotifications).forEach(Notification => {
      Notification.authorId = req.body.id
    });
    (entry.workplaceEvents).forEach(event => {
      event.authorId = req.body.id
    });
    entry.destroy();
  })

  res.json({
    message: "User deleted"
  })
})



/******************************************************************************
 *                   POST Login USER - "GET /api/users/loginUser"
 ******************************************************************************/
router.post('/loginUser', async (req, res) => {
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

/******************************************************************************
 *                   POST Logout USER - "GET /api/users/logoutUser"
 ******************************************************************************/

router.post("/logoutUser", async (req, res) => {
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

/******************************************************************************
 *                   POST Logout USER - "GET /api/users/checkAuthentication"
 ******************************************************************************/


router.post("/checkAuthentication", async (req, res) => {
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

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
