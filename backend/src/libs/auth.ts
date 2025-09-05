import { supabase } from "./supabase";
import { prisma } from "./prisma";
import type { User } from "@prisma/client"

export interface SupabaseUser {
    id: string;
    email?: string;
    user_metadata?: {
        name?: string;
        username?: string;
    }
}

export const verifyToken = async (token: string): Promise<SupabaseUser | null> => {
    try {
        const { data, error } = await supabase.auth.getUser(token)

        if (error || !data.user) {
            console.error("Error verifying token:", error?.message)
            return null
        }
        return data.user
    } catch (error) {
        console.error("Unexpected error verifying token:", error)
        return null
    }
}

export const syncUserWithPrisma = async (supabaseUser: SupabaseUser): Promise<User> => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {id: supabaseUser.id}
        })

        if (existingUser) {
            return existingUser
        }

        const userData = {
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            name: supabaseUser.user_metadata?.name || supabaseUser.email?.split("@")[0] || "John Doe",
            username: supabaseUser.user_metadata?.username || supabaseUser.email?.split("@")[0] || `user_${supabaseUser.id.slice(0, 8)}`
        }

        return await prisma.user.create({
            data: userData
        })
    } catch (error) {
        console.error("User sync error:", error)
        throw error
    }
}