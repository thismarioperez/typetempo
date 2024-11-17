import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        message: "API is running!",
        version: "1.0.0",
    });
});

export { router as rootRouter };
