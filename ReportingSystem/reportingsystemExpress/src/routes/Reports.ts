import { Op, QueryTypes } from 'sequelize';
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
import sequelize from 'src/config/config';
import FieldNames from 'src/models/fieldnames'
import Custom from 'src/models/custom';
import CustomEvent from 'src/models/customevent'
import { error } from 'winston';

// Init router
const router = Router();

/******************************************************************************
 *                   Get All Reports - "GET /api/reports/all"
 ******************************************************************************/
// only get the reports that are finished
router.post('/all', async (req: Request, res: Response) => {
  let date = { start: "2013-05-10T00:00:00.000Z", end: "2999-08-21T00:00:00.000Z" }
  if (!(req.body.dateRange.start == '' && req.body.dateRange.end == ''))
    date = req.body.dateRange;
  const offset = req.body.offset;
  const reports = await Report.findAll({
    offset: offset,
    limit: 20,
    order: [['date', 'DESC']],
    where: {
      temporary: false,
      date: {
        [Op.and]: {
          [Op.lt]: date.end,
          [Op.gt]: date.start,
        }
      }
    },
    attributes: ['id', 'date', 'nightShift'],
  });
  let filteredReports = []
  let lastDate = new Date("2013-05-10T00:00:00.000Z").setHours(0, 0, 0, 0);
  for (let i = 0; i < reports.length - 1; i++) {
    const date1 = new Date(new Date(reports[i].date).setTime(reports[i].date.getTime() + 3600 * 1000)).setHours(0, 0, 0, 0);
    const date2 = new Date(new Date(reports[i + 1].date).setTime(reports[i + 1].date.getTime() + 3600 * 1000)).setHours(0, 0, 0, 0);
    if (date1 == date2 && reports[i].nightShift != reports[i + 1].nightShift) {
      filteredReports.push([reports[i], reports[i + 1]])
    }
    else if (lastDate !== date1) {
      filteredReports.push([reports[i]]);
    }
    lastDate = new Date(reports[i].date).setHours(0, 0, 0, 0);
  }
  res.send(filteredReports);
});

/******************************************************************************
 *                   Count All Reports - "GET /api/reports/count"
 ******************************************************************************/
