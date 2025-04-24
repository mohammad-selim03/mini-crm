import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  getProject,
  updateProject,
} from "../controllers/projectController";
import { authMiddleware } from "../middlewares/auth";
import { Request } from "../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.post("/", createProject as any);
router.get("/", getProjects as any);
router.get("/:id", getProject as any);
router.put("/:id", updateProject as any);
router.delete("/:id", deleteProject as any);

export default router;
