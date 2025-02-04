import type { PropsWithChildren } from "react";
import { ClerkProvider, OrganizationSwitcher, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <ClerkProvider>
      <TRPCProvider>
        <html lang="en">
          <body className="antialiased p-4">
            <header>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
                <OrganizationSwitcher />
              </SignedIn>
            </header>
            {children}
          </body>
        </html>
      </TRPCProvider>
    </ClerkProvider>
  );
}
