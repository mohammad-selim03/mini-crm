import { Router } from "express";
import {
  createReminder,
  getReminders,
  getUpcomingReminders,
  updateReminder,
  deleteReminder,
} from "../controllers/reminderController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.post("/", createReminder as any);
router.get("/", getReminders as any);
router.get("/upcoming", getUpcomingReminders as any);
router.put("/:id", updateReminder as any);
router.delete("/:id", deleteReminder as any);

export default router;
