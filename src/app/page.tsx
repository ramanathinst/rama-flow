"use client"

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogoutButton } from "./logout";

const Page = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const testAi = useMutation(trpc.testAi.mutationOptions({
        onSuccess: () => {
            toast.success("Ai Executed")
        },
        onError: (ctx) => {
            toast.error(ctx.message)
        }
    }))
    return (
        <div className="flex flex-col min-h-screen items-center justify-center max-w-2xl mx-auto">
            <h1 className="text-center text-3xl font-bold mb-4">You can test</h1>
            <Button className="mb-4" disabled={testAi.isPending} onClick={() => testAi.mutate()}>
                Test Ai
            </Button>

            <LogoutButton />
        </div>
    )
}

export default Page;