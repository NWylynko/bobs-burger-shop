import { HydrateClient, trpc } from "@/trpc/server";
import { SignedIn, UserProfile } from "@clerk/nextjs";
import { User } from "./User";

export default function Home() {

  void trpc.example.maybeUser.prefetch();

  return (
    <HydrateClient>
      <main>
        <SignedIn>
          <UserProfile routing="hash" />
        </SignedIn>
        <User />
      </main>
    </HydrateClient>
  );
}
