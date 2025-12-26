import  type { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { PlusIcon } from "lucide-react";
import { WorkflowNode } from "./workflow-node";
import { NodeSelector } from "./node-selector";

export const InitialNode = memo((props: NodeProps) => {
    const [ selectorOpen, setSelectorOpen ] = useState(false);
    return(
        <NodeSelector open={selectorOpen} onOpenChage={setSelectorOpen}>
            <WorkflowNode showToolbar={true}>
                <PlaceholderNode
                    {...props}
                    onClick={() => setSelectorOpen(true)}
                >
                    <div className="flex flex-col items-center justify-center">
                        <PlusIcon className="size-4" />
                    </div>
                </PlaceholderNode>
            </WorkflowNode>
        </NodeSelector>
    )
})