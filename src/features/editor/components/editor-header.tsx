"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useSuspenseWorkflow, useUpdateNameWorkflow } from "@/features/workflows/hooks/use-workflows"
import { SaveIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export const EditorNameInput = ({workflowId}: {workflowId: string}) => {

    const { data: workflow } = useSuspenseWorkflow(workflowId);
    const updateWorkflow = useUpdateNameWorkflow();
    const [ name, setName ] = useState(workflow.name);
    const [ isEditing, setIsEditing ] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(workflow.name) {
            setName(workflow.name)
        }
    }, [workflow.name])

    useEffect(() => {
        if(isEditing && inputRef.current ) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing])

    const handleSave = async() => {
        if(name === workflow.name) {
            setIsEditing(false);
            return;
        }

        try {
            await updateWorkflow.mutateAsync({
                id: workflow.id,
                name
            })
        } catch {
            setName(workflow.name)
        } finally {
            setIsEditing(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === "Enter"){
            handleSave();
        } else if(e.key === "Escape") {
            setName(workflow.name)
            setIsEditing(false)
        }
    }

    if(isEditing) {
        return(
            <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={inputRef}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                disabled={updateWorkflow.isPending}
                className="flex max-w-[150px]"
            />
        )
    }

    return(
        <BreadcrumbItem onClick={() => setIsEditing(true)} className="cursor-pointer hover:text-accent-foreground transition-colors">
            {workflow.name}
        </BreadcrumbItem>
    )
}

export const EditorSaveButton = () => {
    return(
        <div>
            <Button>
                <SaveIcon size={25} />
                Save
            </Button>
        </div>
    )
}

export const EditorBreadcrums = ({workflowId}: {workflowId: string}) => {
    const {data: workflow } = useSuspenseWorkflow(workflowId);
    return(
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={`/workflows`}>
                            workflows
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <EditorNameInput workflowId={workflowId} />
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export const EditorHeader = ({workflowId}: {workflowId: string}) => {
    return(
        <header className="flex justify-between mb-6 border-b-2 items-center px-6 py-5">
            <div className="flex items-center justify-center gap-5">
                <SidebarTrigger size={"icon"} />
                <EditorBreadcrums  workflowId={workflowId} />
            </div>
                <EditorSaveButton />
        </header>
    )
}