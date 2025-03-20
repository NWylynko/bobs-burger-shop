import { preloadQuery } from "convex/nextjs";
import { api } from "~convex/_generated/api";
import { PreloadedTasks, Tasks } from "./Tasks";
import { auth } from "@clerk/nextjs/server";
import { getAuthToken } from "./auth";

export async function TasksWrapper() {
  const { userId } = await auth();

  if (!userId) {
    return <Tasks />;
  }

  const token = await getAuthToken();

  const preloadedTasks = await preloadQuery(api.tasks.get, {}, { token });

  return <PreloadedTasks preloadedTasks={preloadedTasks} />;
}
