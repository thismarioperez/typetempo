export interface User {
    id: string;
    email: string;
    password: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    token?: string;
    user?: Omit<User, "password">;
}
