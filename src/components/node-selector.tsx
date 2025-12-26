"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { NodeType } from "@/generated/prisma/enums";
import { useReactFlow } from "@xyflow/react";
import { GlobeIcon, MousePointerIcon } from "lucide-react";
import Image from "next/image";
import { memo, useCallback } from "react";
import { toast } from "sonner";
import { createId } from "@paralleldrive/cuid2"

export type NodeTypeOptions = {
    icon: React.ComponentType<{className?: string}> | string;
    label: string;
    description: string;
    type: NodeType;
}

const triggersNode: NodeTypeOptions[] = [{
    icon: MousePointerIcon,
    label: "Manual Trigger",
    description: "Run the flow a clicking on button. Good for getting starts quickly",
    type: NodeType.MANULA_TRIGGER,
}]

const executionsNode: NodeTypeOptions[] = [{
    icon: GlobeIcon,
    label: "Http Request",
    description: "Make an HTTP Request",
    type: NodeType.HTTP_REQUEST,
}]


interface NodeSelectorProps {
    open: boolean;
    onOpenChage: (open: boolean) => void;
    children: React.ReactNode;
}

export const NodeSelector = memo(({
    open,
    onOpenChage,
    children
}: NodeSelectorProps) => {
    const { getNodes, setNodes, screenToFlowPosition } = useReactFlow();
    const handleSelector = useCallback((selection: NodeTypeOptions) => {
            if(selection.type === NodeType.MANULA_TRIGGER) {
                const nodes = getNodes();
                const hasManualTrigger = nodes.some( node => node.type === NodeType.MANULA_TRIGGER);
                if(hasManualTrigger) {
                    toast.error("Only one workflow is allowed per workflow!");
                    return;
                }
            }
            setNodes((nodes) => {
                const hasInitialTrigger = nodes.some( node => node.type === NodeType.INITIAL);
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                const flowPosition = screenToFlowPosition({
                    x: centerX + (Math.random() - 0.5) * 200,
                    y: centerY + (Math.random() - 0.5) * 200,
                })

                const newNode = {
                    id: createId(),
                    type: selection.type,
                    position: flowPosition,
                    data: {}
                }

                if(hasInitialTrigger) {
                    return [newNode]
                }

                return [ ...nodes, newNode]
            })
            onOpenChage(false)
    }, [
        getNodes,
        setNodes,
        screenToFlowPosition,
        onOpenChage
    ])
    return (
        <Sheet open={open} onOpenChange={onOpenChage}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>What triggers this workflow?</SheetTitle>
                    <SheetDescription>
                        A trigger is a step that starts your workflows.
                    </SheetDescription>
                </SheetHeader>
                <div>
                    {triggersNode.map((nodeType) => {
                        const Icon = nodeType.icon;
                        return(
                            <div key={nodeType.type}
                                onClick={() => handleSelector(nodeType)}
                                className="flex justify-between items-center px-4 py-4 border-l-2 hover:border-l-primary cursor-pointer border-b"
                            >
                                <div className="flex justify-center items-center">
                                    { typeof Icon === "string" ? (
                                        <Image src={Icon} alt={nodeType.label} width={40} height={40} />
                                    ): (
                                        <Icon className="size-6" />
                                    )}
                                    <div className="flex flex-col pl-4">
                                        <span className="font-medium"> {nodeType.label} </span>
                                        <span className="text-muted-foreground text-sm"> {nodeType.description} </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div>
                    {executionsNode.map((nodeType) => {
                        const Icon = nodeType.icon;
                        return(
                            <div key={nodeType.type}
                                onClick={() => handleSelector(nodeType)}
                                className="flex justify-between items-center px-4 py-4 border-l-2 hover:border-l-primary cursor-pointer border-b"
                            >
                                <div className="flex justify-center items-center">
                                    { typeof Icon === "string" ? (
                                        <Image src={Icon} alt={nodeType.label} width={40} height={40} />
                                    ): (
                                        <Icon className="size-6" />
                                    )}
                                    <div className="flex flex-col pl-4">
                                        <span className="font-medium"> {nodeType.label} </span>
                                        <span className="text-muted-foreground text-sm"> {nodeType.description} </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </SheetContent>
        </Sheet>
    )
})
