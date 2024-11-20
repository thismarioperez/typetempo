import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response, NextFunction } from "express";
import {
    validateRegister,
    validateLogin,
} from "../../../src/middleware/validation.middleware";

describe("Validation Middleware", () => {
    // Mock Express request, response, and next function
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    const resetMockNext = () => {
        mockNext = vi.fn() as unknown as NextFunction;
    };

    beforeEach(() => {
        mockReq = {
            body: {},
        };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        };
        resetMockNext();
    });

    describe("validateRegister", () => {
        it("should pass validation for valid registration data", async () => {
            mockReq.body = {
                email: "test@example.com",
                password: "password123",
            };

            // Run all middleware functions in the validateRegister array
            for (const middleware of validateRegister) {
                resetMockNext();
                await middleware(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
            }

            expect(mockNext).toHaveBeenCalled();
            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
        });

        it("should fail validation for invalid email", async () => {
            mockReq.body = {
                email: "invalid-email",
                password: "password123",
            };

            for (const middleware of validateRegister) {
                resetMockNext();
                await middleware(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
            }

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        msg: "Invalid email",
                    }),
                ]),
            });
        });

        it("should fail validation for short password", async () => {
            mockReq.body = {
                email: "test@example.com",
                password: "12345",
            };

            for (const middleware of validateRegister) {
                resetMockNext();
                await middleware(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
            }

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        msg: "Password must be at least 6 characters long",
                    }),
                ]),
            });
        });
    });

    describe("validateLogin", () => {
        it("should pass validation for valid login data", async () => {
            mockReq.body = {
                email: "test@example.com",
                password: "password123",
            };

            for (const middleware of validateLogin) {
                resetMockNext();
                await middleware(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
            }

            expect(mockNext).toHaveBeenCalled();
            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
        });

        it("should fail validation for invalid email", async () => {
            mockReq.body = {
                email: "invalid-email",
                password: "password123",
            };

            for (const middleware of validateLogin) {
                resetMockNext();
                await middleware(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
            }

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        msg: "Invalid email",
                    }),
                ]),
            });
        });

        it("should fail validation for missing password", async () => {
            mockReq.body = {
                email: "test@example.com",
                password: "",
            };

            for (const middleware of validateLogin) {
                resetMockNext();
                await middleware(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
            }

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        msg: "Password is required",
                    }),
                ]),
            });
        });

        it("should normalize email to lowercase", async () => {
            mockReq.body = {
                email: "TEST@EXAMPLE.COM",
                password: "password123",
            };

            for (const middleware of validateLogin) {
                resetMockNext();
                await middleware(
                    mockReq as Request,
                    mockRes as Response,
                    mockNext
                );
            }

            expect(mockReq.body.email).toBe("test@example.com");
            expect(mockNext).toHaveBeenCalled();
        });
    });
});
