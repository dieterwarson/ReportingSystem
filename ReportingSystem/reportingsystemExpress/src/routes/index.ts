import { Router } from 'express';
import UserRouter from './Users';
import ReportsRouter from './Reports';
import StatisticsRouter from './Statistics';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/reports', ReportsRouter);
router.use('/statistics', StatisticsRouter);

// Export the base-router
export default router;
