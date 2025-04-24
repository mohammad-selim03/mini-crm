import { Router } from "express";
import { getDashboardData } from "../controllers/dashboardController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.get("/", getDashboardData as any);

export default router;
