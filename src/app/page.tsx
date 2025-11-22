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
    const { data: workflows } = useSuspenseQuery(trpc.getWorkflows.queryOptions())
    const testAi = useMutation(trpc.createWorkflow.mutationOptions({
        onSuccess: () => {
            toast.success("Ai Executed")
            router.push("/")
        },
        onError: (ctx) => {
            toast.error(ctx.message)
        }
    }))
    return (
        <div className="flex flex-col min-h-screen items-center justify-center max-w-2xl mx-auto">
            <h1 className="text-center text-3xl font-bold mb-4">This is workflow</h1>

            <div className="bg-yellow-50 mb-5 rounded w-full">
                <pre className="whitespace-pre-wrap">
                    {JSON.stringify(workflows, null, 2)}
                </pre>
            </div>
            <Button className="mb-4" disabled={testAi.isPending} onClick={() => testAi.mutate()}>
                Test Ai
            </Button>

            <LogoutButton />
        </div>
    )
}

export default Page;