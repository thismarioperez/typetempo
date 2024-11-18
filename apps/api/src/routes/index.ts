import { Router } from "express";
import { authRouter } from "./auth.routes";
import { rootRouter } from "./root.routes";

const router = Router();

router.use("/", rootRouter);
router.use("/auth", authRouter);

export { router };
