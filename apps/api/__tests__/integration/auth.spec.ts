import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../../src/index";

describe("Auth Endpoints Integration Tests", () => {
    const testUser = {
        email: "test@example.com",
        password: "password123",
    };

    describe("POST /api/auth/register", () => {
        it("should register a new user", async () => {
            const res = await request(app)
                .post("/api/auth/register")
                .send(testUser);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty(
                "message",
                "User created successfully"
            );
            expect(res.body.user).toHaveProperty("email", testUser.email);
        });

        it("should fail registration with invalid email", async () => {
            const res = await request(app).post("/api/auth/register").send({
                email: "invalid-email",
                password: testUser.password,
            });

            expect(res.status).toBe(400);
            expect(res.body.errors).toBeDefined();
        });
    });

    describe("POST /api/auth/login", () => {
        beforeEach(async () => {
            await request(app).post("/api/auth/register").send(testUser);
        });

        it("should login successfully with valid credentials", async () => {
            const res = await request(app)
                .post("/api/auth/login")
                .send(testUser);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("token");
            expect(res.body.user).toHaveProperty("email", testUser.email);
        });

        it("should fail login with incorrect password", async () => {
            const res = await request(app).post("/api/auth/login").send({
                email: testUser.email,
                password: "wrongpassword",
            });

            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message", "Invalid credentials");
        });
    });
});
