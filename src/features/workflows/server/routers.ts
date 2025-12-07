import prisma from "@/lib/db";
import { createTRPCRouter, premiumProcedure } from "@/trpc/init";
import { id } from "date-fns/locale";
import { generateSlug } from "random-word-slugs"
import z from "zod";

export const workflowsRouter = createTRPCRouter({
    create: premiumProcedure.mutation(async({ctx}) => {
        return prisma.workflow.create({
            data: {
                name: generateSlug(4),
                userId: ctx.auth.user.id
            }
        })
    }),
    remove: premiumProcedure.input(z.object({ id: z.string() })).mutation(async({ctx, input}) => {
        return prisma.workflow.delete({
            where: {
                userId: ctx.auth.user.id,
                id: input.id
            }
        })
    }),
    updateName: premiumProcedure.input(z.object({ id: z.string(), name: z.string() })).mutation(async({ctx, input}) => {
        return prisma.workflow.update({
            where: {
                userId: ctx.auth.user.id,
                id: input.id
            },
            data: {
                name: input.name
            }
        })
    }),
    getOne: premiumProcedure.input(z.object({ id: z.string() })).query(async({ctx, input}) => {
        return prisma.workflow.findUnique({
            where: {
                userId: ctx.auth.user.id,
                id: input.id
            }
        })
    }),
    getMany: premiumProcedure.query(async({ctx}) => {
        return prisma.workflow.findMany({
            where: {
                userId: ctx.auth.user.id,
            }
        })
    })
});