"use client";

import { trpc } from "@/trpc/client";
import { useAuth } from "@clerk/nextjs";

export const User = () => {
  const maybeUser = trpc.example.maybeUser.useQuery();
  const { has } = useAuth()

  return (
    <>
    <pre>
      {JSON.stringify(maybeUser, null, 2)}
    </pre>
    <pre>
      {JSON.stringify({
        admin: has ? has({ role: "org:admin" }) : false,
      }, null, 2)}
    </pre>
    </>
  )
}