import { Request, Response, Router } from 'express';

import { Op } from 'sequelize';
import OperationalType from 'src/models/operationalType';

// Init router
const router = Router();

/******************************************************************************
 *             Get statistics data from Reports - "GET /api/statistics/types"
 ******************************************************************************/

router.get('/types', async (req: Request, res: Response) => {
  var reports: (OperationalType[] | number[] | String[])[] = [];
  // Contains the different types, has to be filled dynamically or at least new types should be added dynamically
  const types: String[] = [
    'Helikopter ingezet',
    'Grensoverschrijdende achtervolging',
  ];

  for (let i in types) {
    console.log('\n\n\n\n');

    console.log(types[i]);

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
      var count: number[] | String[] = [type + ':' + result.length];
      reports.push(count);
    }
    console.log('\n\n----------------------------\nresult\n');
    console.log(result);
    console.log('\n\n----------------------------\nreports\n');
    console.log(reports);

    var example;
    example = reports[1].toString();
  }

  res.send(reports);
  return res.json({ reports });
});

export default router;
