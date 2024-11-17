import { vi } from "vitest";
import { Request, Response } from "express";

export const createMockRequest = (
    body = {},
    headers = {}
): Partial<Request> => ({
    body,
    headers,
});

export const createMockResponse = (): Partial<Response> => ({
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
    send: vi.fn(),
});

export const createMockNext = () => vi.fn();
