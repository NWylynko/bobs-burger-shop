"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"

type Provider = Parameters<Awaited<ReturnType<typeof clerkClient>>["users"]["getUserOauthAccessToken"]>[1]

export const getUsersOauthToken = async (provider: Provider) => {
  const clerkPromise = clerkClient()
  const { userId } = await auth();

  if (!userId) {
    return {
      error: "Not signed in"
    }
  }

  const clerk = await clerkPromise

  const result = await clerk.users.getUserOauthAccessToken(userId, provider)

  console.log(result)

  return {
    access: result.data[0]
  }
}

export const getUsersSpotifyCurrentPlaying = async () => {
  const { access } = await getUsersOauthToken("spotify")

  if (!access) {
    return {
      error: "No token"
    }
  }

  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${access.token}`
    }
  })

  const data = await response.json()

  const songName = data.item.name
  const songArtist = data.item.artists.map((artist: any) => artist.name).join(", ")

  return {
    songName,
    songArtist,
    data
  }
}