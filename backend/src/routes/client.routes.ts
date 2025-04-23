import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import * as ClientController from "../controllers/client.controller";

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

router.get("/", ClientController.getClients);
router.post("/", ClientController.createClient);
router.get("/:id", ClientController.getClient);
router.put("/:id", ClientController.updateClient);
router.delete("/:id", ClientController.deleteClient);

export default router;
