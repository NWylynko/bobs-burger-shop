import { z } from 'zod';
import { createTRPCRouter } from '../init';
import { publicProcedure, protectedProcedure, adminProcedure } from '../procedures';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const exampleRouter = createTRPCRouter({
  add: publicProcedure
    .input(z.tuple([z.number(), z.number()]))
    .mutation(async ({ input, ctx }) => {
      return input[0] + input[1];
    }),
  subtract: publicProcedure
    .input(z.tuple([z.number(), z.number()]))
    .mutation(async ({ input, ctx }) => {
      return input[0] - input[1];
    }),
  multiply: publicProcedure
    .input(z.tuple([z.number(), z.number()]))
    .mutation(async ({ input, ctx }) => {
      return input[0] * input[1];
    }),
  divide: publicProcedure
    .input(z.tuple([z.number(), z.number()]))
    .mutation(async ({ input, ctx }) => {
      return input[0] / input[1];
    }),

  // Queries like these should never actually be used,
  // just use clerk's client side hooks to get the user.
  // But its good for testing the whole stack
  maybeUser: publicProcedure
    .query(async ({ ctx }) => {
      await wait(1000);
      return { userId: ctx.userId, role: ctx.role };
    }),

  getUser: protectedProcedure
    .query(async ({ ctx }) => {
      return { userId: ctx.userId, role: ctx.role };
    }),
  getAdmin: adminProcedure
    .query(async ({ ctx }) => {
      return { userId: ctx.userId, role: ctx.role };
    }),
});
