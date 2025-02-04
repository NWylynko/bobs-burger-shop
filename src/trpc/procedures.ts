import { TRPCError } from "@trpc/server";
import { baseProcedure, createMiddleware } from "./init";

const getUserAuthDetails = createMiddleware(({ ctx, next }) => {
  return next({
    ctx: {
      auth: ctx.auth,
      userId: ctx.auth.userId,
      role: ctx.auth.userId ? ctx.auth.has({ role: "org:admin" }) ? "admin" : "user" : "guest",
    } as const
  })
})

const ensureUserIsAuthed = createMiddleware(({ ctx, next }) => {

  if (ctx.auth.userId === null) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      auth: ctx.auth,
      userId: ctx.auth.userId,
      role: ctx.auth.has({ role: "org:admin" }) ? "admin" : "user",
    } as const
  })
})

const ensureUserIsAdmin = createMiddleware(({ ctx, next }) => {

  // unfortunately we do have to double up this check for typescript to be happy
  if (ctx.auth.userId === null) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  if (!ctx.auth.has({ role: "org:admin" })) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      auth: ctx.auth,
      userId: ctx.auth.userId,
      role: "admin",
    } as const
  })
})

// You might want to make some additional middlewares
// for example `ensureUserIsInOrg` or `ensureUserIsOrgAdmin`

export const publicProcedure = baseProcedure
  .use(getUserAuthDetails)

export const protectedProcedure = publicProcedure
  .use(getUserAuthDetails)
  .use(ensureUserIsAuthed)

export const adminProcedure = publicProcedure
  .use(getUserAuthDetails)
  .use(ensureUserIsAuthed)
  .use(ensureUserIsAdmin)