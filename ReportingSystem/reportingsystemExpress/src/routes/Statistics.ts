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

/******************************************************************************
 *             Get Statistics - "POST /api/statistics/getStatistics"
 ******************************************************************************/
router.post('/getStatistics', async (req, res) => {
  let reports: StatisticsData = { counts: [], lineContent: [] };
  const types = req.body.selectedTypes;
  let date = {start: "2013-05-10T00:00:00.000Z", end: "2999-08-21T00:00:00.000Z"}
  if(!(req.body.selectedDate.start == '' && req.body.selectedDate.end == ''))
    date = req.body.selectedDate;

  let events: eventDate[] = []

  console.log(date);

  for (let i in types.workplaceevent) {
    var type = types.workplaceevent[i];
    var result = [];
    result = await WorkplaceEvent.findAll({
      order: ['date'],
      attributes: ['date'],
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
