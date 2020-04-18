import { Router } from 'express';
import UserRouter from './Users';
import ReportsRouter from "./Reports";

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/reports', ReportsRouter);

// Export the base-router
export default router;
