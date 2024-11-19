import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateRegister = [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .trim(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateLogin = [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required").trim(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
