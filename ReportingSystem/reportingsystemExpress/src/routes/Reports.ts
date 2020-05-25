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
import WorkplaceSubtype from 'src/models/workplaceSubtype';
import DefectSubtype from 'src/models/defectSubtype';
import MalfunctionSubtype from 'src/models/malfunctionSubtype';
import OperationalSubtype from 'src/models/operationalSubtype';
import EventType from 'src/models/eventType';

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

  interface reportData {
    reportId: number;
    description: string;
    date: Date;
  }

  let reportIds: reportData[] = [];

  let operationalEvents;
  operationalEvents = await OperationalEvent.findAll({
    where: {
      signaling: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in operationalEvents) {
    const event = await Operational.findOne({
      where: {
        id: operationalEvents[i].operationalId
      }
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: operationalEvents[i].signaling, date: operationalEvents[i].date };

      let inside = false;
      for (let i = 0; i < reportIds.length; i++) {
        const curReport = reportIds[i];

        if (curReport.reportId == report.reportId)
          inside = true;
      }
      if (!inside)
        reportIds.push(report);
    }
  }

  operationalEvents = await OperationalEvent.findAll({
    where: {
      plNumber: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in operationalEvents) {
    const event = await Operational.findOne({
      where: {
        id: operationalEvents[i].operationalId
      }
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: operationalEvents[i].plNumber, date: operationalEvents[i].date };

      let inside = false;
      for (let i = 0; i < reportIds.length; i++) {
        const curReport = reportIds[i];

        if (curReport.reportId == report.reportId)
          inside = true;
      }
      if (!inside)
        reportIds.push(report);
    }
  }

  operationalEvents = await OperationalEvent.findAll({
    where: {
      description: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in operationalEvents) {
    const event = await Operational.findOne({
      where: {
        id: operationalEvents[i].operationalId
      }
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: operationalEvents[i].description, date: operationalEvents[i].date };

      let inside = false;
      for (let i = 0; i < reportIds.length; i++) {
        const curReport = reportIds[i];

        if (curReport.reportId == report.reportId)
          inside = true;
      }
      if (!inside)
        reportIds.push(report);
    }
  }

  operationalEvents = await OperationalEvent.findAll({
    where: {
      location: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in operationalEvents) {
    const event = await Operational.findOne({
      where: {
        id: operationalEvents[i].operationalId
      }
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: operationalEvents[i].location, date: operationalEvents[i].date };

      let inside = false;
      for (let i = 0; i < reportIds.length; i++) {
        const curReport = reportIds[i];

        if (curReport.reportId == report.reportId)
          inside = true;
      }
      if (!inside)
        reportIds.push(report);
    }
  }

  operationalEvents = await OperationalEvent.findAll({
    where: {
      unit: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in operationalEvents) {
    const event = await Operational.findOne({
      where: {
        id: operationalEvents[i].operationalId
      }
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: operationalEvents[i].unit, date: operationalEvents[i].date };

      let inside = false;
      for (let i = 0; i < reportIds.length; i++) {
        const curReport = reportIds[i];

        if (curReport.reportId == report.reportId)
          inside = true;
      }
      if (!inside)
        reportIds.push(report);
    }
  }

  const operationalEventsDates = await OperationalEvent.findAll();
  for (let i = 0; i < operationalEventsDates.length; i++) {
    const curEvent = operationalEventsDates[i];
    let dateString = curEvent.date.toLocaleString();

    if (dateString.includes(search)) {
      const event = await Operational.findOne({
        where: {
          id: curEvent.operationalId
        }
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, description: dateString, date: curEvent.date };

        let inside = false;
        for (let i = 0; i < reportIds.length; i++) {
          const curReport = reportIds[i];

          if (curReport.reportId == report.reportId)
            inside = true;
        }
        if (!inside)
          reportIds.push(report);
      }
    }
  }

  let workplaceEvents;
  workplaceEvents = await WorkplaceEvent.findAll({
    where: {
      description: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in workplaceEvents) {
    const event = await Administrative.findOne({
      where: {
        id: workplaceEvents[i].administrativeId
      }
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: workplaceEvents[i].description, date: workplaceEvents[i].date };

      let inside = false;
      for (let i = 0; i < reportIds.length; i++) {
        const curReport = reportIds[i];

        if (curReport.reportId == report.reportId)
          inside = true;
      }
      if (!inside)
        reportIds.push(report);
    }
  }

  workplaceEvents = await WorkplaceEvent.findAll({
    where: {
      absentee: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in workplaceEvents) {
    const event = await Administrative.findOne({
      where: {
        id: workplaceEvents[i].administrativeId
      }
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: workplaceEvents[i].absentee, date: workplaceEvents[i].date };

      let inside = false;
      for (let i = 0; i < reportIds.length; i++) {
        const curReport = reportIds[i];

        if (curReport.reportId == report.reportId)
          inside = true;
      }
      if (!inside)
        reportIds.push(report);
    }
  }

  workplaceEvents = await WorkplaceEvent.findAll({
    where: {
      substitute: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in workplaceEvents) {
    const event = await Administrative.findOne({
      where: {
        id: workplaceEvents[i].administrativeId
      }
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: workplaceEvents[i].substitute, date: workplaceEvents[i].date };

      let inside = false;
      for (let i = 0; i < reportIds.length; i++) {
        const curReport = reportIds[i];

        if (curReport.reportId == report.reportId)
          inside = true;
      }
      if (!inside)
        reportIds.push(report);
    }
  }

  const workplaceEventsDates = await WorkplaceEvent.findAll();
  for (let i = 0; i < workplaceEventsDates.length; i++) {
    const curEvent = workplaceEventsDates[i];
    let dateString = curEvent.date.toLocaleString();

    if (dateString.includes(search)) {
      const event = await Administrative.findOne({
        where: {
          id: curEvent.administrativeId
        }
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, description: dateString, date: curEvent.date };

        let inside = false;
        for (let i = 0; i < reportIds.length; i++) {
          const curReport = reportIds[i];

          if (curReport.reportId == report.reportId)
            inside = true;
        }
        if (!inside)
          reportIds.push(report);
      }
    }
  }

  let secretariatNotifications;
  secretariatNotifications = await SecretariatNotification.findAll({
    where: {
      description: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in secretariatNotifications) {
    const event = await Administrative.findOne({
      where: {
        id: secretariatNotifications[i].administrativeId
      }
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: secretariatNotifications[i].description, date: secretariatNotifications[i].date };

      let inside = false;
      for (let i = 0; i < reportIds.length; i++) {
        const curReport = reportIds[i];

        if (curReport.reportId == report.reportId)
          inside = true;
      }
      if (!inside)
        reportIds.push(report);
    }
  }

  const secretariatNotificationsDates = await SecretariatNotification.findAll();
  for (let i = 0; i < secretariatNotificationsDates.length; i++) {
    const curEvent = secretariatNotificationsDates[i];
    let dateString = curEvent.date.toLocaleString();

    if (dateString.includes(search)) {
      const event = await Administrative.findOne({
        where: {
          id: curEvent.administrativeId
        }
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, description: dateString, date: curEvent.date };

        let inside = false;
        for (let i = 0; i < reportIds.length; i++) {
          const curReport = reportIds[i];

          if (curReport.reportId == report.reportId)
            inside = true;
        }
        if (!inside)
          reportIds.push(report);
      }
    }
  }

  let defects;
  defects = await Defect.findAll({
    where: {
      description: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in defects) {
    const event = await Technical.findOne({
      where: {
        id: defects[i].technicalId
      }
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: defects[i].description, date: defects[i].date };

      let inside = false;
      for (let i = 0; i < reportIds.length; i++) {
        const curReport = reportIds[i];

        if (curReport.reportId == report.reportId)
          inside = true;
      }
      if (!inside)
        reportIds.push(report);
    }
  }

  const defectsDates = await Defect.findAll();
  for (let i = 0; i < defectsDates.length; i++) {
    const curEvent = defectsDates[i];
    let dateString = curEvent.date.toLocaleString();

    if (dateString.includes(search)) {
      const event = await Technical.findOne({
        where: {
          id: curEvent.technicalId
        }
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, description: dateString, date: curEvent.date };

        let inside = false;
        for (let i = 0; i < reportIds.length; i++) {
          const curReport = reportIds[i];

          if (curReport.reportId == report.reportId)
            inside = true;
        }
        if (!inside)
          reportIds.push(report);
      }
    }
  }

  let malfunctions;
  malfunctions = await Malfunction.findAll({
    where: {
      description: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in malfunctions) {
    const event = await Technical.findOne({
      where: {
        id: malfunctions[i].technicalId
      }
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: malfunctions[i].description, date: malfunctions[i].date };

      let inside = false;
      for (let i = 0; i < reportIds.length; i++) {
        const curReport = reportIds[i];

        if (curReport.reportId == report.reportId)
          inside = true;
      }
      if (!inside)
        reportIds.push(report);
    }
  }

  const malfunctionsDates = await Malfunction.findAll();
  for (let i = 0; i < malfunctionsDates.length; i++) {
    const curEvent = malfunctionsDates[i];
    let dateString = curEvent.date.toLocaleString();

    if (dateString.includes(search)) {
      const event = await Technical.findOne({
        where: {
          id: curEvent.technicalId
        }
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, description: dateString, date: curEvent.date };

        let inside = false;
        for (let i = 0; i < reportIds.length; i++) {
          const curReport = reportIds[i];

          if (curReport.reportId == report.reportId)
            inside = true;
        }
        if (!inside)
          reportIds.push(report);
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

  interface reportData {
    reportId: number;
    description: string;
    date: Date;
  }

  let reportIds: reportData[] = [];

  const operationalEvents = await OperationalEvent.findAll({
    where: {
      plNumber: {
        [Op.like]: plString,
      },
    },
  });
  for (let i in operationalEvents) {
    const event = await Operational.findOne({
      where: {
        id: operationalEvents[i].operationalId
      }
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: operationalEvents[i].plNumber, date: operationalEvents[i].date };

      let inside = false;
      for (let i = 0; i < reportIds.length; i++) {
        const curReport = reportIds[i];

        if (curReport.reportId == report.reportId)
          inside = true;
      }
      if (!inside)
        reportIds.push(report);
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
      order: ['date'],
      where: {
        operationalId: operational.id
      },
      include: [{
        model: EventType,
        include: [
          OperationalType,
          OperationalSubtype,
        ]
      }]
    });
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

  console.log(results);

  res.send(results);
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



  res.send(results);
});

/******************************************************************************
 *             Get types from Reports - "GET /api/reports/types"
 ******************************************************************************/
// normaal gezien ongebruikt
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
  let operationalTypes = await OperationalType.findAll({
    attributes: ['id', 'typeName'],
  });

  let operationalSubtypes = await OperationalSubtype.findAll({
    attributes: ['operationalTypeId', 'typeName'],
  })

  let results = { operationalTypes, operationalSubtypes };
  res.send(results);
});

/******************************************************************************
 *             Get types from Reports - "GET /api/reports/workplaceTypes"
 ******************************************************************************/

router.get('/workplaceTypes', async (req: Request, res: Response) => {
  let workplaceTypes = await WorkplaceType.findAll({
    attributes: ['id', 'typeName'],
  });

  let workplaceSubtypes = await WorkplaceSubtype.findAll({
    attributes: ['workplaceTypeId', 'typeName'],
  })

  let results = { workplaceTypes, workplaceSubtypes }
  res.send(results);
});

/******************************************************************************
 *             Get types from Reports - "GET /api/reports/defectTypes"
 ******************************************************************************/

router.get('/defectTypes', async (req: Request, res: Response) => {
  let defectTypes = await DefectType.findAll({
    attributes: ['id', 'typeName'],
  });

  let defectSubtypes = await DefectSubtype.findAll({
    attributes: ['defectTypeId', 'typeName'],
  })

  let results = { defectTypes, defectSubtypes }
  res.send(results);
});

/******************************************************************************
 *             Get types from Reports - "GET /api/reports/malfunctionTypes"
 ******************************************************************************/

router.get('/malfunctionTypes', async (req: Request, res: Response) => {
  let malfunctionTypes = await MalfunctionType.findAll({
    attributes: ['id', 'typeName'],
  });

  let malfunctionSubtypes = await MalfunctionSubtype.findAll({
    attributes: ['malfunctionTypeId', 'typeName'],
  })

  let results = { malfunctionTypes, malfunctionSubtypes }
  res.send(results);
});


/******************************************************************************
 *             Get event from Reports - "GET /api/reports/operationalEvent/:id"
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
  }
  return false;
});


/******************************************************************************
 *             Get event from Reports - "GET /api/reports/workplaceEvent/:id"
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
  }
  return false;
});

/******************************************************************************
 *             Get event from Reports - "GET /api/reports/secretariatNotification/:id"
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
  }
  return false;
});

/******************************************************************************
 *             Get event from Reports - "GET /api/reports/defectEvent/:id"
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
  }
  return false;
});

/******************************************************************************
 *             Get event from Reports - "GET /api/reports/malfunctionEvent/:id"
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
  }
  return false;
});


/******************************************************************************
 *             Get event from Reports - "GET /api/reports/operationalEventTypes/:id"
 ******************************************************************************/
router.get('/operationalEventTypes/:id', async (req: Request, res: Response) => {
  const eventId = req.param('id');

  let selectedTypes: string[] = [];
  let selectedSubtypes: string[] = [];
  let operationalType;
  let operationalSubtype;

  const event = await OperationalEvent.findOne({
    where: {
      id: eventId
    }
  });
  if (event != null) {
    let eventTypes = await EventType.findAll({
      where: {
        operationalEventId: event.id
      }
    });
    if (eventTypes != null) {
      for (let i = 0; i < eventTypes.length; i++) {
        const eventType = eventTypes[i];

        operationalType = await OperationalType.findOne({
          where: {
            id: eventType.operationalTypeId
          }
        });
        if (operationalType != null) {
          if (!selectedTypes.includes(operationalType.typeName)) {
            selectedTypes.push(operationalType.typeName)
          }
        }

        operationalSubtype = await OperationalSubtype.findOne({
          where: {
            id: eventType.operationalSubtypeId
          }
        });
        if (operationalSubtype != null) {
          selectedSubtypes.push(operationalSubtype.typeName)
        }
      }

    }

    const result = { selectedTypes, selectedSubtypes };
    res.send(result);
  }
  res.send("");
});

/******************************************************************************
 *             Get event from Reports - "GET /api/reports/workplaceEventTypes/:id"
 ******************************************************************************/

router.get('/workplaceEventTypes/:id', async (req: Request, res: Response) => {
  const eventId = req.param('id');
  const event = await WorkplaceEvent.findOne({
    where: {
      id: eventId
    }
  });
  if (event != null) {
    let workplaceTypeId = event.workplaceTypeId;
    let workplaceSubtypeId = event.workplaceSubtypeId;

    let type;
    let typeName = "";
    if (workplaceTypeId != null) {
      type = await WorkplaceType.findOne({
        where: {
          id: workplaceTypeId
        }
      })
      if (type != null) {
        typeName = type.typeName;
      }
    }

    let subtype;
    let subtypeName = "";
    if (workplaceSubtypeId != null) {
      subtype = await WorkplaceSubtype.findOne({
        where: {
          id: workplaceSubtypeId
        }
      });
      if (subtype != null) {
        subtypeName = subtype.typeName;
      }
    }

    const result = { typeName, subtypeName };
    res.send(result);
  }
  res.send("");
});

/******************************************************************************
 *             Get event from Reports - "GET /api/reports/defectTypes/:id"
 ******************************************************************************/

router.get('/defectTypes/:id', async (req: Request, res: Response) => {
  const eventId = req.param('id');
  const event = await Defect.findOne({
    where: {
      id: eventId
    },
  });
  if (event != null) {
    let defectTypeId = event.defectTypeId;
    let defectSubtypeId = event.defectSubtypeId;

    let type;
    let typeName = "";
    if (defectTypeId != null) {
      type = await DefectType.findOne({
        where: {
          id: defectTypeId
        }
      })
      if (type != null) {
        typeName = type.typeName;
      }
    }

    let subtype;
    let subtypeName = "";
    if (defectSubtypeId != null) {
      subtype = await DefectSubtype.findOne({
        where: {
          id: defectSubtypeId
        }
      });
      if (subtype != null) {
        subtypeName = subtype.typeName;
      }
    }

    const result = { typeName, subtypeName };
    res.send(result);
  }
  res.send("");
});

/******************************************************************************
 *             Get event from Reports - "GET /api/reports/malfunctionTypes/:id"
 ******************************************************************************/

router.get('/malfunctionTypes/:id', async (req: Request, res: Response) => {
  const eventId = req.param('id');
  const event = await Malfunction.findOne({
    where: {
      id: eventId
    },
  });
  if (event != null) {
    let malfunctionTypeId = event.malfunctionTypeId;
    let malfunctionSubtypeId = event.malfunctionSubtypeId;

    let type;
    let typeName = "";
    if (malfunctionTypeId != null) {
      type = await MalfunctionType.findOne({
        where: {
          id: malfunctionTypeId
        }
      })
      if (type != null) {
        typeName = type.typeName;
      }
    }

    let subtype;
    let subtypeName = "";
    if (malfunctionSubtypeId != null) {
      subtype = await MalfunctionSubtype.findOne({
        where: {
          id: malfunctionSubtypeId
        }
      });
      if (subtype != null) {
        subtypeName = subtype.typeName;
      }
    }

    const result = { typeName, subtypeName };
    res.send(result);
  }
  res.send("");
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
