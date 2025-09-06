import type { User } from "@prisma/client";

export interface RegisterRequest {
    email: string;
    password: string;
    name?: string;
    username?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    session: any;
    access_token: string;
}