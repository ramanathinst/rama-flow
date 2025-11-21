import { getQueryClient, trpc } from "@/trpc/server"
import { Client } from "./client";
import { hydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions())
  return (
    <div className="bg-accent-foreground flex flex-col min-h-svh items-center justify-center w-full">

            <HydrationBoundary state={hydrate(queryClient)}>
              <Suspense fallback={<p className="text-white">Loading....</p>}>
                <Client />
              </Suspense>
            </HydrationBoundary>
    </div>
  )
}