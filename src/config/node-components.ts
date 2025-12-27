import { InitialNode } from "@/components/initial-node";
import { HttpRequestsNode } from "@/features/executions/components/http-request/node";
import { ManualTriggersNode } from "@/features/triggers/components/manual-triggers/node";
import { NodeType } from "@/generated/prisma/enums";
import { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
    [NodeType.INITIAL] : InitialNode,
    [NodeType.MANUAL_TRIGGER] : ManualTriggersNode,
    [NodeType.HTTP_REQUEST] : HttpRequestsNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;