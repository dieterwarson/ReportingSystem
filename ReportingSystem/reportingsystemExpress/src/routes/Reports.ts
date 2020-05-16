import { Request, Response, Router } from 'express';
import OperationalEvent from 'src/models/operationalEvent';
import SecretariatNotification from '../models/secretariatNotification';
import Report from '../models/report';

import { Op } from 'sequelize';
import Defect from 'src/models/defect';
import Malfunction from 'src/models/malfunction';
import WorkplaceEvent from 'src/models/workplaceEvent';
// const checkAuth = require('middleware/check-auth');

import DefectType from 'src/models/defectType'
import MalfunctionType from 'src/models/malfunctionType';
import WorkplaceType from 'src/models/workplaceType';

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
    | SecretariatNotification[]
  )[] = [];

  let defects = await Defect.findAll({
    where: {
      monitoring: 1,
    },
    include: [{ model: DefectType }]
  });

  let malfunctions = await Malfunction.findAll({
    where: {
      monitoring: 1,
    },
    include: [{ model: MalfunctionType }]
  });


  let workplaceEvents = await WorkplaceEvent.findAll({
    where: {
      monitoring: 1,
    },
    include: [{ model: WorkplaceType }]
  });

  let secretariatNotifications = await SecretariatNotification.findAll({
    where: {
      monitoring: 1,
    },
  });

  let results = {
    administrative: { workplaceEvents, secretariatNotifications },
    technical: { defects, malfunctions },
  };


  res.send(results);
});

/******************************************************************************
 *                      Search Reports - "GET /api/reports/search"
 ******************************************************************************/

router.get('/search/:keyword', async (req: Request, res: Response) => {
  const search = req.param('keyword');

  let reports = await Report.findAll();

  // let operational = await report?.$get('operational');
  // let operationalEvents = await operational?.$get('operationalEvents');

  // let technical = await report?.$get('technical');

  // let defects = await Defect.findAll({
  //   where: {
  //     technicalId: technical?.id
  //   },
  //   include: [{ model: DefectType }]
  // })

  // let malfunctions = await Malfunction.findAll({
  //   where: {
  //     technicalId: technical?.id
  //   },
  //   include: [{ model: MalfunctionType }]
  // })

  // let administrative = await report?.$get('administrative');

  // let workplaceEvents = await WorkplaceEvent.findAll({
  //   where: {
  //     administrativeId: administrative?.id
  //   },
  //   include: [{ model: WorkplaceType }]
  // })

  // let secretariatNotifications = await administrative?.$get('secretariatNotifications');

  // let results = {
  //   report: report,
  //   operational: { operationalEvents },
  //   administrative: { workplaceEvents, secretariatNotifications },
  //   technical: { defects, malfunctions },
  // };

  res.send(reports);
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

  let defects = await Defect.findAll({
    where: {
      technicalId: technical?.id
    },
    include: [{ model: DefectType }]
  })

  let malfunctions = await Malfunction.findAll({
    where: {
      technicalId: technical?.id
    },
    include: [{ model: MalfunctionType }]
  })


  let workplaceEvents = await WorkplaceEvent.findAll({
    where: {
      administrativeId: administrative?.id
    },
    include: [{ model: WorkplaceType }]
  })

  let secretariatNotifications = await administrative?.$get('secretariatNotifications');
  let operationalEvents = await operational?.$get('operationalEvents');

  let results = {
    report: report,
    operational: { operationalEvents },
    administrative: { workplaceEvents, secretariatNotifications },
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

  let workplaceEvents = await administrative?.$get('workplaceEvents', {
    where: {
      monitoring: true
    }
  });
  let secretariatNotifications = await administrative?.$get('secretariatNotifications', {
    where: {
      monitoring: true
    }
  });

  let results = {
    administrative: { workplaceEvents, secretariatNotifications },
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
