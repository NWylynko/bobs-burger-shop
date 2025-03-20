import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    if (user === null) {
      throw new Error("Not authenticated");
    }

    return "hello world";
  },
});
