import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";
import { config } from "../config";
import { HttpException } from "../utils/exceptions";
import { LoginCredentials, RegisterData, AuthResponse } from "@typetempo/models";

export class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    register = async (
        req: Request<unknown, unknown, RegisterData>,
        res: Response<AuthResponse>,
        next: NextFunction,
    ) => {
        try {
            const { email, password, name } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.userService.createUser({
                email,
                password: hashedPassword,
                name,
            });

            res.status(201).json({
                message: "User created successfully",
                user: { id: user.id, email: user.email },
            });
        } catch (error) {
            next(error);
        }
    };

    login = async (
        req: Request<unknown, unknown, LoginCredentials>,
        res: Response<AuthResponse>,
        next: NextFunction,
    ) => {
        try {
            const { email, password } = req.body;

            const user = await this.userService.findUserByEmail(email);
            if (!user) {
                throw new HttpException(401, "Invalid credentials");
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new HttpException(401, "Invalid credentials");
            }

            const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
                expiresIn: config.jwtExpiresIn,
            });

            res.json({
                message: "Login successful",
                token,
                user: { id: user.id, email: user.email },
            });
        } catch (error) {
            next(error);
        }
    };
}
