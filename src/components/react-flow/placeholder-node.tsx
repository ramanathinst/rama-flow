"use client";

import React, { forwardRef, type ReactNode } from "react";
import {
    useReactFlow,
    useNodeId,
    Handle,
    Position,
    type NodeProps,
} from "@xyflow/react";
import { BaseNode } from "./base-node";

export type PlaceholderNodeProps = Partial<NodeProps> & {
    children?: ReactNode;
    onClick?: () => void;
    ref?: React.Ref<HTMLDivElement>;
};

export const PlaceholderNode = forwardRef<HTMLDivElement, PlaceholderNodeProps>(({ children, onClick }, ref) => {

    return (
        <BaseNode
            ref={ref}
            onClick={onClick}
            className="bg-card w-[50px]  h-[35px] border-dashed border-gray-400 p-2 text-center text-gray-400 shadow-none"
        >
            {children}
            <Handle
                type="target"
                style={{ visibility: "hidden" }}
                position={Position.Top}
                isConnectable={false}
            />
            <Handle
                type="source"
                style={{ visibility: "hidden" }}
                position={Position.Bottom}
                isConnectable={false}
            />
        </BaseNode>
    );
})