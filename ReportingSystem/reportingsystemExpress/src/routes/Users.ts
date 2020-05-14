import { Request, Response, Router } from 'express';
import User from 'src/models/user';


const router = Router();


/******************************************************************************
 *                   Get All Reports - "GET /api/reports/all"
 ******************************************************************************/

// only get the reports that are finished
// joins report with user to get the Author's username

router.get('/all', async (req: Request, res: Response) => {
  const users = await User.findAll({
    attributes: ['id', 'username', 'email', 'accessRights', 'subscription'],
  });
  res.send(users);
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
