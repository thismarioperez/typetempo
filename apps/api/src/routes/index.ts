import { Router } from "express";
import { authRouter } from "./auth.routes";
import { rootRouter } from "./root.routes";
import { userSettingsRouter } from "./user-settings.routes";

const router = Router();

router.use("/", rootRouter);
router.use("/auth", authRouter);
router.use("/user-settings", userSettingsRouter);

export { router };
