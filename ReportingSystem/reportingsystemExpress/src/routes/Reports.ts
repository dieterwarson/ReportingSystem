import { Request, Response, Router } from 'express';
import OperationalEvent from 'src/models/operationalEvent';
import SecretariatNotification from '../models/secretariatNotification';
import Report from '../models/report';

import { Op } from 'sequelize';
import Defect from 'src/models/defect';
import Malfunction from 'src/models/malfunction';
import Replacement from 'src/models/replacement';
import WorkplaceEvent from 'src/models/workplaceEvent';

// Init router
const router = Router();

/******************************************************************************
 *                   Get All Reports - "GET /api/reports/all"
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
});

/******************************************************************************
 *             Get All monitored Reports - "GET /api/reports/monitored"
 ******************************************************************************/

// only get the reports that are finished and arer being monitored
// joins report with user to get the Author's username

router.get('/monitored', async (req: Request, res: Response) => {
  var reports: (
    | Defect[]
    | Malfunction[]
    | Replacement[]
    | SecretariatNotification[]
  )[] = [];

  let defects = await Defect.findAll({
    where: {
      monitoring: 1,
    },
  });

  let malfunctions = await Malfunction.findAll({
    where: {
      monitoring: 1,
    },
  });

  let replacements = await Replacement.findAll({
    where: {
      monitoring: 1,
    },
  });

  let workplaceEvents = await WorkplaceEvent.findAll({
    where: {
      monitoring: 1,
    },
  });

  let secretariatNotifications = await SecretariatNotification.findAll({
    where: {
      monitoring: 1,
    },
  });

  let results = {
    administrative: { replacements, workplaceEvents, secretariatNotifications },
    technical: { defects, malfunctions },
  };


  res.send(results);
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
 *        Get the content of a report - "GET /api/reports/content/:reportId"
 ******************************************************************************/
router.get('/content/:reportId', async (req: Request, res: Response) => {
  let reportId = req.param('reportId');
  let report = await Report.findOne({
    where: {
      id: reportId,
    },
  });

  let technical = await report?.$get('technical');
  let administrative = await report?.$get('administrative');
  let operational = await report?.$get('operational');

  let defects = await technical?.$get('defects');
  let malfunctions = await technical?.$get('malfunctions');
  let replacements = await administrative?.$get('replacements');
  let workplaceEvents = await administrative?.$get('workplaceEvents');
  let secretariatNotifications = await administrative?.$get('replacements');
  let operationalEvents = await operational?.$get('operationalEvents');

  let results = {
    report: report,
    operational: { operationalEvents },
    administrative: { replacements, workplaceEvents, secretariatNotifications },
    technical: { defects, malfunctions },
  };

  res.send(results);

});

/******************************************************************************
 *      Get all the notifications from a report - "GET /api/reports/notifications/:reportId"
 ******************************************************************************/
router.get('/notifications/:reportId', async (req: Request, res: Response) => {
  let reportId = req.param('reportId');
  let report = await Report.findOne({
    where: {
      id: reportId,
    },
  });

  let technical = await report?.$get('technical');
  let administrative = await report?.$get('administrative');
  let operational = await report?.$get('operational');

  let defects = await technical?.$get('defects', {
    where: {
      monitoring: true
    }
  });
  let malfunctions = await technical?.$get('malfunctions', {
    where: {
      monitoring: true
    }
  });
  let replacements = await administrative?.$get('replacements', {
    where: {
      monitoring: true
    }
  });
  let workplaceEvents = await administrative?.$get('workplaceEvents', {
    where: {
      monitoring: true
    }
  });
  let secretariatNotifications = await administrative?.$get('replacements', {
    where: {
      monitoring: true
    }
  });

  let results = {
    administrative: { replacements, workplaceEvents, secretariatNotifications },
    technical: { defects, malfunctions },
  };

  res.send(results);

});


/******************************************************************************
 *      Get all the priority operationalEvents - "GET /api/reports/priority/:reportId"
 ******************************************************************************/
router.get('/priority/:reportId', async (req: Request, res: Response) => {
  let reportId = req.param('reportId');
  let report = await Report.findOne({
    where: {
      id: reportId,
    },
  });

  let operational = await report?.$get('operational');

  let operationalEvents = await operational?.$get('operationalEvents', {
    where: {
      priority: true
    }
  });

  let results = {
    operational: { operationalEvents }
  };

  res.send(results);

});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
