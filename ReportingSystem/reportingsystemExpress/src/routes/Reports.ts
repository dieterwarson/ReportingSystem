import { Request, Response, Router } from 'express';
import OperationalEvent from 'src/models/operationalEvent';
import SecretariatNotification from '../models/secretariatNotification';
import Report from '../models/report';
import User from '../models/user';

import { Op } from 'sequelize';
import Defect from 'src/models/defect';
import Malfunction from 'src/models/malfunction';
import Replacement from 'src/models/replacement';
import WorkplaceEvent from 'src/models/workplaceEvent';
import { Sequelize } from 'sequelize-typescript';
import { sequelize } from 'src/config/config';

// Init router
const router = Router();

/******************************************************************************
 *                      Get All Reports - "GET /api/reports/all"
 ******************************************************************************/

// only get the reports that are finished
// joins report with user to get the Author's username

router.get('/all', async (req: Request, res: Response) => {
  const reports = await Report.findAll({
    where: {
      temporary: false,
    },
    attributes: ['id', 'date'],
  });
  res.send(reports);
  return res.json({ reports });
});

/******************************************************************************
 *                      Get All monitored Reports - "GET /api/reports/monitored"
 ******************************************************************************/

// only get the reports that are finished and arer being monitored
// joins report with user to get the Author's username

router.get('/monitored', async (req: Request, res: Response) => {
  const reports = await Report.findAll({
    attributes: {
      include: [
        [
          Sequelize.literal(`(
            SELECT *
            FROM 
              Defects AS D,
              Malfunctions AS M,
              Replacements AS R, 
              WorkplaceEvents AS W, 
              SecretariatNotifications AS S, 
              OperationalEvents AS O
            WHERE
              D.monitoring=1 OR
              M.monitoring=1 OR
              R.monitoring=1 OR
              W.monitoring=1 OR
              S.monitoring=1 OR
              O.monitoring=1
          )`),
          'monitored',
        ],
      ],
    },
  });

  res.send(reports);
  return res.json({ reports });
});

/******************************************************************************
 *                      Search Reports - "GET /api/reports/search"
 ******************************************************************************/

router.get('/search/', async (req: Request, res: Response) => {
  const search = 'l';

  var result;
  result = await Defect.findAll({
    where: {
      [Op.or]: {
        description: {
          [Op.like]: '%' + search + '%',
        },
        date: {
          // TODO vergelijken met data verkregen via date picker
        },
      },
    },
  });
  if (result.length !== 0) {
    return res.json({ result });
  }

  result = await Malfunction.findAll({
    where: {
      [Op.or]: {
        description: {
          [Op.like]: '%' + search + '%',
        },
        date: {
          // TODO vergelijken met data verkregen via date picker
        },
      },
    },
  });
  if (result.length !== 0) {
    return res.json({ result });
  }

  result = await Replacement.findAll({
    where: {
      [Op.or]: {
        absentee: {
          [Op.like]: '%' + search + '%',
        },
        substitute: {
          [Op.like]: '%' + search + '%',
        },
        date: {
          // TODO vergelijken met data verkregen via date picker
        },
      },
    },
  });
  if (result.length !== 0) {
    return res.json({ result });
  }

  result = await WorkplaceEvent.findAll({
    where: {
      [Op.or]: {
        description: {
          [Op.like]: '%' + search + '%',
        },
        absentee: {
          [Op.like]: '%' + search + '%',
        },
        substitute: {
          [Op.like]: '%' + search + '%',
        },
        date: {
          // TODO vergelijken met data verkregen via date picker
        },
      },
    },
  });
  if (result.length !== 0) {
    return res.json({ result });
  }

  result = await SecretariatNotification.findAll({
    where: {
      [Op.or]: {
        description: {
          [Op.like]: '%' + search + '%',
        },
        date: {
          // TODO vergelijken met data verkregen via date picker
        },
        shift: {
          [Op.like]: '%' + search + '%',
        },
      },
    },
  });
  if (result.length !== 0) {
    return res.json({ result });
  }

  result = await OperationalEvent.findAll({
    where: {
      [Op.or]: {
        signaling: {
          [Op.like]: '%' + search + '%',
        },
        plNumber: {
          [Op.like]: '%' + search + '%',
        },
        description: {
          [Op.like]: '%' + search + '%',
        },
        location: {
          [Op.like]: '%' + search + '%',
        },
        unit: {
          [Op.like]: '%' + search + '%',
        },
        date: {
          // TODO vergelijken met data verkregen via date picker
        },
      },
    },
  });
  if (result.length !== 0) {
    return res.json({ result });
  }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
