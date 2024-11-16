import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { HttpException } from "../utils/exceptions";

export interface AuthRequest extends Request {
    userId?: string;
}

export const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        throw new HttpException(401, "Authentication token required");
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as {
            userId: string;
        };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        throw new HttpException(403, "Invalid or expired token");
    }
};
