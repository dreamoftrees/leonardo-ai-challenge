"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginForm } from "@/components/login-form/login-form";
import { useSession } from "@/providers/session-provider";

/**
 * Login page - gates access to the application
 * Redirects authenticated users to the information page
 */
export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSession();

  // Redirect authenticated users to information page
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/information");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLoginSuccess = () => {
    router.push("/information");
  };

  // Show loading state while checking session
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Don't render form if already authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 text-center">
        <Image
          src="/logo-leonardo-ai.svg"
          alt="Leonardo AI"
          width={200}
          height={200}
          className="mx-auto mb-6"
          priority
        />
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Web Team Challenge
        </h1>
      </div>
      <LoginForm onSuccess={handleLoginSuccess} />
    </main>
  );
}
