import express from "express";
import cors from "cors";
import { config } from "./config";
import { router } from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { logger } from "./utils/logger";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/", router);

// Error handling
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
    app.listen(config.port, () => {
        logger.info(`Server is running on port ${config.port}`);
    });
}

export default app;
