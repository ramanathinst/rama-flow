import prisma from "@/lib/db";
import { inngest } from "./client";

export const workflow = inngest.createFunction(
    { id: "workflow-execute" },
    { event: "workflow/execute" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "5s");
        
        await step.run("create-workflow", async() => {
            return prisma.workflow.create({
                data: {
                    name: "workflow created from inngest!"
                }
            })
        })       
    },
);