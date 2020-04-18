import { Request, Response, Router } from "express";
import { OK } from "http-status-codes";
import Sequelize from "../Server"

// Init router
const router = Router();


/******************************************************************************
 *                      Get All Reports - "GET /api/reports/recieve"
 ******************************************************************************/

router.get("/recieve", async (req: Request, res: Response) => {
  const reports = Sequelize.get('search');  
  return res.status(OK).json({ reports });
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
