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
import OperationalType from 'src/models/operationalType';
import Operational from 'src/models/operational';
import Administrative from 'src/models/administrative';
import Technical from 'src/models/technical';

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
 *                   Get All Reports - "GET /api/reports/one/:reportId"
 ******************************************************************************/

router.get('/one/:reportId', async (req: Request, res: Response) => {
  const reportId = Number(req.param('reportId'));

  const report = await Report.findOne({
    where: {
      id: reportId,
    },
    attributes: ['id', 'date'],
  });

  res.send(report);
  return res.json({ report });
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
 *                      Search Reports - "GET /api/reports/search/:keyword"
 ******************************************************************************/

router.get('/search/:keyword', async (req: Request, res: Response) => {
  const search: string = req.param('keyword');
  const searchString: string = '%' + search + '%';
  let reportIds: Number[] = [];

  const operationalEvents = await OperationalEvent.findAll({
    where: {
      [Op.or]: {
        signaling: {
          [Op.like]: searchString,
        },
        plNumber: {
          [Op.like]: searchString,
        },
        description: {
          [Op.like]: searchString,
        },
        location: {
          [Op.like]: searchString,
        },
        unit: {
          [Op.like]: searchString,
        },
      }
    }
  })
  for (let i in operationalEvents) {
    const event = await Operational.findOne({
      where: {
        id: operationalEvents[i].operationalId
      }
    });
    if (event != null) {
      if (!reportIds.includes(event.reportId)) {
        reportIds.push(Number(event.reportId));
      }
    }
  }

  const workplaceEvents = await WorkplaceEvent.findAll({
    where: {
      [Op.or]: {
        description: {
          [Op.like]: searchString,
        },
        absentee: {
          [Op.like]: searchString,
        },
        substitute: {
          [Op.like]: searchString,
        },
      }
    }
  })
  for (let i in workplaceEvents) {
    const event = await Administrative.findOne({
      where: {
        id: workplaceEvents[i].administrativeId
      }
    });
    if (event != null) {
      if (!reportIds.includes(event.reportId)) {
        reportIds.push(Number(event.reportId));
      }
    }
  }

  const secretariatNotifications = await SecretariatNotification.findAll({
    where: {
      [Op.or]: {
        description: {
          [Op.like]: searchString,
        },
      }
    }
  })
  for (let i in secretariatNotifications) {
    const event = await Administrative.findOne({
      where: {
        id: secretariatNotifications[i].administrativeId
      }
    });
    if (event != null) {
      if (!reportIds.includes(event.reportId)) {
        reportIds.push(Number(event.reportId));
      }
    }
  }

  const defects = await Defect.findAll({
    where: {
      [Op.or]: {
        description: {
          [Op.like]: searchString,
        },
      }
    }
  })
  for (let i in defects) {
    const event = await Technical.findOne({
      where: {
        id: defects[i].technicalId
      }
    });
    if (event != null) {
      if (!reportIds.includes(event.reportId)) {
        reportIds.push(Number(event.reportId));
      }
    }
  }

  const malfunctions = await Malfunction.findAll({
    where: {
      [Op.or]: {
        description: {
          [Op.like]: searchString,
        },
      }
    }
  })
  for (let i in malfunctions) {
    const event = await Technical.findOne({
      where: {
        id: malfunctions[i].technicalId
      }
    });
    if (event != null) {
      if (!reportIds.includes(event.reportId)) {
        reportIds.push(Number(event.reportId));
      }
    }
  }

  res.send(reportIds);
});


/******************************************************************************
 *                      Search Reports - "GET /api/reports/pl/:pl"
 ******************************************************************************/

router.get('/pl/:pl', async (req: Request, res: Response) => {
  const pl: string = req.param('pl');
  const plString: string = '%' + pl + '%';
  let reportIds: Number[] = [];

  const operationalEvents = await OperationalEvent.findAll({
    where: {
      [Op.or]: {
        plNumber: {
          [Op.like]: plString,
        },
      }
    }
  })
  for (let i in operationalEvents) {
    const event = await Operational.findOne({
      where: {
        id: operationalEvents[i].operationalId
      }
    });
    if (event != null) {
      if (!reportIds.includes(event.reportId)) {
        reportIds.push(Number(event.reportId));
      }
    }
  }

  res.send(reportIds);
});

/******************************************************************************
 *        Get the content of a report - "GET /api/reports/content/:reportId"
 ******************************************************************************/
router.get('/content/:reportId', async (req: Request, res: Response) => {
  var results;
  let reportId = req.param('reportId');
  let report = await Report.findOne({
    where: {
      id: reportId,
    },
  });

  let operational = await Operational.findOne({
    where: {
      reportId: reportId
    }
  });
  let administrative = await Administrative.findOne({
    where: {
      reportId: reportId
    }
  });
  let technical = await Technical.findOne({
    where: {
      reportId: reportId
    }
  });

  let operationalEvents: OperationalEvent[] = [];
  let secretariatNotifications: SecretariatNotification[] = [];
  let workplaceEvents: WorkplaceEvent[] = [];
  let defects: Defect[] = [];
  let malfunctions: Malfunction[] = [];

  if (operational != null) {
    operationalEvents = await OperationalEvent.findAll({
      where: {
        operationalId: operational.id
      }
    })
  }
  if (technical != null) {
    defects = await Defect.findAll({
      where: {
        technicalId: technical.id
      },
      include: [{ model: DefectType }]
    })

    malfunctions = await Malfunction.findAll({
      where: {
        technicalId: technical.id
      },
      include: [{ model: MalfunctionType }]
    })
  }
  if (administrative != null) {
    workplaceEvents = await WorkplaceEvent.findAll({
      where: {
        administrativeId: administrative.id
      },
      include: [{ model: WorkplaceType }]
    })

    secretariatNotifications = await SecretariatNotification.findAll({
      where: {
        administrativeId: administrative.id
      }
    })
  }
  results = {
    report: report,
    operational: { operationalEvents },
    administrative: { workplaceEvents, secretariatNotifications },
    technical: { defects, malfunctions },
  };
  res.send(results);
  return res.json({ results });
});

/******************************************************************************
 *      Get all the notifications from a report - "GET /api/reports/notifications/:reportId"
 ******************************************************************************/
router.get('/notifications/:reportId', async (req: Request, res: Response) => {
  let reportId = req.param('reportId');

  let administrative = await Administrative.findOne({
    where: {
      reportId: reportId
    }
  });
  let technical = await Technical.findOne({
    where: {
      reportId: reportId
    }
  });

  let secretariatNotifications: SecretariatNotification[] = [];
  let workplaceEvents: WorkplaceEvent[] = [];
  let defects: Defect[] = [];
  let malfunctions: Malfunction[] = [];

  if (technical != null) {
    defects = await Defect.findAll({
      where: {
        technicalId: technical.id,
        monitoring: true
      },
    })

    malfunctions = await Malfunction.findAll({
      where: {
        technicalId: technical.id,
        monitoring: true
      },
    })
  }
  if (administrative != null) {
    workplaceEvents = await WorkplaceEvent.findAll({
      where: {
        administrativeId: administrative.id,
        monitoring: true
      },
    })

    secretariatNotifications = await SecretariatNotification.findAll({
      where: {
        administrativeId: administrative.id,
        monitoring: true
      }
    })
  }

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

  let operational = await Operational.findOne({
    where: {
      reportId: reportId
    }
  });

  let operationalEvents: OperationalEvent[] = [];

  if (operational != null) {
    operationalEvents = await OperationalEvent.findAll({
      where: {
        operationalId: operational.id,
        priority: true
      },
    })
  }

  let results = {
    operational: { operationalEvents },
  };

  console.log(operational);


  res.send(results);
});

/******************************************************************************
 *             Get types from Reports - "GET /api/reports/types"
 ******************************************************************************/

router.get('/types', async (req: Request, res: Response) => {
  let operationalTypes = await OperationalType.findAll({
    attributes: ['typeName'],
  });

  let workplaceTypes = await WorkplaceType.findAll({
    attributes: ['typeName'],
  });

  let defectTypes = await DefectType.findAll({
    attributes: ['typeName'],
  });

  let malfunctionTypes = await MalfunctionType.findAll({
    attributes: ['typeName'],
  });

  let result = { operationalTypes, workplaceTypes, defectTypes, malfunctionTypes };

  res.send(result);
});

/******************************************************************************
 *             Get types from Reports - "GET /api/reports/operationalTypes"
 ******************************************************************************/

router.get('/operationalTypes', async (req: Request, res: Response) => {
  var reports: (
    OperationalType[]
  )[] = [];

  var result;
  result = await OperationalType.findAll({
    attributes: ['typeName'],
  });
  if (result.length != 0) {
    console.log('\n\n\n\nresult OperationalType');
    console.log(result);
    console.log('\n\n\n\nreports OperationalType');

    if (!reports.includes(result)) {
      reports.push(result);
      console.log(reports);
    }
  }

  console.log('\n\n\n\nreports');
  console.log(reports);

  res.send(reports);
  return res.json({ reports });
});

/******************************************************************************
 *             Get types from Reports - "GET /api/reports/workplaceTypes"
 ******************************************************************************/

router.get('/workplaceTypes', async (req: Request, res: Response) => {
  var reports: (
    WorkplaceType[]
  )[] = [];

  var result;
  result = await WorkplaceType.findAll({
    attributes: ['typeName'],
  });
  if (result.length != 0) {
    console.log('\n\n\n\nresult WorkplaceType');
    console.log(result);
    console.log('\n\n\n\nreports WorkplaceType');

    if (!reports.includes(result)) {
      reports.push(result);
      console.log(reports);
    }
  }

  console.log('\n\n\n\nreports');
  console.log(reports);

  res.send(reports);
  return res.json({ reports });
});

/******************************************************************************
 *             Get types from Reports - "GET /api/reports/defectTypes"
 ******************************************************************************/

router.get('/defectTypes', async (req: Request, res: Response) => {
  var reports: (
    DefectType[]
  )[] = [];

  var result;
  result = await DefectType.findAll({
    attributes: ['typeName'],
  });
  if (result.length != 0) {
    console.log('\n\n\n\nresult DefectType');
    console.log(result);
    console.log('\n\n\n\nreports DefectType');

    if (!reports.includes(result)) {
      reports.push(result);
      console.log(reports);
    }
  }

  console.log('\n\n\n\nreports');
  console.log(reports);

  res.send(reports);
  return res.json({ reports });
});

/******************************************************************************
 *             Get types from Reports - "GET /api/reports/malfunctionTypes"
 ******************************************************************************/

router.get('/malfunctionTypes', async (req: Request, res: Response) => {
  var reports: (
    MalfunctionType[]
  )[] = [];

  var result;
  result = await MalfunctionType.findAll({
    attributes: ['typeName'],
  });
  if (result.length != 0) {
    console.log('\n\n\n\nresult MalfunctionType');
    console.log(result);
    console.log('\n\n\n\nreports MalfunctionType');

    if (!reports.includes(result)) {
      reports.push(result);
      console.log(reports);
    }
  }

  console.log('\n\n\n\nreports');
  console.log(reports);

  res.send(reports);
  return res.json({ reports });
});


/******************************************************************************
 *             Get event from Reports - "GET /api/reports/operationalEvent"
 ******************************************************************************/

router.get('/operationalEvent/:id', async (req: Request, res: Response) => {
  const eventId = req.param('id');
  const result = await OperationalEvent.findOne({
    where: {
      id: eventId
    },
  });
  if (result != null) {
    console.log('\n\n\n\nresult operationalEvent');
    console.log(result);

    res.send(result);
    return res.json({ result });
  }
  return false;
});


/******************************************************************************
 *             Get event from Reports - "GET /api/reports/workplaceEvent"
 ******************************************************************************/

router.get('/workplaceEvent/:id', async (req: Request, res: Response) => {
  const eventId = req.param('id');
  const result = await WorkplaceEvent.findOne({
    where: {
      id: eventId
    },
  });
  if (result != null) {
    console.log('\n\n\n\nresult WorkplaceEvent');
    console.log(result);

    res.send(result);
    return res.json({ result });
  }
  return false;
});

/******************************************************************************
 *             Get event from Reports - "GET /api/reports/secretariatNotification"
 ******************************************************************************/

router.get('/secretariatNotification/:id', async (req: Request, res: Response) => {
  const eventId = req.param('id');
  const result = await SecretariatNotification.findOne({
    where: {
      id: eventId
    },
  });
  if (result != null) {
    console.log('\n\n\n\nresult SecretariatNotification');
    console.log(result);

    res.send(result);
    return res.json({ result });
  }
  return false;
});

/******************************************************************************
 *             Get event from Reports - "GET /api/reports/defectEvent"
 ******************************************************************************/

router.get('/defectEvent/:id', async (req: Request, res: Response) => {
  const eventId = req.param('id');
  const result = await Defect.findOne({
    where: {
      id: eventId
    },
  });
  if (result != null) {
    console.log('\n\n\n\nresult Defect');
    console.log(result);

    res.send(result);
    return res.json({ result });
  }
  return false;
});

/******************************************************************************
 *             Get event from Reports - "GET /api/reports/malfunctionEvent"
 ******************************************************************************/

router.get('/malfunctionEvent/:id', async (req: Request, res: Response) => {
  const eventId = req.param('id');
  const result = await Malfunction.findOne({
    where: {
      id: eventId
    },
  });
  if (result != null) {
    console.log('\n\n\n\nresult Malfunction');
    console.log(result);

    res.send(result);
    return res.json({ result });
  }
  return false;
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
