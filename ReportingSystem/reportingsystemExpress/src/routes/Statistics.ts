import { Request, Response, Router } from 'express';

import { Op } from 'sequelize';
import OperationalType from 'src/models/operationalType';
import WorkplaceType from 'src/models/workplaceType';
import DefectType from 'src/models/defectType';
import MalfunctionType from 'src/models/malfunctionType';
import EventType from 'src/models/eventType';
import OperationalSubtype from 'src/models/operationalSubtype'
import OperationalEvent from 'src/models/operationalEvent';
import WorkplaceEvent from 'src/models/workplaceEvent';
import Defect from 'src/models/defect';
import Malfunction from 'src/models/malfunction';

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

  let results = {operationalTypes, workplaceTypes, defectTypes, malfunctionTypes}
  res.send(results);
});

interface Counts{
  typeName: string;
  count: number;
}


interface StatisticsData {
  counts: Array<Counts>;
  operationalEvents: Array<Array<OperationalEvent>>;
  workplaceEvents: Array<Array<WorkplaceEvent>>;
  defects: Array<Array<Defect>>;
  malfunctions: Array<Array<Malfunction>>;
}


router.post('/getStatistics', async (req, res) => {
  let reports: StatisticsData = { counts: [], operationalEvents: [], workplaceEvents: [], defects: [], malfunctions: [] };
  const types = req.body;
  
  for (let i in types.workplaceevent) {
    var type = types.workplaceevent[i];
    var result = [];
    result = await WorkplaceEvent.findAll({
      attributes: ['date'],
      include: [{
        model: WorkplaceType,
        attributes: ['typeName'],
        where: {
          typeName: {
            [Op.like]: '' + type,
          },
        },
      }]
        
    });

    if (result.length != 0) {
      reports.workplaceEvents.push(result);
      // Add the typeName and number of its occurrences to reports
      var count: Counts  = {typeName: type, count: result.length};
      reports.counts.push(count);
    }
  }
  for (let i in types.operational) {
    var type = types.operational[i];
    var result = [];
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
    console.log(result);

    if (result.length != 0) {
      reports.operationalEvents.push(result);
      // Add the typeName and number of its occurrences to reports
      var count: Counts  = {typeName: type, count: result.length};
      reports.counts.push(count);
    }
  }
  for (let i in types.defect) {
    var type = types.defect[i];
    var result = [];
    result = await Defect.findAll({
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

    if (result.length != 0) {
      reports.defects.push(result);
      // Add the typeName and number of its occurrences to reports
      var count: Counts  = {typeName: type, count: result.length};
      reports.counts.push(count);
    }
  }
  for (let i in types.malfunction) {
    var type = types.malfunction[i];
    var result = [];
    result = await Malfunction.findAll({
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

    if (result.length != 0) {
      reports.malfunctions.push(result);
      // Add the typeName and number of its occurrences to reports
      var count: Counts  = {typeName: type, count: result.length};
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
