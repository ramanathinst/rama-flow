import { memo } from "react";
import { BaseExecutionsNode } from "../base-execution-node";
import { GlobeIcon } from "lucide-react";
import type { Node, NodeProps } from "@xyflow/react";

type HttpRequestsNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    [key: string ] : unknown;
}

type HttpRequestsNodeType = Node<HttpRequestsNodeData>

export const HttpRequestsNode = memo((props: NodeProps<HttpRequestsNodeType>) => {
    const nodeData = props.data as HttpRequestsNodeData;
    const description = nodeData.endpoint ? `${nodeData.method || "GET"} : ${nodeData.endpoint}`: "Not Configured!"
    return(
        <BaseExecutionsNode 
            {...props}
            name="Http Request"
            description={description}
            icon={GlobeIcon}
            onSettings={() => {}}
            onDoubleClick={() => {}}
        />
    )
})