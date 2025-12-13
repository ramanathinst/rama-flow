"use client"

import { memo } from "react"
import { PlusIcon } from "lucide-react"
import type { NodeProps } from "@xyflow/react"
import { WorkflowNode } from "./workflow-node"
import { PlaceholderNode } from "./react-flow/place-holder-node"

export const InitailNode = memo((props: NodeProps) => {
    return (
        <WorkflowNode showToolbar={false}>
            <PlaceholderNode 
            onClick={() => {}}
            {...props}
            >
                <div className="flex items-center justify-center cursor-pointer">
                    <PlusIcon className="size-4"/>
                </div>
            </PlaceholderNode>
        </WorkflowNode>
    )
})