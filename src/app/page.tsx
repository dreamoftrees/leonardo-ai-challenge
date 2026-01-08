"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/providers/session-provider";

/**
 * Home page - redirects to login or information based on auth status
 */
export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/information");
      } else {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking session
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}
