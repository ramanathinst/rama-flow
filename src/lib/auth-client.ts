"use client"
import { createAuthClient } from "better-auth/react"
import { polarClient } from "@polar-sh/better-auth";

export const authClient = createAuthClient({
    baseURL: typeof window !== "undefined" ? window.location.origin : undefined,
    plugins: [polarClient()]
})