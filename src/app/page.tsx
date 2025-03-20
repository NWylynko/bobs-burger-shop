import { SignedIn, UserProfile } from "@clerk/nextjs";
import { TasksWrapper } from "./TasksWrapper";

export default function Home() {
  return (
    <main>
      <SignedIn>
        <UserProfile routing="hash" />
        <TasksWrapper />
      </SignedIn>
    </main>
  );
}
