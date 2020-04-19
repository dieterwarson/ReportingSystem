import { Request, Response, Router } from "express";
import { OK } from "http-status-codes";
import Sequelize from "../Server";

// Init router
const router = Router();

/******************************************************************************
 *                      Get All Reports - "GET /api/reports/recieve"
 ******************************************************************************/

router.get("/recieve", async (req: Request, res: Response) => {
  const reports = Sequelize.get("SecretariatNotifications");
  // set() werkt al een dictionary
  // app.set('foo', 'bar');
  // get() geeft de waarde terug die was ingegeven bij de set
  // app.get('foo');
  // => "bar"
  const length = Sequelize.length;
  console.log('Sequelize.length: ' + length);
  
  return res.status(OK).json({
    reports,
    length, 
  });
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
