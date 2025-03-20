"use client"

import { SignedIn, SignUpButton, UserProfile } from "@clerk/nextjs";
import { getUsersOauthToken, getUsersSpotifyCurrentPlaying } from "./actions";

export default function Home() {
  return (
    <main>
      <SignedIn>
        <UserProfile routing="hash" />
        <div>
          <button onClick={async () => console.log(await getUsersOauthToken("spotify"))}>Get users spotify token</button>
          <button onClick={async () => console.log(await getUsersSpotifyCurrentPlaying())}>Get users currently playing</button>
        </div>
      </SignedIn>
    </main>
  );
}
