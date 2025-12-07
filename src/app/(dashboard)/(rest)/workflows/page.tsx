import { WorkflowsContainer, WorkflowsList } from "@/features/workflows/components/workflows";
import { prefecthWorkflows } from "@/features/workflows/server/prefetch";
import { requiredAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary"

const Page = async() => {
    await requiredAuth();
    prefecthWorkflows();
    return(
        <WorkflowsContainer>
            <HydrateClient>
                <ErrorBoundary fallback="Some thing went wrong!">
                    <Suspense fallback={<p> Loading...</p>}>
                        <WorkflowsList />
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </WorkflowsContainer>
    )
}

export default Page;