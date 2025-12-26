import { memo } from "react";
import { BaseTriggersNode } from "../base-triggers-node";
import { MousePointerIcon } from "lucide-react";
import type { NodeProps } from "@xyflow/react";

export const ManualTriggersNode = memo((props: NodeProps) => {
    return(
        <BaseTriggersNode 
            {...props}
            name="Manula Trigger"
            description="When clicking 'Execute Workflow'"
            icon={MousePointerIcon}
            onSettings={() => {}}
            onDoubleClick={() => {}}
        />
    )
})