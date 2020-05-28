import { Request, Response, Router } from 'express';

import { Op } from 'sequelize';
import OperationalType from 'src/models/operationalType';
import WorkplaceType from 'src/models/workplaceType';
import DefectType from 'src/models/defectType';
import MalfunctionType from 'src/models/malfunctionType';
import WorkplaceEvent from 'src/models/workplaceEvent';
import Defect from 'src/models/defect';
import Malfunction from 'src/models/malfunction';
import OperationalEvent from 'src/models/operationalEvent';
import EventType from 'src/models/eventType';

// Init router
const router = Router();

/******************************************************************************
 *             Get statistics data from Reports - "GET /api/statistics/typecount"
 ******************************************************************************/

router.get('/typecount', async (req: Request, res: Response) => {
  var reports: (OperationalType[] | number[] | String[])[] = [];
  // Contains the different types, has to be filled dynamically or at least new types should be added dynamically
  const types: String[] = [
    'Helikopter ingezet',
    'Grensoverschrijdende achtervolging',
  ];

  // Loop over all types
  for (let i in types) {
    var type = types[i];

    var result;
    result = await OperationalType.findAll({
      where: {
        typeName: {
          [Op.like]: '' + type,
        },
      },
    });
    if (result.length != 0) {
      reports.push(result);
      // Add the typeName and number of its occurrences to reports
      var count: number[] | String[] = [type + ':' + result.length];
      reports.push(count);
    }
  }

  res.send(reports);
  return res.json({ reports });
});

/******************************************************************************
 *             Get types from Events - "GET /api/statistics/types"
 ******************************************************************************/

router.get('/types', async (req: Request, res: Response) => {

  let operationalTypes = await OperationalType.findAll({
    attributes: ['typeName', 'id'],
  });

  let workplaceTypes = await WorkplaceType.findAll({
    attributes: ['typeName', 'id'],
  });

  let defectTypes = await DefectType.findAll({
    attributes: ['typeName', 'id'],
  });

  let malfunctionTypes = await MalfunctionType.findAll({
    attributes: ['typeName', 'id'],
  });

  let results = { operationalTypes, workplaceTypes, defectTypes, malfunctionTypes }
  res.send(results);
});

interface Counts {
  typeName: string;
  count: number;
}


interface StatisticsData {
  counts: Array<Counts>;
  lineContent: Array<lineData>;
}

interface lineData {
  label: String;
  data: Array<eventDate>;
}

interface eventDate {
  t: string;
  y: number;
}

function countDate(result: OperationalEvent[] | WorkplaceEvent[] | Defect[] | Malfunction[], events: eventDate[]) {

  result.forEach((element: { date: { toDateString: () => string; }; }) => {
    let dateFound = false;
    for (let i = 0; i < events.length; i++) {
      if (events[i].t == element.date.toDateString()) {
        dateFound = true;
        events[i].y++;
      }
    }
    if (!dateFound) {
      events.push({ t: element.date.toDateString(), y: 1 });
    }
  });

  return events;
}


router.post('/getStatistics', async (req, res) => {
  let reports: StatisticsData = { counts: [], lineContent: [] };
  const types = req.body;

  let events: eventDate[] = []

  for (let i in types.workplaceevent) {
    var type = types.workplaceevent[i];
    var result = [];
    result = await WorkplaceEvent.findAll({
      order: ['date'],
      attributes: ['date'],
      include: [{
        model: WorkplaceType,
        attributes: ['typeName'],
        where: {
          typeName: {
            [Op.like]: '' + type,
          },
        },
      }],

    });

    // group events by date


    events = countDate(result, events);
    const dates: lineData = { label: type, data: events }
    reports.lineContent.push(dates);
    events = [];

    if (result.length != 0) {
      // Add the typeName and number of its occurrences to reports
      var count: Counts = { typeName: type, count: result.length };
      reports.counts.push(count);
    }
  }

  for (let i in types.operational) {
    var type = types.operational[i];
    var result = [];
    result = await OperationalEvent.findAll({
      order: ['date'],
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

    events = countDate(result, events);
    reports.lineContent.push({ label: type, data: events });
    events = [];

    // console.log(events);

    if (result.length != 0) {
      // Add the typeName and number of its occurrences to reports
      var count: Counts = { typeName: type, count: result.length };
      reports.counts.push(count);
    }
  }

  for (let i in types.defect) {
    var type = types.defect[i];
    var result = [];
    result = await Defect.findAll({
      order: ['date'],
      attributes: ['date'],
      include: [{
        model: DefectType,
        attributes: ['typeName'],
        where: {
          typeName: {
            [Op.like]: '' + type,
          },
        },
      }]

    });

    events = countDate(result, events);
    reports.lineContent.push({ label: type, data: events });
    events = [];

    if (result.length != 0) {
      // Add the typeName and number of its occurrences to reports
      var count: Counts = { typeName: type, count: result.length };
      reports.counts.push(count);
    }
  }

  for (let i in types.malfunction) {
    var type = types.malfunction[i];
    var result = [];
    result = await Malfunction.findAll({
      order: ['date'],
      attributes: ['date'],
      include: [{
        model: MalfunctionType,
        attributes: ['typeName'],
        where: {
          typeName: {
            [Op.like]: '' + type,
          },
        },
      }]

    });

    events = countDate(result, events);
    reports.lineContent.push({ label: type, data: events });
    events = [];

    if (result.length != 0) {
      // Add the typeName and number of its occurrences to reports
      var count: Counts = { typeName: type, count: result.length };
      reports.counts.push(count);
    }
  }

  res.send(reports);
});

/* await User.findAll({
  include: {
    model: Tool,
    as: 'Instruments',
    where: {
      size: { [Op.ne]: 'small' }
    }
  }
}); 

    result = await OperationalEvent.findAll({
      include: [{
        model: EventType,
        required: true,
        include: [{
          model: OperationalType,
          where: {
            typeName: {
              [Op.like]: '' + type,
            },
          },
        }]
      }]
    });
*/

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
