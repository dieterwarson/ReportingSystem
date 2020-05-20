import { Request, Response, Router } from 'express';

import { Op } from 'sequelize';
import OperationalType from 'src/models/operationalType';
import WorkplaceType from 'src/models/workplaceType';
import DefectType from 'src/models/defectType';
import MalfunctionType from 'src/models/malfunctionType';
import WorkplaceEvent from 'src/models/workplaceEvent';

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


router.post('/getStatistics', async (req, res) => {
  var reports: (WorkplaceEvent[] | number[] | String[])[] = [];
  const types = req.body;
  for (let i in types) {
    var type = types[i];
    var result = [];
    result = await WorkplaceEvent.findAll({
      include: [{
        model: WorkplaceType,
        /*where: {
          typeName: {
            [Op.like]: '' + type,
          },
        },*/
      }]
        
    });

    console.log(result);
    if (result.length != 0) {
      reports.push(result);
      // Add the typeName and number of its occurrences to reports
      var count: number[] | String[] = [type + ':' + result.length];
      reports.push(count);
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
