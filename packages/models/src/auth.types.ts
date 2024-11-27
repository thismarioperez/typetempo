import { type User as BaseUser } from "@typetempo/db";

export type User = Partial<BaseUser> & Pick<Omit<BaseUser, "password">, "id" | "email">;
export type UserWithPassword = User & Pick<BaseUser, "password">;

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    name: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    token?: string;
    user?: User;
}
