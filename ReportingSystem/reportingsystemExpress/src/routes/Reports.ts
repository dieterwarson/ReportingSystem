import { Request, Response, Router } from "express";
import { OK } from "http-status-codes";

// import ReportDao from '@daos/Report/ReportDao.mock';

// Init router
const router = Router();
// const reportDao = new ReportDao();


/******************************************************************************
 *                      Get All Reports - "GET /api/reports/recieve"
 ******************************************************************************/

router.get("/recieve", async (req: Request, res: Response) => {
  // handle root
  console.log(req.url, "@", Date.now());

  res.send("hi get /api/reports/recieve");

  // const reports = await reportDao.getAll();
  // return res.status(OK).json({ reports });
});

router.post("/recieve", async (req: Request, res: Response) => {
  res.send("hi post /api/reports/recieve");
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
