"use client"
import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityLists, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import type { Workflow } from "@/generated/prisma/client";
import { formatDistanceToNow } from "date-fns";
import { WorkflowIcon } from "lucide-react";

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();
    return(
        <EntityLists 
            items={workflows.data.items}
            getKey={(workflow) => workflow.id}
            renderItem={(workflow) => <WorkflowsItem data={workflow}/>}
            emptyView={<WorkflowsEmpty/>}
        />
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

export const WorkflowsLoading = () => {
    return(
        <LoadingView message="Workflows Loading...." />
    )
}

export const WorkflowsError = () => {
    return(
        <ErrorView message="Workflows Error" />
    )
}

export const WorkflowsItem = ({data} : { data: Workflow}) => {
    const removeWorkflow = useRemoveWorkflow();
    const handleRemove = () => {
            removeWorkflow.mutate({id: data.id})
    }
        return(
            <EntityItem 
                href={`/workflows/${data.id}`}
                title={data.name}
                subTitle={
                    <>
                        Updated : {formatDistanceToNow(data.updatedAt, {addSuffix: true})} {""}
                        &bull; Created: {formatDistanceToNow(data.createdAt, {addSuffix: true})} {""}
                    </>
                }
                image={
                    <div className="flex items-center gap-4">
                        <WorkflowIcon size={25} className="text-muted-foreground" />
                    </div>
                }
                isRemoving={removeWorkflow.isPending}
                onRemove={handleRemove}
                />
        )
}

export const WorkflowsEmpty = () => {
    const createWorkflow = useCreateWorkflow();
    const router = useRouter();
    const { handleError, modal } = useUpgradeModal();
    
    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            },
            onError: (error) => {
                handleError(error.message)
            }
        })
    }
    return(
        <>  
            {modal}
            <EmptyView disabled={createWorkflow.isPending} onNew={handleCreate} message="You have't created any workflows. Getting started by creating your first workflow." />
        </>
    )
}