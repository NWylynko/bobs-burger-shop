import { cache } from 'react';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { auth } from '@clerk/nextjs/server';

export const createTRPCContext = cache(async () => {
  return {
    auth: await auth()
  };
})

type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const createMiddleware = t.middleware;