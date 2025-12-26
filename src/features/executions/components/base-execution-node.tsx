import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import { WorkflowNode } from "@/components/workflow-node";
import { NodeProps, Position } from "@xyflow/react";
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
}

export const BaseExecutionsNode = memo(({
    icon: Icon,
    name,
    description,
    onDoubleClick,
    onSettings,
    children
}: BaseExecutionsNodeProps) => {
    const handleDelete = () => {
        // TODO
    }
    return (
        <WorkflowNode
            name={name}
            description={description}
            onSetting={onSettings}
            onDelete={handleDelete}
        >
            <BaseNode onDoubleClick={onDoubleClick}>
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
        </WorkflowNode>
    )
})