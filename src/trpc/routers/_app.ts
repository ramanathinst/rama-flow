import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({

    getUsers: protectedProcedure.query(() => {
        return prisma.user.findMany({})
    }),
    getWorkflows: protectedProcedure.query(() => {
        return prisma.workflow.findMany()
    }),
    createWorkflow: baseProcedure.mutation(async({ctx}) => {
        await inngest.send({
            name: "workflow/execute"
        })
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;