router.post('/count', async (req: Request, res: Response) => {
  let date = { start: "2013-05-10T00:00:00.000Z", end: "2999-08-21T00:00:00.000Z" }
  if (!(req.body.start == '' && req.body.end == ''))
    date = { start: req.body.start, end: req.body.end };
  const count = await Report.count({
    where: {
      temporary: false,
      date: {
        [Op.and]: {
          [Op.lt]: date.end,
          [Op.gt]: date.start,
        }
      }
    },
  });
  res.send({ count: count });
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
// only get the reports that are finished and are being monitored
router.get('/monitored', async (req: Request, res: Response) => {

  let defects = await Defect.findAll({
    order: [['date', 'DESC']],
    where: {
      monitoring: 1,
    },
    include: [{ model: DefectType }]
  });

  let malfunctions = await Malfunction.findAll({
    order: [['date', 'DESC']],
    where: {
      monitoring: 1,
    },
    include: [{ model: MalfunctionType }]
  });

  let workplaceEvents = await WorkplaceEvent.findAll({
    order: [['date', 'DESC']],
    where: {
      monitoring: 1,
    },
    include: [{ model: WorkplaceType }]
  });

  let secretariatNotifications = await SecretariatNotification.findAll({
    order: [['date', 'DESC']],
    where: {
      monitoring: 1,
    },
  });

  let results = {
    administrative: { count: workplaceEvents.length + secretariatNotifications.length, workplaceEvents, secretariatNotifications },
    technical: { count: defects, defects, malfunctions },
  };

  res.send(results);
});

/******************************************************************************
 *                      Search functions
 ******************************************************************************/
interface reportData {
  reportId: number;
  eventId: number;
  description: string;
  date: Date;
  nightShift: Boolean;
}

async function searchCustomField1(reportIds: reportData[], searchString: string, type: string) {
  let customEvents: CustomEvent[];
  if (type === "l") {
    customEvents = await sequelize.query(
      'SELECT * FROM CustomEvents WHERE levenshtein(:string, field1) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    customEvents = await CustomEvent.findAll({
      where: {
        field1: {
          [Op.like]: searchString,
        },
      },
    });

    /* customEvents = await sequelize.query(
      `SELECT * FROM CustomEvents WHERE MATCH (field1) AGAINST(:string IN NATURAL LANGUAGE MODE)`, 
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
    console.log("MATCHED: " + customEvents); */
  }
  for (let i in customEvents) {
    const curEvent = customEvents[i];
    const event = await Custom.findOne({
      where: {
        id: curEvent.customId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.field1 != null) {
      const description = curEvent.field1;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: curEvent.field1, date: new Date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchCustomField2(reportIds: reportData[], searchString: string, type: string) {
  let customEvents: CustomEvent[];
  if (type === "l") {
    customEvents = await sequelize.query(
      'SELECT * FROM CustomEvents WHERE levenshtein(:string, field2) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    customEvents = await CustomEvent.findAll({
      where: {
        field2: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in customEvents) {
    const curEvent = customEvents[i];
    const event = await Custom.findOne({
      where: {
        id: curEvent.customId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.field2 != null) {
      const description = curEvent.field2;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: curEvent.field2, date: new Date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchCustomField3(reportIds: reportData[], searchString: string, type: string) {
  let customEvents: CustomEvent[];
  if (type === "l") {
    customEvents = await sequelize.query(
      'SELECT * FROM CustomEvents WHERE levenshtein(:string, field3) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    customEvents = await CustomEvent.findAll({
      where: {
        field3: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in customEvents) {
    const curEvent = customEvents[i];
    const event = await Custom.findOne({
      where: {
        id: curEvent.customId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.field3 != null) {
      const description = curEvent.field3;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: curEvent.field3, date: new Date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchCustomField4(reportIds: reportData[], searchString: string, type: string) {
  let customEvents: CustomEvent[];
  if (type === "l") {
    customEvents = await sequelize.query(
      'SELECT * FROM CustomEvents WHERE levenshtein(:string, field4) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    customEvents = await CustomEvent.findAll({
      where: {
        field4: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in customEvents) {
    const curEvent = customEvents[i];
    const event = await Custom.findOne({
      where: {
        id: curEvent.customId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.field4 != null) {
      const description = curEvent.field4;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: curEvent.field4, date: new Date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchCustomField5(reportIds: reportData[], searchString: string, type: string) {
  let customEvents: CustomEvent[];
  if (type === "l") {
    customEvents = await sequelize.query(
      'SELECT * FROM CustomEvents WHERE levenshtein(:string, field5) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    customEvents = await CustomEvent.findAll({
      where: {
        field5: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in customEvents) {
    const curEvent = customEvents[i];
    const event = await Custom.findOne({
      where: {
        id: curEvent.customId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.field5 != null) {
      const description = curEvent.field5;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: curEvent.field5, date: new Date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchCustomField6(reportIds: reportData[], searchString: string, type: string) {
  let customEvents: CustomEvent[];
  if (type === "l") {
    customEvents = await sequelize.query(
      'SELECT * FROM CustomEvents WHERE levenshtein(:string, field6) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    customEvents = await CustomEvent.findAll({
      where: {
        field6: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in customEvents) {
    const curEvent = customEvents[i];
    const event = await Custom.findOne({
      where: {
        id: curEvent.customId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.field6 != null) {
      const description = curEvent.field6;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: curEvent.field6, date: new Date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchCustomField7(reportIds: reportData[], searchString: string, type: string) {
  let customEvents: CustomEvent[];
  if (type === "l") {
    customEvents = await sequelize.query(
      'SELECT * FROM CustomEvents WHERE levenshtein(:string, field7) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    customEvents = await CustomEvent.findAll({
      where: {
        field7: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in customEvents) {
    const curEvent = customEvents[i];
    const event = await Custom.findOne({
      where: {
        id: curEvent.customId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.field7 != null) {
      const description = curEvent.field7;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: curEvent.field7, date: new Date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchCustomField8(reportIds: reportData[], searchString: string, type: string) {
  let customEvents: CustomEvent[];
  if (type === "l") {
    customEvents = await sequelize.query(
      'SELECT * FROM CustomEvents WHERE levenshtein(:string, field8) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    customEvents = await CustomEvent.findAll({
      where: {
        field8: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in customEvents) {
    const curEvent = customEvents[i];
    const event = await Custom.findOne({
      where: {
        id: curEvent.customId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.field8 != null) {
      const description = curEvent.field8;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: curEvent.field8, date: new Date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchCustomField9(reportIds: reportData[], searchString: string, type: string) {
  let customEvents: CustomEvent[];
  if (type === "l") {
    customEvents = await sequelize.query(
      'SELECT * FROM CustomEvents WHERE levenshtein(:string, field9) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    customEvents = await CustomEvent.findAll({
      where: {
        field9: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in customEvents) {
    const curEvent = customEvents[i];
    const event = await Custom.findOne({
      where: {
        id: curEvent.customId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.field9 != null) {
      const description = curEvent.field9;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: curEvent.field9, date: new Date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchCustomField10(reportIds: reportData[], searchString: string, type: string) {
  let customEvents: CustomEvent[];
  if (type === "l") {
    customEvents = await sequelize.query(
      'SELECT * FROM CustomEvents WHERE levenshtein(:string, field10) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    customEvents = await CustomEvent.findAll({
      where: {
        field10: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in customEvents) {
    const curEvent = customEvents[i];
    const event = await Custom.findOne({
      where: {
        id: curEvent.customId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.field10 != null) {
      const description = curEvent.field10;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: curEvent.field10, date: new Date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchOperationalEvent(reportIds: reportData[], searchString: string, type: string, search: boolean) {
  let operationalEvents: OperationalEvent[];
  if (type === "l") {
    operationalEvents = await sequelize.query(
      'SELECT * FROM OperationalEvents WHERE levenshtein(:string, description) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    /* searchString = '%' + searchString + '%';
    operationalEvents = await OperationalEvent.findAll({
      where: {
        signaling: {
          [Op.like]: searchString,
        },
      },
    }); */
    operationalEvents = await sequelize.query(
      `SELECT * FROM OperationalEvents WHERE MATCH (description, unit, location, signaling, plNumber) AGAINST(:string IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION)`, 
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
    //console.log("______MATCHED: " + operationalEvents);
  }
  let report: reportData;
  if(search){
    for (let i in operationalEvents) {
      const curEvent = operationalEvents[i];
      const event = await Operational.findOne({
        where: {
          id: curEvent.operationalId
        },
        include: [{ model: Report }]
      });
      if (event != null && curEvent.description != null) {
        const description = curEvent.signaling;
        report = { reportId: event.reportId, eventId: curEvent.id, description: curEvent.description, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
      else if (event != null && curEvent.signaling != null) {
        const description = curEvent.signaling;
        report = { reportId: event.reportId, eventId: curEvent.id, description: curEvent.signaling, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }

    }
  }
  else{
    for (let i in operationalEvents) {
      const curEvent = operationalEvents[i];
      report = { reportId: 0, eventId: curEvent.id, description: curEvent.signaling, date: curEvent.date, nightShift: false };
      // addReport(report, reportIds);
      reportIds.push(report);
    }
  }
  
}

/* async function searchOperationalEventPlNumber(reportIds: reportData[], searchString: string, type: string) {
  let operationalEvents: OperationalEvent[];
  if (type === "l") {
    operationalEvents = await sequelize.query(
      'SELECT * FROM OperationalEvents WHERE levenshtein(:string, plNumber) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    operationalEvents = await OperationalEvent.findAll({
      where: {
        plNumber: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in operationalEvents) {
    const curEvent = operationalEvents[i];
    const event = await Operational.findOne({
      where: {
        id: curEvent.operationalId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.plNumber != null) {
      const description = curEvent.plNumber;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchOperationalEventDescription(reportIds: reportData[], searchString: string, type: string) {
  let operationalEvents: OperationalEvent[];
  if (type === "l") {
    operationalEvents = await sequelize.query(
      'SELECT * FROM OperationalEvents WHERE levenshtein(:string, description) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    operationalEvents = await OperationalEvent.findAll({
      where: {
        description: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in operationalEvents) {
    const curEvent = operationalEvents[i];
    const event = await Operational.findOne({
      where: {
        id: curEvent.operationalId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.description != null) {
      const description = curEvent.description;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchOperationalEventLocation(reportIds: reportData[], searchString: string, type: string) {
  let operationalEvents: OperationalEvent[];
  if (type === "l") {
    operationalEvents = await sequelize.query(
      'SELECT * FROM OperationalEvents WHERE levenshtein(:string, location) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    operationalEvents = await OperationalEvent.findAll({
      where: {
        location: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in operationalEvents) {
    const curEvent = operationalEvents[i];
    const event = await Operational.findOne({
      where: {
        id: curEvent.operationalId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.location != null) {
      const description = curEvent.location;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchOperationalEventUnit(reportIds: reportData[], searchString: string, type: string) {
  let operationalEvents: OperationalEvent[];
  if (type === "l") {
    operationalEvents = await sequelize.query(
      'SELECT * FROM OperationalEvents WHERE levenshtein(:string, unit) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    operationalEvents = await OperationalEvent.findAll({
      where: {
        unit: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in operationalEvents) {
    const curEvent = operationalEvents[i];
    const event = await Operational.findOne({
      where: {
        id: curEvent.operationalId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.unit != null) {
      const description = curEvent.unit;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchOperationalEventDate(reportIds: reportData[], search: string) {
  let operationalEvents = await OperationalEvent.findAll();
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
      if (event != null && dateString != null) {
        const description = dateString;
        let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }
} */

async function searchWorkplaceEvent(reportIds: reportData[], searchString: string, type: string, search: boolean) {
  let workplaceEvents: WorkplaceEvent[];
  if (type === "l") {
    workplaceEvents = await sequelize.query(
      'SELECT * FROM WorkplaceEvents WHERE levenshtein(:string, description) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    /* searchString = '%' + searchString + '%';
    workplaceEvents = await WorkplaceEvent.findAll({
      where: {
        description: {
          [Op.like]: searchString,
        },
      },
    }); */
    workplaceEvents = await sequelize.query(
      `SELECT * FROM WorkplaceEvents WHERE MATCH (description, absentee, substitute) AGAINST(:string IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION)`, 
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  }
  let report: reportData;
  if(search){
    for (let i in workplaceEvents) {
      const curEvent = workplaceEvents[i];
      const event = await Administrative.findOne({
        where: {
          id: curEvent.administrativeId
        },
        include: [{ model: Report }]
      });
      if (event != null && curEvent.description != null) {
        const description = curEvent.description;
        report = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }
  else{
    for (let i in workplaceEvents) {
      const curEvent = workplaceEvents[i];
      report = { reportId: 0, eventId: curEvent.id, description: curEvent.description, date: curEvent.date, nightShift: false };
      // addReport(report, reportIds);
      reportIds.push(report);
    }
  }
}

/* async function searchWorkplaceEventAbsentee(reportIds: reportData[], searchString: string, type: string) {
  let workplaceEvents: WorkplaceEvent[];
  if (type === "l") {
    workplaceEvents = await sequelize.query(
      'SELECT * FROM WorkplaceEvents WHERE levenshtein(:string, absentee) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    workplaceEvents = await WorkplaceEvent.findAll({
      where: {
        absentee: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in workplaceEvents) {
    const curEvent = workplaceEvents[i];
    const event = await Administrative.findOne({
      where: {
        id: curEvent.administrativeId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.absentee != null) {
      const description = curEvent.absentee;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchWorkplaceEventSubstitute(reportIds: reportData[], searchString: string, type: string) {
  let workplaceEvents: WorkplaceEvent[];
  if (type === "l") {
    workplaceEvents = await sequelize.query(
      'SELECT * FROM WorkplaceEvents WHERE levenshtein(:string, substitute) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    searchString = '%' + searchString + '%';
    workplaceEvents = await WorkplaceEvent.findAll({
      where: {
        substitute: {
          [Op.like]: searchString,
        },
      },
    });
  }
  for (let i in workplaceEvents) {
    const curEvent = workplaceEvents[i];
    const event = await Administrative.findOne({
      where: {
        id: curEvent.administrativeId
      },
      include: [{ model: Report }]
    });
    if (event != null && curEvent.substitute != null) {
      const description = curEvent.substitute;
      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }
}

async function searchWorkplaceEventDate(reportIds: reportData[], search: string) {
  let workplaceEvents = await WorkplaceEvent.findAll();
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
        const description = dateString;
        let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }
}
 */

async function searchSecretariatNotification(reportIds: reportData[], searchString: string, type: string, search: boolean) {
  let secretariatNotifications: SecretariatNotification[];
  if (type === "l") {
    secretariatNotifications = await sequelize.query(
      'SELECT * FROM SecretariatNotifications WHERE levenshtein(:string, description) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    /* searchString = '%' + searchString + '%';
    secretariatNotifications = await SecretariatNotification.findAll({
      where: {
        description: {
          [Op.like]: searchString,
        },
      },
    }); */
    secretariatNotifications = await sequelize.query(
      `SELECT * FROM SecretariatNotifications WHERE MATCH (description) AGAINST(:string IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION)`, 
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  }
  let report: reportData;
  if(search){
    for (let i in secretariatNotifications) {
      const curEvent = secretariatNotifications[i];
      const event = await Administrative.findOne({
        where: {
          id: curEvent.administrativeId
        },
        include: [{ model: Report }]
      });
      if (event != null && curEvent.description != null) {
        const description = curEvent.description;
        report = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }
  else{
    for (let i in secretariatNotifications) {
      const curEvent = secretariatNotifications[i];
      report = { reportId: 0, eventId: curEvent.id, description: curEvent.description, date: curEvent.date, nightShift: false };
      // addReport(report, reportIds);
      reportIds.push(report);
    }
  }
  
}

/* async function searchSecretariatNotificationDate(reportIds: reportData[], search: string) {
  let secretariatNotifications = await SecretariatNotification.findAll();
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
        const description = dateString;
        let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }
} */

async function searchDefect(reportIds: reportData[], searchString: string, type: string, search: boolean) {
  let defects: Defect[];
  if (type === "l") {
    defects = await sequelize.query(
      'SELECT * FROM Defects WHERE levenshtein(:string, description) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    /* searchString = '%' + searchString + '%';
    defects = await Defect.findAll({
      where: {
        description: {
          [Op.like]: searchString,
        },
      },
    }); */
    defects = await sequelize.query(
      `SELECT * FROM Defects WHERE MATCH (description) AGAINST(:string IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION)`, 
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  }
  let report: reportData;
  if(search){
    for (let i in defects) {
      const curEvent = defects[i];
      const event = await Technical.findOne({
        where: {
          id: curEvent.technicalId
        },
        include: [{ model: Report }]
      });
      if (event != null && curEvent.description != null) {
        const description = curEvent.description;
        report = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }
  else{
    for (let i in defects) {
      const curEvent = defects[i];
      report = { reportId: 0, eventId: curEvent.id, description: curEvent.description, date: curEvent.date, nightShift: false };
      // addReport(report, reportIds);
      reportIds.push(report);
    }
  }
}

/* async function searchDefectDate(reportIds: reportData[], search: string) {
  let defects = await Defect.findAll();
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
        const description = dateString;
        let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }
}
 */
async function searchMalfunction(reportIds: reportData[], searchString: string, type: string, search: boolean) {
  let malfunctions: Malfunction[];
  if (type === "l") {
    malfunctions = await sequelize.query(
      'SELECT * FROM Malfunctions WHERE levenshtein(:string, description) BETWEEN 0 AND 6',
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  } else {
    /* searchString = '%' + searchString + '%';
    malfunctions = await Malfunction.findAll({
      where: {
        description: {
          [Op.like]: searchString,
        },
      },
    }); */
    malfunctions = await sequelize.query(
      `SELECT * FROM Malfunctions WHERE MATCH (description) AGAINST(:string IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION)`, 
      {
        replacements: { string: searchString },
        type: QueryTypes.SELECT
      }
    );
  }
  let report: reportData;
  if(search){
    for (let i in malfunctions) {
      const curEvent = malfunctions[i];
      const event = await Technical.findOne({
        where: {
          id: curEvent.technicalId
        },
        include: [{ model: Report }]
      });
      if (event != null && curEvent.description != null) {
        const description = curEvent.description;
        report = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }
  else{
    for (let i in malfunctions) {
      const curEvent = malfunctions[i];
      report = { reportId: 0, eventId: curEvent.id, description: curEvent.description, date: curEvent.date, nightShift: false };
      // addReport(report, reportIds);
      reportIds.push(report);
    }
  }
}

/* async function searchMalfunctionDate(reportIds: reportData[], search: string) {
  let malfunctions = await Malfunction.findAll();
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
        const description = dateString;
        let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reportIds);
      }
    }
  }
} */

/******************************************************************************
 *                      Search Reports - "POST /api/reports/search"
 ******************************************************************************/
router.post('/search', async (req, res) => {
  let temp: string = req.body.keyword;
  const offset = req.body.offset;
  const reportsPerPage = req.body.numPerPage;
  let search = decodeURIComponent(temp);

  // Door omzetting naar post moeten deze erbij, anders worden die niet omgezet
  search = search.split("%20").join(" ");
  search = search.split("%25").join("%");
  search = search.split("%5C%5C").join("\\");

  let reportIds: reportData[] = [];

  /* await searchCustomField1(reportIds, search, "l");
  await searchCustomField1(reportIds, search, "s");*/
  await searchOperationalEvent(reportIds, search, "s", true);
  await searchWorkplaceEvent(reportIds, search, "s", true);
  await searchSecretariatNotification(reportIds, search, "s", true);
  await searchDefect(reportIds, search, "s", true);
  await searchMalfunction(reportIds, search, "s", true);
  if(reportIds.length < 30){
    await searchWorkplaceEvent(reportIds, search, "l", true);
    await searchSecretariatNotification(reportIds, search, "l", true);
    await searchDefect(reportIds, search, "l", true);
    await searchMalfunction(reportIds, search, "l", true);
    await searchOperationalEvent(reportIds, search, "l", true);
  }
  

  const count = reportIds.length;
  reportIds = reportIds.slice(offset, offset + reportsPerPage);

  const reportsData = { reports: reportIds, count: count };

  res.send(reportsData);
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
 *                      Search Reports - "POST /api/reports/pl"
 ******************************************************************************/
router.post('/pl', async (req, res) => {
  const pl: string = req.body.plNumber;
  const plString: string = '%' + pl + '%';
  const offset = req.body.offset;
  const reportsPerPage = req.body.numPerPage;

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
      let description = "PL-nummer: " + curEvent.plNumber;

      let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
      addReport(report, reportIds);
    }
  }

  const count = reportIds.length;
  reportIds = reportIds.slice(offset, offset + reportsPerPage);

  const reportsData = { reports: reportIds, count: count };

  res.send(reportsData);
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
  let custom = await Custom.findOne({
    where: {
      reportId: reportId
    }
  })

  let operationalEvents: OperationalEvent[] = [];
  let workplaceEvents: WorkplaceEvent[] = [];
  let secretariatNotifications: SecretariatNotification[] = [];
  let defects: Defect[] = [];
  let malfunctions: Malfunction[] = [];
  let customEvents: CustomEvent[] = [];

  if (operational != null) {
    operationalEvents = await OperationalEvent.findAll({
      order: [['date', 'DESC']],
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

  if (administrative != null) {
    workplaceEvents = await WorkplaceEvent.findAll({
      where: {
        administrativeId: administrative.id
      },
      include: [WorkplaceType, WorkplaceSubtype]
    })

    secretariatNotifications = await SecretariatNotification.findAll({
      where: {
        administrativeId: administrative.id
      }
    })
  }

  if (technical != null) {
    defects = await Defect.findAll({
      where: {
        technicalId: technical.id
      },
      include: [DefectType, DefectSubtype]
    })

    malfunctions = await Malfunction.findAll({
      where: {
        technicalId: technical.id
      },
      include: [MalfunctionType, MalfunctionSubtype]
    })
  }

  if(custom != null) {
    customEvents = await CustomEvent.findAll({
      where: {
        customId: custom.id
      },
      include: [FieldNames]
    })
  }

  results = {
    report: report,
    operational: { operationalEvents },
    administrative: { workplaceEvents, secretariatNotifications },
    technical: { defects, malfunctions },
    custom: {customEvents}
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
      order: [['date', 'DESC']],
      where: {
        technicalId: technical.id,
        monitoring: true
      },
    })

    malfunctions = await Malfunction.findAll({
      order: [['date', 'DESC']],
      where: {
        technicalId: technical.id,
        monitoring: true
      },
    })
  }
  if (administrative != null) {
    workplaceEvents = await WorkplaceEvent.findAll({
      order: [['date', 'DESC']],
      where: {
        administrativeId: administrative.id,
        monitoring: true
      },
    })

    secretariatNotifications = await SecretariatNotification.findAll({
      order: [['date', 'DESC']],
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
 *             Get reports - "POST /api/reports/getTypeEvents/:reportId"
 ******************************************************************************/
router.post('/getTypeEvents/:reportId', async (req, res) => {
  const types = req.body.selectedTypes;
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
  let workplaceEvents: WorkplaceEvent[] = [];
  let secretariatNotifications: SecretariatNotification[] = [];
  let defects: Defect[] = [];
  let malfunctions: Malfunction[] = [];

  if (operational != null) {
    for (let i in types.operationalTypes) {
      var type = types.operationalTypes[i];
      var result = [];

      result = await OperationalEvent.findAll({
        where: {
          operationalId: operational.id
        },
        include: [{
          model: EventType,
          required: true,
          include: [{
            model: OperationalType,
            required: true,
            where: {
              typeName: {
                [Op.like]: '' + type,
              },
            },
          }]
        }]
      });
      if (result.length != 0) {
        result.forEach(event => {
          let contains = false;
          operationalEvents.forEach(value => {
            if (value.id == event.id)
              contains = true;
          })
          if (!contains)
            operationalEvents.push(event);
        });
      }
    }
  }

  if (administrative != null) {
    for (let i in types.workplaceTypes) {
      var type = types.workplaceTypes[i];
      var result = [];
      result = await WorkplaceEvent.findAll({
        where: {
          administrativeId: administrative.id
        },
        include: [{
          model: WorkplaceType,
          where: {
            typeName: {
              [Op.like]: '' + type,
            },
          },
        }],
      });
      if (result.length != 0) {
        result.forEach(event => {
          workplaceEvents.push(event);
        });
      }
    }
    if (types.workplaceTypes != null) {
      if (types.workplaceTypes.includes("secretariatNotification")) {
        secretariatNotifications = await SecretariatNotification.findAll({
          where: {
            administrativeId: administrative.id
          }
        })
      }
    }
  }

  if (technical != null) {
    for (let i in types.defectTypes) {
      var type = types.defectTypes[i];
      var result = [];
      result = await Defect.findAll({
        where: {
          technicalId: technical.id
        },
        include: [{
          model: DefectType,
          where: {
            typeName: {
              [Op.like]: '' + type,
            },
          },
        }]
      });
      if (result.length != 0) {
        result.forEach(event => {
          defects.push(event);
        });
      }
    }

    for (let i in types.malfunctionTypes) {
      var type = types.malfunctionTypes[i];
      var result = [];
      result = await Malfunction.findAll({
        where: {
          technicalId: technical.id
        },
        include: [{
          model: MalfunctionType,
          where: {
            typeName: {
              [Op.like]: '' + type,
            },
          },
        }]
      });
      if (result.length != 0) {
        result.forEach(event => {
          malfunctions.push(event);
        });
      }
    }
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
 *      POST Autosave Operational event - "POST /api/reports/autoSaveOperational"
 ******************************************************************************/
router.post('/autoSaveOperational', async (req, res) => {
  await OperationalEvent.findAll({
    where: {
      authorId: req.body.id,
      operationalId: {
        [Op.eq]: null
      }
    }
  }).then(async function (entries) {
    await entries[0].update({
      signaling: req.body.signaling,
      plNumber: req.body.plNumber,
      description: req.body.description,
      priority: req.body.priority,
      location: req.body.location,
      unit: req.body.unit,
      date: Date.now(),
    })
  }).catch(async function () {
    await OperationalEvent.create({
      authorId: req.body.id,
      signaling: req.body.signaling,
      plNumber: req.body.plNumber,
      description: req.body.description,
      priority: req.body.priority,
      location: req.body.location,
      unit: req.body.unit,
      date: Date.now(),
    }).then(async function () {
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
      operationalId: {
        [Op.eq]: null
      }
    }
  }).then(function (entries) {
    res.json({
      bool: true,
      entry: entries[0],
    });
  }).catch(function () {
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
    where : {reportId: 17}, //demo
    order: [['reportId', 'DESC']]
  }).then(function (entries) {
    SecretariatNotification.create({
      authorId: req.body.id,
      administrativeId: entries[0].id,
      description: req.body.description,
      monitoring: req.body.monitoring,
      date: Date.now(),
    }).then(function () {
      SecretariatNotification.sync();
      res.json({
        bool: true
      })
    })
      .catch(function (err) {
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
    where: {reportId: 17},
    order: [['reportId', 'DESC']]
  }).then(function (entries) {

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
    }).then(async function (event) {
      OperationalEvent.findAll({
        where: {
          authorId: req.body.id,
          operationalId: {
            [Op.eq]: null
          }
        }
      }).then(function (entries) {
        if (entries.length > 0) {
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
    }).catch(function (err) {
      res.json({
        bool: false,
        message: 'OperationalEvent was not created ' + err
      })
    })
  }).catch(function (err) {
    res.json({
      bool: false,
      message: "No operational row found  " + err
    })
  });

});

/******************************************************************************
 *      POST Add WorkPlaceEvent - "POST /api/reports/addWorkPlaceEvent"
 ******************************************************************************/
router.post('/addWorkPlaceEvent', async (req, res) => {

  Administrative.findAll({
    limit: 1,
    where: {reportId: 17}, //demo
    order: [['reportId', 'DESC']]
  }).then(async function (entries) {
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
    }).then(function () {
      res.json({ bool: true })
    }).catch(function () {
      res.json({ bool: false, message: "Kon geen event aanmaken" })
    });
  }).catch(function (err) {
    res.json({
      bool: false,
      message: err
    })
  })
});

/******************************************************************************
 *      POST Add Malfunction - "POST /api/reports/addMalfunction"
 ******************************************************************************/
router.post('/addMalfunction', async (req, res) => {
  Technical.findAll({
    limit: 1,
    where : {reportId : 17}, //demo
    order: [['reportId', 'DESC']]
  }).then(async function (entries) {
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
    }).then(function () {
      Defect.sync();
      res.json({
        bool: true
      })
    }).catch(function () {
      res.json({ bool: false, message: 'Couldnt make Defect' })
    })

  }).catch(function (err) {
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
    where: {reportId: 17}, //demo
    order: [['reportId', 'DESC']]
  }).then(async function (entries) {
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
    }).then(function () {
      Defect.sync();
      res.json({
        bool: true
      })
    }).catch(function () {
      res.json({ bool: false, message: 'Couldnt make Defect' })
    })

  }).catch(function (err) {
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
*      GET Get PlNumber searched reports - "POST /api/reports/getPlNumberReports"
******************************************************************************/
router.post("/getPlNumberReports", async (req, res) => {
  var matched_events = await OperationalEvent.findAll({
    where: {
      plNumber: {
        [Op.like]: req.body.plNumber
      }
    },
    limit: 5
  });
  res.json(matched_events);
});

/******************************************************************************
*      GET Get Dummy database events - "POST /api/reports/getDummyEvents"
******************************************************************************/
router.post("/getDummyEvents", async (req, res) => {
  var matched_events = await DummyDatabase.findAll({
    where: {
      plNumber: {
        [Op.like]: req.body.plNumber
      }
    },
    limit: 5
  });
  res.json(matched_events);
});

/******************************************************************************
*      GET Get keyword searched reports - "POST /api/reports/getKeywordReports"
******************************************************************************/
router.post("/getKeywordReports", async (req, res) => {
  const search = req.body.keyword;

  let reportIds: reportData[] = [];
  await searchOperationalEvent(reportIds, search, "s", false);
  await searchWorkplaceEvent(reportIds, search, "s", false);
  await searchSecretariatNotification(reportIds, search, "s", false);
  await searchDefect(reportIds, search, "s", false);
  await searchMalfunction(reportIds, search, "s", false);
  if(reportIds.length < 10){
    await searchOperationalEvent(reportIds, search, "l", false);
    await searchWorkplaceEvent(reportIds, search, "l", false);
    await searchSecretariatNotification(reportIds, search, "l", false);
    await searchDefect(reportIds, search, "l", false);
    await searchMalfunction(reportIds, search, "l", false);
  }
  const outputArr = reportIds.slice(0, 10);

  res.json(outputArr);
});

/******************************************************************************
 *      POST Add Types - "POST /api/reports/addTypes"
 ******************************************************************************/
router.post("/addTypes", async (req, res) => {
  const data = req.body;
  //OPERTATIONEEL TYPE TOEVOEGEN
  if (data.type == 0) {
    if (data.operationaltype == -1) {
      OperationalType.create({
        typeName: data.field,
      }).then(function () {
        OperationalType.sync();
        res.json({
          check: true,
          message: "Nieuw type aangemaakt"
        })
      }).catch(function (err: Error) {
        res.json({
          check: false,
          message: "Type niet aangemaakt" + err
        })
      });

    } else {
      OperationalSubtype.create({
        typeName: data.field,
        operationalTypeId: data.operationaltype
      }).then(function () {
        OperationalSubtype.sync();
        res.json({
          check: true,
          message: "Nieuw subtype aangemaakt"
        })
      }).catch(function (err: Error) {
        res.json({
          check: false,
          message: "Subtype niet aangemaakt" + err
        })
      });

    }
    // PERSONEEL TYPE TOEVOEGEN
  } else if (data.type == 1) {
    if (data.workplacetype == -1) {
      WorkplaceType.create({
        typeName: data.field,
      }).then(function () {
        WorkplaceType.sync();
        res.json({
          check: true,
          message: "Nieuw type aangemaakt"
        })
      }).catch(function (err: Error) {
        res.json({
          check: false,
          message: "Type niet aangemaakt" + err
        })
      });

    } else {
      WorkplaceSubtype.create({
        typeName: data.field,
        workplaceTypeId: data.workplacetype
      }).then(function () {
        WorkplaceSubtype.sync();
        res.json({
          check: true,
          message: "Nieuw subtype aangemaakt"
        });
      }).catch(function (err: Error) {
        res.json({
          check: false,
          message: "Subype niet aangemaakt" + err
        })
      });


    }
    //LOGISTIEK TYPE TOEVOEGEN
  } else if (data.type == 2) { //LOG
    if (data.defectTypes == -1) {
      DefectType.create({
        typeName: data.field,
      }).then(function () {
        DefectType.sync();
        res.json({
          check: true,
          message: "Nieuw type aangemaakt"
        })
      }).catch(function (err: Error) {
        res.json({
          check: false,
          message: "Type niet aangemaakt" + err
        })
      });

    } else {
      DefectSubtype.create({
        typeName: data.field,
        defectTypeId: data.defectTypes
      }).then(function () {
        DefectSubtype.sync();
        res.json({
          check: true,
          message: "Nieuw subtype aangemaakt"
        })
      }).catch(function (err: Error) {
        res.json({
          check: false,
          message: "Subype niet aangemaakt" + err
        })
      });

    }
    //TECHNISCH TYPE TOEVOEGEN
  } else if (data.type == 3) { //TECH
    if (data.malfunctionTypes == -1) {
      MalfunctionType.create({
        typeName: data.field,
      }).then(function () {
        MalfunctionType.sync();
        res.json({
          check: true,
          message: "Nieuw type aangemaakt"
        })
      }).catch(function (err: Error) {
        res.json({
          check: false,
          message: "Type niet aangemaakt" + err
        })
      });

    } else {
      MalfunctionSubtype.create({
        typeName: data.field,
        operationalTypeId: data.malfunctionTypes
      }).then(function () {
        MalfunctionSubtype.sync();
        res.json({
          check: true,
          message: "Nieuw subtype aangemaakt"
        })
      }).catch(function (err: Error) {
        res.json({
          check: false,
          message: "Subtype niet aangemaakt" + err
        })
      });

    }
  } else {
    res.json({ bool: false, message: "Veld toevoegen mislukt" })
  }
});

/******************************************************************************
*      POST Get keyword searched reports - "POST /api/reports/newCustomFiche"
******************************************************************************/
router.post("/newCustomFiche", async (req, res) => {
  const amtFields = 10 - req.body.fields.length;
  for (let i = 0; i < amtFields; i++) {
    req.body.fields.push({title: null})
  }

  FieldNames.create({
    customName: req.body.title,
    name1: req.body.fields[0].title,
    name2: req.body.fields[1].title,
    name3: req.body.fields[2].title,
    name4: req.body.fields[3].title,
    name5: req.body.fields[4].title,
    name6: req.body.fields[5].title,
    name7: req.body.fields[6].title,
    name8: req.body.fields[7].title,
    name9: req.body.fields[8].title,
    name10: req.body.fields[9].title


  })

  res.json({
    check: true
  })
});

/******************************************************************************
*      POST Get Fieldnames - "POST /api/reports/getFieldnames"
******************************************************************************/
router.post("/getCustomFiche", async (req, res) => {
  
  const fieldNames = await FieldNames.findAll();
  res.send(
    fieldNames
  )
});



/******************************************************************************
*      POST Add custom fiche - "POST /api/reports/addCustomEvent"
******************************************************************************/
router.post("/addCustomEvent", async (req, res) => {
  Custom.findAll({
    limit: 1,
    where: {reportId: 17}, //demo
    order: [['id', 'DESC']]
  }).then(async function (entries) {
    CustomEvent.create({
      authorId: req.body.author,
      customId: entries[0].id,
      FieldnameId: req.body.selectedFiche,
      field1: req.body.field1,
      field2: req.body.field2,
      field3: req.body.field3,
      field4: req.body.field4,
      field5: req.body.field5,
      field6: req.body.field6,
      field7: req.body.field7,
      field8: req.body.field8,
      field9: req.body.field9,
      field10: req.body.field10,
    }).then(function () {
      CustomEvent.sync();
      return res.json({
        check: true,
      })
    }).catch(function(err : Error){
      return res.json({
        check: false,
        message: err
      })
    })
    
  }).catch(function (err: Error) {
    return res.json({
      check: false,
      message: err
    })
  });

});

/******************************************************************************
*      POST Get Fieldnames - "POST /api/reports/getFieldnames"
******************************************************************************/
router.post("/getAllCustomEvents", async (req, res) => {
  
  const customEvents = await CustomEvent.findAll();
  res.send(
    customEvents
  )
});

/******************************************************************************
 *             Get Statistics - "POST /api/reports/getFiltered"
 ******************************************************************************/
router.post('/getFiltered', async (req, res) => {
  let reports: reportData[] = [];
  const selectedTypes = req.body.selectedTypes;
  let values = selectedTypes.chosenValues;
  const types = req.body.types;
  let date = { start: "2013-05-10T00:00:00.000Z", end: "2999-08-21T00:00:00.000Z" }
  if (!(req.body.selectedDate.start == '' && req.body.selectedDate.end == ''))
    date = req.body.selectedDate;
  const offset = req.body.offset;
  const reportsPerPage = req.body.numPerPage;

  if (values.includes("types"))
    values = types;

  if (values.includes("workplaceTypes")) {
    types.push("workplaceTypes")
    values = types;
  }
  for (let i in values) {
    var type = values[i];
    var result = [];

    result = await WorkplaceEvent.findAll({
      order: ['date'],
      where: {
        date: {
          [Op.and]: {
            [Op.lt]: date.end,
            [Op.gt]: date.start,
          }
        }
      },
      include: [{
        model: WorkplaceType,
        required: true,
        where: {
          typeName: {
            [Op.like]: '' + type,
          },
        },
      }],
    });
    for (let i in result) {
      const curEvent = result[i];
      const event = await Administrative.findOne({
        where: {
          id: curEvent.administrativeId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: "", date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reports);
      }
    }
  }
  if (values.includes("workplaceTypes"))
    values = selectedTypes.chosenValues;

  if (values.includes("operationalTypes")) {
    types.push("operationalTypes")
    values = types;
  }
  for (let i in values) {
    var type = values[i];
    var result = [];

    result = await OperationalEvent.findAll({
      order: ['date'],
      where: {
        date: {
          [Op.and]: {
            [Op.lt]: date.end,
            [Op.gt]: date.start,
          }
        }
      },
      include: [{
        model: EventType,
        required: true,
        include: [{
          model: OperationalType,
          required: true,
          where: {
            typeName: {
              [Op.like]: '' + type,
            },
          },
        }]
      }]
    });
    for (let i in result) {
      const curEvent = result[i];
      const event = await Operational.findOne({
        where: {
          id: curEvent.operationalId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: "", date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reports);
      }
    }
  }
  if (values.includes("operationalTypes"))
    values = selectedTypes.chosenValues;

  if (values.includes("defectTypes")) {
    types.push("defectTypes")
    values = types;
  }
  for (let i in values) {
    var type = values[i];
    var result = [];

    result = await Defect.findAll({
      order: ['date'],
      where: {
        date: {
          [Op.and]: {
            [Op.lt]: date.end,
            [Op.gt]: date.start,
          }
        }
      },
      include: [{
        model: DefectType,
        required: true,
        where: {
          typeName: {
            [Op.like]: '' + type,
          },
        },
      }]
    });
    for (let i in result) {
      const curEvent = result[i];
      const event = await Technical.findOne({
        where: {
          id: curEvent.technicalId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: "", date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reports);
      }
    }
  }
  if (values.includes("defectTypes"))
    values = selectedTypes.chosenValues;

  if (values.includes("malfunctionTypes")) {
    types.push("malfunctionTypes")
    values = types;
  }
  for (let i in values) {
    var type = values[i];
    var result = [];

    result = await Malfunction.findAll({
      order: ['date'],
      where: {
        date: {
          [Op.and]: {
            [Op.lt]: date.end,
            [Op.gt]: date.start,
          }
        }
      },
      include: [{
        model: MalfunctionType,
        required: true,
        where: {
          typeName: {
            [Op.like]: '' + type,
          },
        },
      }]
    });
    for (let i in result) {
      const curEvent = result[i];
      const event = await Technical.findOne({
        where: {
          id: curEvent.technicalId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: "", date: curEvent.date, nightShift: event.report.nightShift };
        addReport(report, reports);
      }
    }
  }
  if (values.includes("malfunctionTypes"))
    values = selectedTypes.chosenValues;

  const count = reports.length;
  reports = reports.slice(offset, offset + reportsPerPage);

  const reportsData = { reports: reports, count: count };

  res.send(reportsData);
});

/******************************************************************************
 *             Get Statistics - "POST /api/reports/getSearchFiltered"
 ******************************************************************************/
router.post('/getSearchFiltered', async (req, res) => {
  let reports: reportData[] = [];
  let temp: string = req.body.keyword;
  const oldReports = req.body.oldReports;
  const selectedTypes = req.body.selectedTypes;
  let values = selectedTypes.chosenValues;
  const offset = req.body.offset;
  const reportsPerPage = req.body.numPerPage;
  const types = req.body.types;
  let search = decodeURIComponent(temp);

  // Door omzetting naar post moeten deze erbij, anders worden die niet omgezet
  search = search.split("%20").join(" ");
  search = search.split("%25").join("%");
  search = search.split("%5C%5C").join("\\");

  let date = { start: "2013-05-10T00:00:00.000Z", end: "2999-08-21T00:00:00.000Z" }
  if (!(req.body.selectedDate.start == '' && req.body.selectedDate.end == ''))
    date = req.body.selectedDate;

  if (values.includes("types"))
    values = types;

  for (let i = 0; i < oldReports.length; i++) {
    if (values.includes("workplaceTypes")) {
      types.push("workplaceTypes")
      values = types;
    }
    for (let i in values) {
      var type = values[i];
      var result = [];

      result = await WorkplaceEvent.findAll({
        order: ['date'],
        where: {
          date: {
            [Op.and]: {
              [Op.lt]: date.end,
              [Op.gt]: date.start,
            }
          },
          [Op.or]: {
            description: {
              [Op.like]: '%' + search + '%'
            },
            absentee: {
              [Op.like]: '%' + search + '%'
            },
            substitute: {
              [Op.like]: '%' + search + '%'
            },
          }
        },
        include: [{
          model: WorkplaceType,
          required: true,
          where: {
            typeName: {
              [Op.like]: '' + type,
            },
          },
        }],
      });

      for (let i in result) {
        const curEvent = result[i];
        const event = await Administrative.findOne({
          where: {
            id: curEvent.administrativeId
          },
          include: [{ model: Report }]
        });

        if (event != null) {
          let description = "";

          if (curEvent.description != null && curEvent.description.toLowerCase().includes(search))
            description = "Beschrijving: " + curEvent.description;
          else if (curEvent.absentee != null && curEvent.absentee.toLowerCase().includes(search))
            description = "Afwezige: " + curEvent.absentee;
          else if (curEvent.substitute != null && curEvent.substitute.toLowerCase().includes(search))
            description = "Vervanger: " + curEvent.substitute;

          let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
          addReport(report, reports);
        }
      }
    }
    if (values.includes("workplaceTypes"))
      values = selectedTypes.chosenValues;

    if (values.includes("operationalTypes")) {
      types.push("operationalTypes")
      values = types;
    }
    for (let i in values) {
      var type = values[i];
      var result = [];

      result = await OperationalEvent.findAll({
        order: ['date'],
        where: {
          date: {
            [Op.and]: {
              [Op.lt]: date.end,
              [Op.gt]: date.start,
            }
          },
          [Op.or]: {
            signaling: {
              [Op.like]: '%' + search + '%'
            },
            plNumber: {
              [Op.like]: '%' + search + '%'
            },
            description: {
              [Op.like]: '%' + search + '%'
            },
            location: {
              [Op.like]: '%' + search + '%'
            },
            unit: {
              [Op.like]: '%' + search + '%'
            },
          }
        },
        include: [{
          model: EventType,
          required: true,
          include: [{
            model: OperationalType,
            required: true,
            where: {
              typeName: {
                [Op.like]: '' + type,
              },
            },
          }]
        }]
      });

      for (let i in result) {
        const curEvent = result[i];
        const event = await Operational.findOne({
          where: {
            id: curEvent.operationalId
          },
          include: [{ model: Report }]
        });

        if (event != null) {
          let description = "";

          if (curEvent.signaling != null && curEvent.signaling.toLowerCase().includes(search))
            description = "Signalering: " + curEvent.signaling;
          else if (curEvent.plNumber != null && curEvent.plNumber.toLowerCase().includes(search))
            description = "PL-nummer: " + curEvent.plNumber;
          else if (curEvent.description != null && curEvent.description.toLowerCase().includes(search))
            description = "Beschrijving: " + curEvent.description;
          else if (curEvent.location != null && curEvent.location.toLowerCase().includes(search))
            description = "Locatie: " + curEvent.location;
          else if (curEvent.unit != null && curEvent.unit.toLowerCase().includes(search))
            description = "Unit: " + curEvent.unit;

          let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
          addReport(report, reports);
        }
      }
    }
    if (values.includes("operationalTypes"))
      values = selectedTypes.chosenValues;

    if (values.includes("defectTypes")) {
      types.push("defectTypes")
      values = types;
    }
    for (let i in values) {
      var type = values[i];
      var result = [];

      result = await Defect.findAll({
        order: ['date'],
        where: {
          date: {
            [Op.and]: {
              [Op.lt]: date.end,
              [Op.gt]: date.start,
            }
          },
          [Op.or]: {
            description: {
              [Op.like]: '%' + search + '%'
            },
          }
        },
        include: [{
          model: DefectType,
          required: true,
          where: {
            typeName: {
              [Op.like]: '' + type,
            },
          },
        }]
      });
      for (let i in result) {
        const curEvent = result[i];
        const event = await Technical.findOne({
          where: {
            id: curEvent.technicalId
          },
          include: [{ model: Report }]
        });
        if (event != null) {
          let description = "";

          if (curEvent.description != null && curEvent.description.toLowerCase().includes(search))
            description = "Beschrijving: " + curEvent.description;

          let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
          addReport(report, reports);
        }
      }
    }
    if (values.includes("defectTypes"))
      values = selectedTypes.chosenValues;

    if (values.includes("malfunctionTypes")) {
      types.push("malfunctionTypes")
      values = types;
    }
    for (let i in values) {
      var type = values[i];
      var result = [];

      result = await Malfunction.findAll({
        order: ['date'],
        where: {
          date: {
            [Op.and]: {
              [Op.lt]: date.end,
              [Op.gt]: date.start,
            }
          },
          [Op.or]: {
            description: {
              [Op.like]: '%' + search + '%'
            },
            duration: {
              [Op.like]: '%' + search + '%'
            },
          }
        },
        include: [{
          model: MalfunctionType,
          required: true,
          where: {
            typeName: {
              [Op.like]: '' + type,
            },
          },
        }]
      });

      for (let i in result) {
        const curEvent = result[i];
        const event = await Technical.findOne({
          where: {
            id: curEvent.technicalId
          },
          include: [{ model: Report }]
        });

        if (event != null) {
          let description = "";

          if (curEvent.description != null && curEvent.description.toLowerCase().includes(search))
            description = "Beschrijving: " + curEvent.description;
          else if (curEvent.duration != null && curEvent.duration.toLowerCase().includes(search))
            description = "Duratie: " + curEvent.duration;

          let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
          addReport(report, reports);
        }
      }
    }
    if (values.includes("malfunctionTypes"))
      values = selectedTypes.chosenValues;
  }

  const count = reports.length;
  reports = reports.slice(offset, offset + reportsPerPage);

  const reportsData = { reports: reports, count: count };

  res.send(reportsData);
});

/******************************************************************************
 *             Get Statistics - "POST /api/reports/getSearchPlFiltered"
 ******************************************************************************/
router.post('/getSearchPlFiltered', async (req, res) => {
  let reports: reportData[] = [];
  const oldReports = req.body.oldReports;
  const selectedTypes = req.body.selectedTypes;
  let values = selectedTypes.chosenValues;
  const offset = req.body.offset;
  const reportsPerPage = req.body.numPerPage;
  const types = req.body.types;
  let pl = req.body.plNumber;

  let date = { start: "2013-05-10T00:00:00.000Z", end: "2999-08-21T00:00:00.000Z" }
  if (!(req.body.selectedDate.start == '' && req.body.selectedDate.end == ''))
    date = req.body.selectedDate;

  if (values.includes("types"))
    values = types;

  for (let i = 0; i < oldReports.length; i++) {
    if (values.includes("operationalTypes"))
      values = types;

    for (let i in values) {
      var type = values[i];
      var result = [];

      result = await OperationalEvent.findAll({
        order: ['date'],
        where: {
          date: {
            [Op.and]: {
              [Op.lt]: date.end,
              [Op.gt]: date.start,
            }
          },
          plNumber: {
            [Op.like]: '%' + pl + '%'
          },
        },
        include: [{
          model: EventType,
          required: true,
          include: [{
            model: OperationalType,
            required: true,
            where: {
              typeName: {
                [Op.like]: '' + type,
              },
            },
          }]
        }]
      });

      for (let i in result) {
        const curEvent = result[i];
        const event = await Operational.findOne({
          where: {
            id: curEvent.operationalId
          },
          include: [{ model: Report }]
        });

        if (event != null) {
          let description = "PL-nummer: " + curEvent.plNumber;

          let report: reportData = { reportId: event.reportId, eventId: curEvent.id, description: description, date: curEvent.date, nightShift: event.report.nightShift };
          addReport(report, reports);
        }
      }
    }
  }

  const count = reports.length;
  reports = reports.slice(offset, offset + reportsPerPage);

  const reportsData = { reports: reports, count: count };

  res.send(reportsData);
});

/******************************************************************************
 *             Get Statistics - "POST /api/reports/filterDate"
 ******************************************************************************/
router.post('/filterDate', async (req, res) => {
  let reports: reportData[] = [];
  let oldReports = req.body.data;
  let date = { start: "2013-05-10T00:00:00.000Z", end: "2999-08-21T00:00:00.000Z" }
  if (!(req.body.selectedDate.start == '' && req.body.selectedDate.end == ''))
    date = req.body.selectedDate;
  const offset = req.body.offset;
  const reportsPerPage = req.body.numPerPage;

  for (let i in oldReports) {
    var oldReport = oldReports[i];
    var result;

    result = await OperationalEvent.findOne({
      order: ['date'],
      where: {
        date: {
          [Op.and]: {
            [Op.lt]: date.end,
            [Op.gt]: date.start,
          }
        },
        id: oldReport.eventId
      },
    });

    if (result != null) {
      const event = await Operational.findOne({
        where: {
          id: result.operationalId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, eventId: result.id, description: oldReport.description, date: result.date, nightShift: event.report.nightShift };
        addReport(report, reports);
      }
    }

    result = await WorkplaceEvent.findOne({
      order: ['date'],
      where: {
        date: {
          [Op.and]: {
            [Op.lt]: date.end,
            [Op.gt]: date.start,
          }
        },
        id: oldReport.eventId
      },
    });

    if (result != null) {
      const event = await Administrative.findOne({
        where: {
          id: result.administrativeId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, eventId: result.id, description: oldReport.description, date: result.date, nightShift: event.report.nightShift };
        addReport(report, reports);
      }
    }

    result = await Defect.findOne({
      order: ['date'],
      where: {
        date: {
          [Op.and]: {
            [Op.lt]: date.end,
            [Op.gt]: date.start,
          }
        },
        id: oldReport.eventId
      },
    });

    if (result != null) {
      const event = await Technical.findOne({
        where: {
          id: result.technicalId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, eventId: result.id, description: oldReport.description, date: result.date, nightShift: event.report.nightShift };
        addReport(report, reports);
      }
    }

    result = await Malfunction.findOne({
      order: ['date'],
      where: {
        date: {
          [Op.and]: {
            [Op.lt]: date.end,
            [Op.gt]: date.start,
          }
        },
        id: oldReport.eventId
      },
    });

    if (result != null) {
      const event = await Technical.findOne({
        where: {
          id: result.technicalId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        let report: reportData = { reportId: event.reportId, eventId: result.id, description: oldReport.description, date: result.date, nightShift: event.report.nightShift };
        addReport(report, reports);
      }
    }
  }


  const count = reports.length;
  reports = reports.slice(offset, offset + reportsPerPage);

  const reportsData = { reports: reports, count: count };

  res.send(reportsData);
});

/******************************************************************************
 *             Get Statistics - "POST /api/reports/filterPlDate"
 ******************************************************************************/
router.post('/filterPlDate', async (req, res) => {
  let reports: reportData[] = [];
  let oldReports = req.body.data;
  let date = { start: "2013-05-10T00:00:00.000Z", end: "2999-08-21T00:00:00.000Z" }
  if (!(req.body.selectedDate.start == '' && req.body.selectedDate.end == ''))
    date = req.body.selectedDate;
  const offset = req.body.offset;
  const reportsPerPage = req.body.numPerPage;

  for (let i in oldReports) {
    var oldReport = oldReports[i];
    var result;

    result = await OperationalEvent.findOne({
      order: ['date'],
      where: {
        date: {
          [Op.and]: {
            [Op.lt]: date.end,
            [Op.gt]: date.start,
          }
        },
        id: oldReport.eventId
      },
    });

    if (result != null) {
      const event = await Operational.findOne({
        where: {
          id: result.operationalId
        },
        include: [{ model: Report }]
      });
      if (event != null) {
        const description = "PL-nummer: " + oldReport.description;
        let report: reportData = { reportId: event.reportId, eventId: result.id, description: description, date: result.date, nightShift: event.report.nightShift };
        addReport(report, reports);
      }
    }
  }

  const count = reports.length;
  reports = reports.slice(offset, offset + reportsPerPage);

  const reportsData = { reports: reports, count: count };

  res.send(reportsData);
});


/******************************************************************************
 *             Get latest report id - "POST /api/reports/latestReport"
 ******************************************************************************/

router.post('/latestReport', async (req, res) => {
  
  Report.findAll({
    limit: 1,
    order: [['date', 'DESC']]
  }).then(result => {
    res.json({id: 18}); //demo
    //res.json({id: result[0].id})
  })
  .catch(error => {
    res.json({err: error})
  });
});

/******************************************************************************
*                         Send pdf to browser
******************************************************************************/
/* router.get('/downloadPDF', (req, res) => {
  console.log("pdf")
  res.download('page.pdf');
}); */

/******************************************************************************
*                                     Export
******************************************************************************/

export default router;
