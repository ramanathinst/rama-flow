import { NodeToolbar, Position } from "@xyflow/react";
import { memo } from "react";
import { Button } from "./ui/button";
import { SettingsIcon, TrashIcon } from "lucide-react";

type WorkflowNodeProps = {
    children: React.ReactNode;
    showToolbar?: boolean;
    name?: string;
    description?: string;
    onSetting?: () => void;
    onDelete?: () => void;
}

export const WorkflowNode = memo(({
    children,
    showToolbar = true,
    name,
    description,
    onSetting,
    onDelete
}: WorkflowNodeProps) => {
    return(
        <>
            {showToolbar && (
                <NodeToolbar position={Position.Top}>
                    <Button onClick={onSetting} variant={"ghost"}>
                        <SettingsIcon className="size-4" />
                    </Button>
                    <Button onClick={onDelete} variant={"ghost"}>
                        <TrashIcon className="size-4" />
                    </Button>
                </NodeToolbar>
            )}

            {children}
            
            {name && (
                <NodeToolbar
                    position={Position.Bottom}
                    isVisible
                    className="max-w-[200px] text-center"
                >
                    <p className="font-medium">{name}</p>
                    {description && (
                        <p className="text-muted-foreground text-sm truncate">{description}</p>
                    )}
                </NodeToolbar>
            )}            
        </>
    )
})