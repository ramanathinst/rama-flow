import prisma from "@/lib/db";
import { inngest } from "./client";
import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

const google = createGoogleGenerativeAI({
  // custom settings
});

export const workflow = inngest.createFunction(
    { id: "ai-execute" },
    { event: "ai/execute" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "5s");
        
        const {steps} = await step.ai.wrap("ai-execute",generateText, {
            model: google("gemini-2.5-flash"),
            system: "You are helpful assistent",
            prompt: "what is 4+9?"
        })
        return {steps}  
    },
);