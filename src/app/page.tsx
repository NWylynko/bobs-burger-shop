"use client";

import { SignedIn, UserProfile } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "~convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.tasks.get);

  return (
    <main>
      <SignedIn>
        <UserProfile routing="hash" />
      </SignedIn>
      <ul>{tasks?.map(({ _id, text }) => <li key={_id}>{text}</li>)}</ul>
    </main>
  );
}
