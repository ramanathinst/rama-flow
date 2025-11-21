"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export function Client() {
    const trpc = useTRPC();
    const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions())
    return (
        <div className="bg-accent-foreground flex flex-col min-h-svh items-center justify-center w-full">
            <Card className="flex max-w-[800px] h-ful w-full">
                <CardContent>
                    <CardHeader>
                        <CardTitle>
                            Client page
                        </CardTitle>
                        <CardDescription>
                            {JSON.stringify(users)}
                        </CardDescription>
                    </CardHeader>
                </CardContent>
            </Card>
        </div>
    )
}