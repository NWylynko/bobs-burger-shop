"use client";

import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import { api } from "~convex/_generated/api";

export function PreloadedTasks(props: {
  preloadedTasks: Preloaded<typeof api.tasks.get>;
}) {
  const tasks = usePreloadedQuery(props.preloadedTasks);

  return <span>{tasks}</span>;
}

export function Tasks() {
  const tasks = useQuery(api.tasks.get, {});

  if (tasks === undefined) {
    return <span>Loading...</span>;
  }

  return <span>{tasks}</span>;
}
