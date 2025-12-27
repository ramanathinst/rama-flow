import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import { NodeStatusIndicator, type NodeStatus } from "@/components/react-flow/node-status-indicator";
import { WorkflowNode } from "@/components/workflow-node";
import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

interface BaseExecutionsNodeProps extends NodeProps {
    icon: LucideIcon | string;
    name: string;
    description?: string;
    onDoubleClick?: () => void;
    onSettings?: () => void;
    children?: React.ReactNode;
    status?: NodeStatus;
}

export const BaseExecutionsNode = memo(({
    id,
    icon: Icon,
    name,
    description,
    onDoubleClick,
    onSettings,
    children,
    status
}: BaseExecutionsNodeProps) => {
    const { setNodes, setEdges } = useReactFlow();
    const handleDelete = () => {
        setNodes((currentNodes) => {
            const updatedNodes = currentNodes.filter((node) => node.id !== id);
            return updatedNodes;
        });

        // 2. Remove all edges connected to that node
        setEdges((currentEdges) => {
            const updatedEdges = currentEdges.filter(
                (edge) => edge.source !== id && edge.target !== id
            );
            return updatedEdges;
        });
    };
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
            >
                <BaseNode status={status} onDoubleClick={onDoubleClick}>
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
                        <BaseHandle 
                            id="target-1"
                            type="target"
                            position={Position.Left}
                        />
                    </BaseNodeContent>
                </BaseNode>
            </NodeStatusIndicator>
        </WorkflowNode>
    )
})