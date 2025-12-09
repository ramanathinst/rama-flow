import { PAGINATION } from "@/config/constants";
import prisma from "@/lib/db";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
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
    getMany: protectedProcedure.input(
        z.object({
            page: z.number().min(1).default(PAGINATION.DEFAULT_PAGE),
            pageSize: z.number().max(PAGINATION.MAX_PAGE_SIZE)
            .min(PAGINATION.MIN_PAGE_SIZE)
            .default(PAGINATION.DEFAULT_PAGE_SIZE),
            search: z.string().default("")
        })
    ).query(async({ctx, input}) => {
        const { page, pageSize, search}  = input;
        const [ items, totalCount ] = await Promise.all([
            prisma.workflow.findMany({
                skip: (page - 1) * pageSize,
                take: pageSize,
                where: {
                    userId: ctx.auth.user.id,
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                orderBy: {
                    updatedAt: "desc"
                }
            }),
            prisma.workflow.count({
                where: {
                    userId: ctx.auth.user.id,
                    name: {
                        contains: search
                    }
                }
            })
        ])

        const totalPages = Math.ceil(totalCount / pageSize);
        const hasNextPage = page < pageSize;
        const hasPreviousPage = page > 1;

        return {
            items,
            page,
            pageSize,
            totalPages,
            hasNextPage,
            hasPreviousPage
        }
    })
});