"use client";

import { SignedIn, UserProfile } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <SignedIn>
        <UserProfile routing="hash" />
      </SignedIn>
    </main>
  );
}
