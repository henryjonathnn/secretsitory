import type { Context } from "hono";
import type { ApiResponse } from "../types/api";
import { ContentfulStatusCode } from "hono/utils/http-status";

export const success = <T>(c: Context, data: T, message?: string, status: 200 = 200) => {
    const response: ApiResponse<T> = {
        success: true,
        data,
        message
    }
    return c.json(response, status)
} 

export const error = (c: Context, message: string, status: ContentfulStatusCode = 400) => {
    const response: ApiResponse = {
        success: false,
        error: message
    }
    return c.json(response, status)
}

export const unauthorized = (c: Context, message = "Unauthorized") => {
    return error(c, message, 401)
}

export const notFound = (c: Context, message = "Resource not found") => {
    return error(c, message, 404)
}

export const serverError = (c: Context, message = "Internal server error") => {
    return error(c, message, 500)
}