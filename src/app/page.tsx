import { caller, getQueryClient, trpc } from "@/trpc/server"
import { Client } from "./client";
import { hydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { requiredAuth } from "@/lib/auth-utils";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  await requiredAuth();
  const users = await caller.getUsers()
  return (
  <div className="flex flex-col min-h-screen items-center justify-center max-w-2xl mx-auto">
  <h1 className="text-center text-3xl font-bold mb-4">This is workflow</h1>

  <div className="bg-yellow-50  rounded w-full">
    <pre className="whitespace-pre-wrap">
      {JSON.stringify(users, null, 2)}
    </pre>
  </div>

  <div className="mt-6 text-white px-4 py-2 rounded">
    <LogoutButton />
  </div>
</div>

  )
}