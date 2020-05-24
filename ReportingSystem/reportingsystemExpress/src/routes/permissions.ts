import { Request, Response, Router } from 'express';
import { Op } from 'sequelize';

import UserPermissions from '../models/userPermissions';


const router = Router();

router.get('/all', async (req: Request, res: Response) => {
    let userRoles = await UserPermissions.findAll({
      where: {
        id: {[Op.gt]: 0}
      },
      attributes: ['id','name', 'makeReports', 'seeReports', 'seeNotifications', 'seePreviousShift', 'seeStatistics'],
    });
  
    
    console.log(JSON.stringify(userRoles));
    res.send(userRoles);
  });


  router.post('/update', async (req: Request, res: Response) => {
      const roles = req.body.roles;
      roles.forEach((role: { name: string; makeReports: boolean; seeReports: boolean; seeNotifications: boolean; seePreviousShift: boolean; seeStatistics: boolean; }) => {
          UserPermissions.findAll({
              where: {name: role.name}
          }).then(users => {
            const user = users[0];
            user.makeReports = role.makeReports;
            user.seeNotifications = role.seeNotifications;
            user.seePreviousShift = role.seePreviousShift;
            user.seeReports = role.seeReports;
            user.seeStatistics = role.seeStatistics;
            user.save({});
          })
      });
      res.json({check: true, message: "Rechten zijn gewijzigd"})
  })

  export default router;
