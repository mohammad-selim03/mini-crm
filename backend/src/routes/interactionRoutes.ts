import { Router } from "express";
import {
  createInteraction,
  getInteractions,
  updateInteraction,
  deleteInteraction,
} from "../controllers/interactionController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.post("/", createInteraction as any);
router.get("/", getInteractions as any);
router.put("/:id", updateInteraction as any);
router.delete("/:id", deleteInteraction as any);

export default router;
