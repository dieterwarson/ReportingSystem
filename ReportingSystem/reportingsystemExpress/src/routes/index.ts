import { Router } from 'express';
import UserRouter from './Users';
import ReportsRouter from './Reports';
import StatisticsRouter from './Statistics';
import PermissionsRouter from './permissions'

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/reports', ReportsRouter);
router.use('/statistics', StatisticsRouter);
router.use('/permissions', PermissionsRouter)

// Export the base-router
export default router;
