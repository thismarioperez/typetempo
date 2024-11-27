import { describe, it, expect, beforeEach } from "vitest";
import { UserService } from "../../../src/services/user.service";

describe("UserService Unit Tests", () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
    });

    describe("createUser", () => {
        it("should create a new user", async () => {
            const userData = {
                email: "test@example.com",
                password: "hashedpassword",
            };

            const user = await userService.createUser(userData);
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

            await userService.createUser(userData);
            const foundUser = await userService.findUserByEmail(userData.email);

            expect(foundUser).toBeDefined();
            expect(foundUser?.email).toBe(userData.email);
        });

        it("should return undefined for non-existent user", async () => {
            const foundUser = await userService.findUserByEmail("nonexistent@example.com");
            expect(foundUser).toBeUndefined();
        });
    });
});
