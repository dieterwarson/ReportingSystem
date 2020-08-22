import { Request, Response, Router } from 'express';

import { Op, Sequelize } from 'sequelize';
import OperationalType from 'src/models/operationalType';
import WorkplaceType from 'src/models/workplaceType';
import DefectType from 'src/models/defectType';
import MalfunctionType from 'src/models/malfunctionType';
import WorkplaceEvent from 'src/models/workplaceEvent';
import Defect from 'src/models/defect';
import Malfunction from 'src/models/malfunction';
import OperationalEvent from 'src/models/operationalEvent';
import EventType from 'src/models/eventType';
import User from 'src/models/user';

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
  x: string;
  y: number;
}

function countDate(result: OperationalEvent[] | WorkplaceEvent[] | Defect[] | Malfunction[], events: eventDate[]) {

  result.forEach((element: { date: { toDateString: () => string; }; }) => {
    let dateFound = false;
    for (let i = 0; i < events.length; i++) {
      if (events[i].x == element.date.toDateString()) {
        dateFound = true;
        events[i].y++;
      }
    }
    if (!dateFound) {
      events.push({ x: element.date.toDateString(), y: 1 });
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
  let date = { start: "2013-05-10T00:00:00.000Z", end: "2999-08-21T00:00:00.000Z" }
  if (!(req.body.selectedDate.start == '' && req.body.selectedDate.end == ''))
    date = req.body.selectedDate;

  let events: eventDate[] = []

  console.log(date);
  console.log("\n\n\n\n");
  console.log(types);
  console.log("\n\n\n\n");

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
 *                         Get user statistics
 ******************************************************************************/
function countUser(result: userEvent[]) {
  let events: Counts[] = []
  for(let element of result) {
    let userFound = false;
    for (let i = 0; i < events.length; i++) {
      if (events[i].typeName == element.user) {
        userFound = true;
        events[i].count++;
      }
    }
    if (!userFound) {
      events.push({ typeName: element.user, count: 1 });
    }
  };

  return events;
}

function dateUser(result: userEvent[]) {
  let lineContent: lineData[] = [];
  for(let element of result){
    let test = lineContent.findIndex(function(item, i){return item.label === element.user})
    if(test === -1){
      lineContent.push({label: element.user, data: []})
    }
  }

  for(let dateUser of lineContent){
    let dates = dateUser.data;
    for(let el of result) {
      let dateFound = false;
      for (let i = 0; i < dates.length; i++) {
        if (dates[i].x == el.date && dateUser.label === el.user) {
          dateFound = true;
          dates[i].y++;
        }
      }
      if (!dateFound && dateUser.label === el.user) {
        dates.push({ x: el.date, y: 1 });
      }
    }
  }

  return lineContent;
}

interface userEvent{
  user: string,
  date: string
}

router.post('/getUserStatistics', async (req, res) => {
  const types = req.body.selectedTypes;
  let reports: StatisticsData = { counts: [], lineContent: [] };
  let date = { start: "2013-05-10T00:00:00.000Z", end: "2999-08-21T00:00:00.000Z" }
  if (!(req.body.selectedDate.start == '' && req.body.selectedDate.end == ''))
    date = req.body.selectedDate;

  let events: userEvent[] = []

  for (let i in types.workplaceevent) {
    var type = types.workplaceevent[i];
    var result = [];
    result = await WorkplaceEvent.findAll({
      order: ['date'],
      attributes: ['date', 'authorId'],
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
        where: {
          typeName: {
            [Op.like]: '' + type,
          },
        },
      },
    {
      model:User,
      attributes: ['username'],
      where: {
        id: Sequelize.col('WorkplaceEvent.authorId')
      }
    }],

    });

    console.log(result);

    // group events by date


/*     events = countUser(result, events);
    const dates: lineData = { label: type, data: events }
    reports.lineContent.push(dates);
    events = []; */

    if (result.length != 0) {
      // Add the typeName and number of its occurrences to reports
      for(let event of result){
        let temp = {user: event.user.username, date: event.date.toDateString()} as userEvent
        events.push(temp);
      }
    }
  }

  for (let i in types.operational) {
    var type = types.operational[i];
    var result = [];
    result = await OperationalEvent.findAll({
      order: ['date'],
      attributes: ['date', 'authorId'],
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
      },
      {
        model:User,
        attributes: ['username'],
        where: {
          id: Sequelize.col('OperationalEvent.authorId')
        }
      }]
    });

    /* events = countUser(result, events);
    reports.lineContent.push({ label: type, data: events });
    events = []; */

    // console.log(events);

    if (result.length != 0) {
      // Add the typeName and number of its occurrences to reports
      for(let event of result){
        let temp = {user: event.user.username, date: event.date.toDateString()} as userEvent
        events.push(temp);
      }
    }
  }

  for (let i in types.defect) {
    var type = types.defect[i];
    var result = [];
    result = await Defect.findAll({
      order: ['date'],
      attributes: ['date', 'authorId'],
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
        attributes: [],
        where: {
          typeName: {
            [Op.like]: '' + type,
          },
        },
      },
      {
        model:User,
        attributes: ['username'],
        where: {
          id: Sequelize.col('Defect.authorId')
        }
      }]

    });

    /* events = countUser(result, events);
    reports.lineContent.push({ label: type, data: events });
    events = []; */

    if (result.length != 0) {
      // Add the typeName and number of its occurrences to reports
      for(let event of result){
        let temp = {user: event.user.username, date: event.date.toDateString()} as userEvent
        events.push(temp);
      }
    }
  }

  for (let i in types.malfunction) {
    var type = types.malfunction[i];
    var result = [];
    result = await Malfunction.findAll({
      order: ['date'],
      attributes: ['date', 'authorId'],
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
        attributes: [],
        where: {
          typeName: {
            [Op.like]: '' + type,
          },
        },
      },
      {
        model:User,
        attributes: ['username'],
        where: {
          id: Sequelize.col('Malfunction.authorId')
        }
      }]

    });

    /* events = countUser(result, events);
    reports.lineContent.push({ label: type, data: events });
    events = []; */

    if (result.length != 0) {
      // Add the typeName and number of its occurrences to reports
      for(let event of result){
        let temp = {user: event.user.username, date: event.date.toDateString()} as userEvent
        events.push(temp);
      }
    }
  }

  reports.counts = countUser(events);
  reports.lineContent = dateUser(events);

  console.log(reports);
  //console.log(reports);
  res.send(reports);
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
