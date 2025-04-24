import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import * as ClientController from "../controllers/client.controller";
import { RequestHandler } from "express";

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware as RequestHandler);

router.get("/", ClientController.getClients as RequestHandler);
router.post("/", ClientController.createClient as RequestHandler);
router.get("/:id", ClientController.getClient as RequestHandler);
router.put("/:id", ClientController.updateClient as RequestHandler);
router.delete("/:id", ClientController.deleteClient as RequestHandler);

export default router;
