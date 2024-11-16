import { describe, it, expect, beforeEach } from "vitest";
import { AuthService } from "../../../src/services/auth.service";

describe("AuthService Unit Tests", () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
    });

    describe("createUser", () => {
        it("should create a new user", async () => {
            const userData = {
                email: "test@example.com",
                password: "hashedpassword",
            };

            const user = await authService.createUser(userData);
            expect(user).toHaveProperty("id");
            expect(user.email).toBe(userData.email);
            expect(user.password).toBe(userData.password);
        });
    });

    describe("findUserByEmail", () => {
        it("should find user by email", async () => {
            const userData = {
                email: "test@example.com",
                password: "hashedpassword",
            };

            await authService.createUser(userData);
            const foundUser = await authService.findUserByEmail(userData.email);

            expect(foundUser).toBeDefined();
            expect(foundUser?.email).toBe(userData.email);
        });

        it("should return undefined for non-existent user", async () => {
            const foundUser = await authService.findUserByEmail(
                "nonexistent@example.com"
            );
            expect(foundUser).toBeUndefined();
        });
    });
});
