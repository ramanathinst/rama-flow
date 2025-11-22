import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({

    testAi: protectedProcedure.mutation(async() => {
        await inngest.send({
            name: "ai/execute"
        })
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;