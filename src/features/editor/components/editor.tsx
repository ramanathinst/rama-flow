"use client"

import { ErrorView, LoadingView } from "@/components/entity-components"
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows"

export const EditorError = () => {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <ErrorView message="Editor Error!" />
        </div>    
    )
}

export const EditorLoading = () => {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <LoadingView message="Editor Loading..." />
        </div>
    )
}

export const Editor = async({workflowId}: {workflowId: string}) => {
    const workflow = useSuspenseWorkflow(workflowId);
    return(
        <div>
            {JSON.stringify(workflow, null, 2)}
        </div>
    )
}
