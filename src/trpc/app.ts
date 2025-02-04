import { createTRPCRouter } from './init';
import { exampleRouter } from './routers/example';

export const appRouter = createTRPCRouter({
  example: exampleRouter
});

export type AppRouter = typeof appRouter;