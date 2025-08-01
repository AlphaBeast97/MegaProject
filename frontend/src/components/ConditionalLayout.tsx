"use client";

import type { PropsWithChildren } from "react";
import { useUser } from "@clerk/nextjs";
import { AppLayout } from "@/components/AppLayout";

export function ConditionalLayout({ children }: PropsWithChildren) {
  const { isLoaded, isSignedIn } = useUser();

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // If user is signed in, show the app layout with sidebar and header
  if (isSignedIn) {
    return <AppLayout>{children}</AppLayout>;
  }

  // If user is not signed in, show content without app layout
  return <>{children}</>;
}
