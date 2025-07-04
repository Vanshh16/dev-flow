import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { generateSlug } from "random-word-slugs";
import { consumeCredits } from "@/lib/usage";
import { TRPCError } from "@trpc/server";

export const projectsRouter = createTRPCRouter({

    getOne: protectedProcedure
        .input(
            z.object({
                id: z.string().min(1, { message: "ID is required" })
            })
        )
        .query(async ({ input, ctx }) => {
            const projects = await prisma.project.findUnique({
                where: {
                    id: input.id,
                    userId: ctx.auth.userId
                }
            });
            return projects;
        }),

    getMany: protectedProcedure
        .query(async ({ ctx }) => {
            const projects = await prisma.project.findMany({
                where: {
                    userId: ctx.auth.userId
                },
                orderBy: {
                    updatedAt: "desc",
                },
            });
            return projects;
        }),

    create: protectedProcedure
        .input(
            z.object({
                value: z.string()
                    .min(1, { message: "Message is required" })
                    .max(1000, { message: "Prompt is too long" })
            })
        )
        .mutation(async ({ input, ctx }) => {

            try {
                await consumeCredits();
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error);

                    throw new TRPCError({ code: "BAD_REQUEST", message: "Something went wrong" });
                }
                else {
                    throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "You have run out of credits" });
                }
            }

            const createProject = await prisma.project.create({
                data: {
                    userId: ctx.auth.userId,
                    name: generateSlug(2, { format: "kebab" }),
                    messages: {
                        create: {
                            content: input.value,
                            role: "USER",
                            type: "RESULT"
                        }
                    }
                }
            })

            await inngest.send({
                name: 'code-agent/run',
                data: {
                    value: input.value,
                    projectId: createProject.id
                }
            })
            return createProject;
        })

})