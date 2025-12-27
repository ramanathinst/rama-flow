import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import { type NodeStatus, NodeStatusIndicator } from "@/components/react-flow/node-status-indicator";
import { WorkflowNode } from "@/components/workflow-node";
import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

interface BaseTriggersNodeProps extends NodeProps {
    icon: LucideIcon | string;
    name: string;
    description?: string;
    onDoubleClick?: () => void;
    onSettings?: () => void;
    children?: React.ReactNode;
    status?: NodeStatus;
}

export const BaseTriggersNode = memo(({
    id,
    icon: Icon,
    name,
    description,
    onDoubleClick,
    onSettings,
    children,
    status
}: BaseTriggersNodeProps) => {
    const { setNodes ,setEdges } = useReactFlow();
    const handleDelete = () => {
        setNodes((currentNodes) => {
            const updateNodes = currentNodes.filter((node) => node.id !== id);
            return updateNodes;
        }),
        setEdges((currentEdges) => {
            const updateEdges = currentEdges.filter((edge) => edge.source !== id && edge.target !== id);
            return updateEdges;
        })
    }
    return (
        <WorkflowNode
            name={name}
            description={description}
            onSetting={onSettings}
            onDelete={handleDelete}
        >
            <NodeStatusIndicator
                status={status}
                variant="border"
                className="rounded-l-2xl"
            >
                <BaseNode 
                    onDoubleClick={onDoubleClick}
                    className="rounded-l-2xl object-contain"
                    status={status}
                >
                    <BaseNodeContent className="p-5">
                        {typeof Icon === "string" ? (
                            <Image src={Icon} alt={name} width={40} height={40} />
                        ) : (
                            <Icon className="size-4 object-contain" />
                        )}
                        {children}
                        <BaseHandle 
                            id="source-1"
                            type="source"
                            position={Position.Right}
                        />
                    </BaseNodeContent>
                </BaseNode>
            </NodeStatusIndicator>
        </WorkflowNode>
    )
})