import { Op } from 'sequelize';
import { Request, Response, Router } from 'express';
import OperationalEvent from 'src/models/operationalEvent';
import SecretariatNotification from '../models/secretariatNotification';
import Report from '../models/report';

import Defect from 'src/models/defect';
import Malfunction from 'src/models/malfunction';
import WorkplaceEvent from 'src/models/workplaceEvent';

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
import DummyDatabase from 'src/models/dummyDataBase';

// Init router
const router = Router();

/******************************************************************************
 *                   Get All Reports - "GET /api/reports/all"
 ******************************************************************************/

// only get the reports that are finished

router.post('/all', async (req: Request, res: Response) => {
  const offset = req.body.offset;
  const reports = await Report.findAll({
    offset: offset,
    limit: 10,
    order: [['date', 'DESC']],
    where: {
      temporary: false,
    },
    attributes: ['id', 'date', 'nightShift'],
  });
  res.send(reports);
});

/******************************************************************************
 *                   Count All Reports - "GET /api/reports/count"
 ******************************************************************************/

router.get('/count', async (req: Request, res: Response) => {
  const count = await Report.count({
    where: {
      temporary: false,
    },
  });
  res.send({count: count});
});


/******************************************************************************
 *          Get the report from the last shift - "GET /api/reports/lastShift"
 ******************************************************************************/

