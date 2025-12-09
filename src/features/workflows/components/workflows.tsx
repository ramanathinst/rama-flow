"use client"
import { EntityContainer, EntityHeader, EntityPagination, EntitySearch } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useWorkflowsParams } from "../hooks/use-workflows-params";

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();

    return(
        <div>
            {JSON.stringify(workflows.data, null, 2 )}
        </div>
    )
}
export const WorkflowsHeader = ({disabled}: {disabled?: boolean}) => {
    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal();
    const router = useRouter();
    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }
    return(
        <>
            {modal}
            <EntityHeader 
                title="Create Workflows"
                description="Create and Manage your workflows!"
                onNew={handleCreate}
                newButtonLabel="New Workflow"
                disabled={disabled}
                isCreating={createWorkflow.isPending}
            />
        </>
    )
}

export const WorkflowsSearch = () => {
    const [ params, setParams ] = useWorkflowsParams();
    const { searchValue, onSearchChange} = useEntitySearch({
        params,
        setParams 
    })
    return(
        <EntitySearch 
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search Workflows"
        />
    )
}

export const WorkflowsPagination = () => {
    const workflows = useSuspenseWorkflows();
    const [ params, setParams ] = useWorkflowsParams();
    return(
        <EntityPagination 
            page={workflows.data.page}
            totalPages={workflows.data.totalPages}
            onPageChange={(page) => setParams({...params, page})}
            disabled={workflows.isFetching}
            />
    )
}


export const WorkflowsContainer = ({children}: {children: React.ReactNode}) => {
    return(
        <EntityContainer
            header={<WorkflowsHeader />}
            search={<WorkflowsSearch />}
            pagination={<WorkflowsPagination />}
        >
            {children}
        </EntityContainer>
    )
}