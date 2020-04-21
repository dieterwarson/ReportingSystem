import { Request, Response, Router } from "express";
import SecretariatNotifications from "../models/secretariatNotification";
import OperationalEvent from "src/models/operationalEvent";
import SecretariatNotification from "../models/secretariatNotification";
import Report from "../models/report"
import User from "../models/user";

import { Op } from "sequelize";

// Init router
const router = Router();

/******************************************************************************
 *                      Get All Reports - "GET /api/reports/all"
 ******************************************************************************/

 // only get the reports that are finished
 // joins report with user to get the Author's username

router.get('/all', async (req: Request, res: Response) => {
  const reports = await Report.findAll({
    where: {
      temporary: false
    }, 
    include: [{model: User, attributes: ['username']}],
    attributes: ['id', 'date']
  });
  console.log(reports);
  return res.json({reports});
});

/******************************************************************************
 *                      Search Reports - "GET /api/reports/recieve"
 ******************************************************************************/

// NIET DE BEDOELING OM NU DE SEARCH TE DOEN
// EERST MOET GWN HET VOLLEDIG VERSLAG OPGEHAALD WORDEN
// findAll() IPV findOne()

router.get("/recieve/", async (req: Request, res: Response) => {
  const search = "Japn";

  var result;
  result = await SecretariatNotification.findOne({
    where: {
      description: {
        [Op.like]: "%" + search + "%",
      },
      // Hier moet nog een OR of een AND of iets bij zodat er op meerdere columns in 1 table gecheckt kan worden
    },
  });
  if (result !== null) {
    res.send(result);
  }

  result = await OperationalEvent.findOne({
    where: {
      description: {
        [Op.like]: "%" + search + "%",
      },
      // Hier moet nog een OR of een AND of iets bij zodat er op meerdere columns in 1 table gecheckt kan worden
    },
  });
  if (result !== null) {
    res.send(result);
  }

  // Er moet nog een findOne() komen voor
  // Defect, Malfunction, Replacement, WorkplaceEvent

});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