router.get('/lastShift', async (req: Request, res: Response) => {
  const reports = await Report.findOne({
    order: [['date', 'DESC']],
    offset: 1,
    where: {
      temporary: false,
    },
    attributes: ['id'],
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
interface reportData {
  reportId: number;
  description: string;
  date: Date;
  nightShift: Boolean;
}

router.get('/search/:keyword', async (req: Request, res: Response) => {
  const search: string = req.param('keyword');
  const searchString: string = '%' + search + '%';

  let reportIds: reportData[] = [];

  let operationalEvents = await OperationalEvent.findAll({
    where: {
      signaling: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in operationalEvents) {
    const curEvent = operationalEvents[i];
    const event = await Operational.findOne({
      where: {
        id: curEvent.operationalId
      },
      include: [{ model: Report }]
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: curEvent.signaling, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
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
    const curEvent = operationalEvents[i];
    const event = await Operational.findOne({
      where: {
        id: curEvent.operationalId
      },
      include: [{ model: Report }]
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: curEvent.plNumber, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
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
    const curEvent = operationalEvents[i];
    const event = await Operational.findOne({
      where: {
        id: curEvent.operationalId
      },
      include: [{ model: Report }]
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: curEvent.description, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
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
    const curEvent = operationalEvents[i];
    const event = await Operational.findOne({
      where: {
        id: curEvent.operationalId
      },
      include: [{ model: Report }]
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: curEvent.location, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
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
    const curEvent = operationalEvents[i];
    const event = await Operational.findOne({
      where: {
        id: curEvent.operationalId
      },
      include: [{ model: Report }]
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: curEvent.unit, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }

  operationalEvents = await OperationalEvent.findAll();
  for (let i = 0; i < operationalEvents.length; i++) {
    const curEvent = operationalEvents[i];
    let dateString = curEvent.date.toLocaleString();

    if (dateString.includes(search)) {
      const event = await Operational.findOne({
        where: {
          id: curEvent.operationalId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, description: dateString, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }

  let workplaceEvents = await WorkplaceEvent.findAll({
    where: {
      description: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in workplaceEvents) {
    const curEvent = workplaceEvents[i];
    const event = await Administrative.findOne({
      where: {
        id: curEvent.administrativeId
      },
      include: [{ model: Report }]
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: curEvent.description, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
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
    const curEvent = workplaceEvents[i];
    const event = await Administrative.findOne({
      where: {
        id: curEvent.administrativeId
      },
      include: [{ model: Report }]
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: curEvent.absentee, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
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
    const curEvent = workplaceEvents[i];
    const event = await Administrative.findOne({
      where: {
        id: curEvent.administrativeId
      },
      include: [{ model: Report }]
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: curEvent.substitute, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }

  workplaceEvents = await WorkplaceEvent.findAll();
  for (let i = 0; i < workplaceEvents.length; i++) {
    const curEvent = workplaceEvents[i];
    let dateString = curEvent.date.toLocaleString();

    if (dateString.includes(search)) {
      const event = await Administrative.findOne({
        where: {
          id: curEvent.administrativeId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, description: dateString, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }

  let secretariatNotifications = await SecretariatNotification.findAll({
    where: {
      description: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in secretariatNotifications) {
    const curEvent = secretariatNotifications[i];
    const event = await Administrative.findOne({
      where: {
        id: secretariatNotifications[i].administrativeId
      },
      include: [{ model: Report }]
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: curEvent.description, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }

  secretariatNotifications = await SecretariatNotification.findAll();
  for (let i = 0; i < secretariatNotifications.length; i++) {
    const curEvent = secretariatNotifications[i];
    let dateString = curEvent.date.toLocaleString();

    if (dateString.includes(search)) {
      const event = await Administrative.findOne({
        where: {
          id: curEvent.administrativeId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, description: dateString, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }

  let defects = await Defect.findAll({
    where: {
      description: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in defects) {
    const curEvent = defects[i];
    const event = await Technical.findOne({
      where: {
        id: defects[i].technicalId
      },
      include: [{ model: Report }]
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: curEvent.description, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }

  defects = await Defect.findAll();
  for (let i = 0; i < defects.length; i++) {
    const curEvent = defects[i];
    let dateString = curEvent.date.toLocaleString();

    if (dateString.includes(search)) {
      const event = await Technical.findOne({
        where: {
          id: curEvent.technicalId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, description: dateString, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }

  let malfunctions = await Malfunction.findAll({
    where: {
      description: {
        [Op.like]: searchString,
      },
    },
  });
  for (let i in malfunctions) {
    const curEvent = malfunctions[i];
    const event = await Technical.findOne({
      where: {
        id: malfunctions[i].technicalId
      },
      include: [{ model: Report }]
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: curEvent.description, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }

  malfunctions = await Malfunction.findAll();
  for (let i = 0; i < malfunctions.length; i++) {
    const curEvent = malfunctions[i];
    let dateString = curEvent.date.toLocaleString();

    if (dateString.includes(search)) {
      const event = await Technical.findOne({
        where: {
          id: curEvent.technicalId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, description: dateString, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }

  res.send(reportIds);
});

function addReport(report: reportData, reportIds: reportData[]) {
  let inside = false;
  for (let i = 0; i < reportIds.length; i++) {
    const curReport = reportIds[i];

    if (curReport.reportId == report.reportId)
      inside = true;
  }
  if (!inside)
    reportIds.push(report);
}

/******************************************************************************
 *                      Search Reports - "GET /api/reports/pl/:pl"
 ******************************************************************************/

router.get('/pl/:pl', async (req: Request, res: Response) => {
  const pl: string = req.param('pl');
  const plString: string = '%' + pl + '%';

  let reportIds: reportData[] = [];

  const operationalEvents = await OperationalEvent.findAll({
    where: {
      plNumber: {
        [Op.like]: plString,
      },
    },
  });
  for (let i in operationalEvents) {
    const curEvent = operationalEvents[i];
    const event = await Operational.findOne({
      where: {
        id: curEvent.operationalId
      },
      include: [{ model: Report }]
    });
    if (event != null) {
      let report: reportData = { reportId: event.reportId, description: curEvent.plNumber, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
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
      include: [DefectType, DefectSubtype ]
    })

    malfunctions = await Malfunction.findAll({
      where: {
        technicalId: technical.id
      },
      include: [ MalfunctionType, MalfunctionSubtype ]
    })
  }
  if (administrative != null) {
    workplaceEvents = await WorkplaceEvent.findAll({
      where: {
        administrativeId: administrative.id
      },
      include: [ WorkplaceType, WorkplaceSubtype]
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
  } else {
    res.send("");
  }
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
 *      Remove notification from event - "POST /api/reports/removeNotification"
 ******************************************************************************/
router.post('/removeNotification', async (req, res) => {
  const category = req.body.category;
  const eventId = req.body.id;
  if (category === "WorkplaceEvent") {
    const event = await WorkplaceEvent.findOne({
      where: {
        id: eventId
      }
    });
    if (event != null) {
      event.monitoring = false;
      await event.save();
      res.send(true);
    }
  }
  else if (category === "SecretariatNotification") {
    const event = await SecretariatNotification.findOne({
      where: {
        id: eventId
      }
    });
    if (event !== null) {
      event.monitoring = false;
      await event.save();
      res.send(true);
    }
  }
  else if (category === "Defect") {
    const event = await Defect.findOne({
      where: {
        id: eventId
      }
    });
    if (event != null) {
      event.monitoring = false;
      await event.save();
      res.send(true);
    }

  }
  else if (category === "Malfunction") {
    const event = await Malfunction.findOne({
      where: {
        id: eventId
      }
    });
    if (event != null) {
      event.monitoring = false;
      await event.save();
      res.send(true);
    }
  }


});


/******************************************************************************
 *      POST Autosave Operational event - "POST /api/reports/autoSaveOperational"
 ******************************************************************************/
router.post('/autoSaveOperational', async (req, res) => {
  await OperationalEvent.findAll({
    where:{
      authorId: req.body.id,
    }
  }).then(async function(entries) {
    await entries[0].update({
      signaling: req.body.signaling,
      plNumber: req.body.plNumber,
      description: req.body.description,
      priority: req.body.priority,
      location: req.body.location,
      unit: req.body.unit,
      date: Date.now(),
    })
    }).catch(async function(err) {
      await OperationalEvent.create({
        authorId: req.body.id,
        signaling: req.body.signaling,
        plNumber: req.body.plNumber,
        description: req.body.description,
        priority: req.body.priority,
        location: req.body.location,
        unit: req.body.unit,
        date: Date.now(),
      }).then(async function(event){
        res.json({
          bool: true
        })
      })
  })
})

/******************************************************************************
 *      GET Autosaved Operational event - "POST /api/reports/autoSaveOperational"
 ******************************************************************************/
router.post('/getAutoSavedFile', async (req, res) => {
  await OperationalEvent.findAll({
    where: {
      authorId: req.body.id,
      operationalId :null
    }
  }).then(function(entries) {
    res.json({
      bool: true,
      entry: entries[0],
    });
  }).catch(function() {
    res.json({
      bool: false,
    })
  })
})


/******************************************************************************
 *      POST data from file in dummydatabase - "POST /api/reports/getFile"
 ******************************************************************************/
router.post('/getFile', async (req, res) => {
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


/******************************************************************************
 *      POST Add secretary notification - "POST /api/reports/addSecretaryNotification"
 ******************************************************************************/
router.post('/addSecretaryNotification', async (req, res) => {
  Administrative.findAll({
    limit: 1,
    order: [ ['reportId', 'DESC']]
  }).then(function(entries){
    SecretariatNotification.create({
      authorId: req.body.id,
      administrativeId: entries[0].id,
      description: req.body.description,
      monitoring: req.body.monitoring,
      date: Date.now(),
    }).then(function(not) {
      SecretariatNotification.sync();
      res.json({
        bool: true
      })
    })
    .catch(function(err) {
      res.json({
        bool: false,
        message: err
      })
    })
  })
})

/******************************************************************************
 *      POST Add Operational Event - "POST /api/reports/addOperationalEvent"
 ******************************************************************************/
router.post('/addOperationalEvent', async (req, res) => {
  const selectedTypes = req.body.types;
  const selectedSubtypes = req.body.subtypes;
  Operational.findAll({
    limit: 1,
    order: [ ['reportId', 'DESC']]
  }).then(function(entries){

    OperationalEvent.create({
      plNumber: req.body.plNumber,
      authorId: req.body.id,
      location: req.body.location,
      date: Date.now(),
      description: req.body.message,
      unit: req.body.unit,
      operationalId: entries[0].id,
      monitoring: req.body.monitoring,
      priority: req.body.priority,
    }).then(async function(event) {
      OperationalEvent.findAll({
        where:{
          authorId: req.body.id,
          operationalId: {
            [Op.eq]: null
          }
        }
      }).then(function(entries){
        if (entries.length > 0){
          entries[0].destroy({});

        }
      })
      OperationalEvent.sync();
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
      res.json({
        bool: true,
      })
    }).catch(function(err) {
      res.json({
        bool: false,
        message: 'OperationalEvent was not created '  + err
      })
    })
  }).catch(function(err){
    res.json({
      bool: false,
      message:"No operational row found  " + err
    })
  });
  
});


/******************************************************************************
 *      POST Add WorkPlaceEvent - "POST /api/reports/addWorkPlaceEvent"
 ******************************************************************************/
router.post('/addWorkPlaceEvent', async (req, res) => {
  
  Administrative.findAll({
    limit: 1,
    order: [ ['reportId', 'DESC']]
  }).then(async function(entries){
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
   WorkplaceEvent.create({
     authorId: req.body.id,
     administrativeId: entries[0].id,
     workplaceTypeId: workplaceTypeId,
     WorkplaceSubtypeId: workplaceSubtypeId,
     description: req.body.message,
     absentee: req.body.absentee,
     substitute: req.body.substitute,
     monitoring: req.body.monitoring,
     date: Date.now(),
   }).then(function(){
    res.json({bool: true})
   }).catch(function(){
    res.json({bool: false, message: "Kon geen event aanmaken"})
   });
  }).catch(function(err) {
      res.json({
        bool: false,
        message: err
      })
    })
});

/******************************************************************************
 *      POST Add Malfunction - "POST /api/reports/addMalfunction"
 ******************************************************************************/
router.post('/addMalfunction', async(req, res) => {
  Technical.findAll({
    limit: 1,
    order: [ ['reportId', 'DESC']]
  }).then(async function(entries){
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
    Malfunction.create({
      technicalId: entries[0].id,
      authorId: req.body.id,
      malfunctionTypeId: malfunctionTypeId,
      malfunctionSubtypeId: malfunctionSubtypeId,
      description: req.body.description,
      monitoring: req.body.monitoring,
      date: Date.now(),
      duration: req.body.duration,
    }).then(function() {
      Defect.sync();
      res.json({
        bool: true
      })
    }).catch(function(){
      res.json({bool: false, message:'Couldnt make Defect'})
    })

  }).catch(function(err) {
      res.json({
        bool: false,
        message: err
      })
    })
})


/******************************************************************************
 *      POST Add Defect - "POST /api/reports/addDefect"
 ******************************************************************************/
router.post('/addDefect', async (req, res) => {
  Technical.findAll({
    limit: 1,
    order: [ ['reportId', 'DESC']]
  }).then(async function(entries){
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
  Defect.create({
    technicalId: entries[0].id,
    authorId: req.body.id,
    defectTypeId: defectTypeId,
    defectSubtypeId: defectSubtypeId,
    description: req.body.description,
    monitoring: req.body.monitoring,
    date: Date.now(),
  }).then(function() {
    Defect.sync();
    res.json({
      bool: true
    })
  }).catch(function(){
    res.json({bool: false, message:'Couldnt make Defect'})
  })

  }).catch(function(err) {
      res.json({
        bool: false,
        message: err
      })
    })
});

/******************************************************************************
 *      POST Change Operational Event - "POST /api/reports/changeOperationalEvent"
 ******************************************************************************/
router.post('/changeOperationalEvent', async (req, res) => {
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

 /******************************************************************************
 *      POST Change Workplace Event - "POST /api/reports/changeWorkplaceEvent"
 ******************************************************************************/

router.post('/changeWorkplaceEvent', async (req, res) => {
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

/******************************************************************************
 *      POST Change Secretariat Notification - "POST /api/reports/changeSecretariatNotification"
 ******************************************************************************/
router.post('/changeSecretariatNotification', async (req, res) => {

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

/******************************************************************************
 *      POST Change Defect - "POST /api/reports/changeDefect"
 ******************************************************************************/
router.post('/changeDefect', async (req, res) => {
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


 /******************************************************************************
 *      POST Change Malfunction - "POST /api/reports/changeMalfunction"
 ******************************************************************************/
router.post('/changeMalfunction', async (req, res) => {
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

 /******************************************************************************
 *      GET Get Operational Events - "POST /api/reports/getOperationalEvents"
 ******************************************************************************/
router.post("/getOperationalEvents", async (req, res) => {
  var matched_events = await OperationalEvent.findAll({
    where: { plNumber: { [Op.like]: req.body.plNumber } },
    limit: 5
  });
  res.json(matched_events);
});

/******************************************************************************
 *      POST Add Types - "POST /api/reports/addTypes"
 ******************************************************************************/
router.post("/addTypes", async (req, res) => {
  const data = req.body;
  //OPERTATIONEEL TYPE TOEVOEGEN
  console.log(data.operationaltype, data.workplacetype, data.defectTypes, data.malfunctionTypes)
  if (data.type == 0) {
    if ( data.operationaltype == -1) {
      OperationalType.create({
        typeName: data.field,
      }).then(function(){
        OperationalType.sync();
        res.json({
          check: true,
          message: "Nieuw type aangemaakt"
        })
      }).catch(function(err : Error) {
        res.json({
          check:false,
          message: "Type niet aangemaakt" + err
        })
      });
      
    } else {
      OperationalSubtype.create({
        typeName: data.field,
        operationalTypeId: data.operationaltype
      }).then(function(){
        OperationalSubtype.sync();
        res.json({
          check: true,
          message: "Nieuw subtype aangemaakt"
        })
      }).catch(function(err : Error){
        res.json({
          check:false,
          message: "Subtype niet aangemaakt" + err
        })
      });
      
    }
    // PERSONEEL TYPE TOEVOEGEN
  } else if (data.type == 1) {
    if (data.workplacetype == -1) {
      WorkplaceType.create({
        typeName: data.field,
      }).then(function(){
        WorkplaceType.sync();
        res.json({
          check: true,
          message: "Nieuw type aangemaakt"
        })
      }).catch(function(err : Error) {
        res.json({
          check:false,
          message: "Type niet aangemaakt" + err
        })
      });
     
    } else {
      WorkplaceSubtype.create({
        typeName: data.field,
        workplaceTypeId: data.workplacetype
      }).then(function(){
        WorkplaceSubtype.sync();
        res.json({
          check: true,
          message: "Nieuw subtype aangemaakt"
        });
      }).catch(function(err : Error) {
        res.json({
          check:false,
          message: "Subype niet aangemaakt" + err
        })
      });
      
    
  }
    //LOGISTIEK TYPE TOEVOEGEN
  } else if (data.type == 2) { //LOG
    if (data.defectTypes ==  -1) {
      DefectType.create({
        typeName: data.field,
      }).then(function(){
        DefectType.sync();
        res.json({
          check: true,
          message: "Nieuw type aangemaakt"
        })
      }).catch(function(err : Error){
        res.json({
          check:false,
          message: "Type niet aangemaakt" + err
        })
      });
      
    } else {
      DefectSubtype.create({
        typeName: data.field,
        defectTypeId: data.defectTypes
      }).then(function(){
        DefectSubtype.sync();
        res.json({
          check: true,
          message: "Nieuw subtype aangemaakt"
        })
      }).catch(function(err : Error){
        res.json({
          check:false,
          message: "Subype niet aangemaakt" + err
        })
      });
      
    }
    //TECHNISCH TYPE TOEVOEGEN
  } else if (data.type == 3) { //TECH
    if (data.malfunctionTypes == -1) {
      MalfunctionType.create({
        typeName: data.field,
      }).then(function(){
        MalfunctionType.sync();
        res.json({
          check: true,
          message: "Nieuw type aangemaakt"
        })
      }).catch(function(err : Error){
        res.json({
          check:false,
          message: "Type niet aangemaakt" + err
        })
      });
      
    } else {
      MalfunctionSubtype.create({
        typeName: data.field,
        operationalTypeId: data.malfunctionTypes
      }).then(function(){
        MalfunctionSubtype.sync();
        res.json({
          check: true,
          message: "Nieuw subtype aangemaakt"
        })
      }).catch(function(err: Error){
        res.json({
          check:false,
          message: "Subtype niet aangemaakt" + err
        })
      });
      
    }
  } else {
    res.json({bool: false, message:"Veld toevoegen mislukt"})
  }
});

 /******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
