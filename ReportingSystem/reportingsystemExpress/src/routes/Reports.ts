import { Request, Response, Router } from "express";
import SecretariatNotifications from "../models/secretariatNotification";

// Init router
const router = Router();


/******************************************************************************
 *                      Get All Reports - "GET /api/reports/recieve"
 ******************************************************************************/

router.get("/recieve", (req: Request, res: Response) => {
  SecretariatNotifications.findAll().then((secretariatNotifications: any) =>
    res.send(secretariatNotifications)
  );
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
