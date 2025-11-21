import { caller, getQueryClient, trpc } from "@/trpc/server"
import { Client } from "./client";
import { hydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { requiredAuth } from "@/lib/auth-utils";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout";

export default async function Home() {
  await requiredAuth();
  const users = await caller.getUsers()
  return (
    <div className="bg-accent-foreground flex flex-col min-h-svh items-center justify-center w-full">
            <h1 className="text-white">This is workflow</h1>
              <div className="flex flex-col w-3xl text-white mt-7 mb-7 p-7">
                {JSON.stringify(users)}
              </div>
            <div className="m-7">
              <LogoutButton />
            </div>
    </div>

  )
}