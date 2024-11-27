import { Router } from "express";
import { UserSettingsController } from "../controllers/user-settings.controller";
import { authenticateToken } from "src/middleware/auth.middleware";

const router = Router();
const userSettingsController = new UserSettingsController();

router.get("/", authenticateToken, userSettingsController.getUserSettings);
router.put("/", authenticateToken, userSettingsController.updateUserSettings);

export { router as userSettingsRouter };
