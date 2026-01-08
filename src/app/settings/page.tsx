"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/components/login-form/login-form";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { useSession } from "@/providers/session-provider";

/**
 * Settings page for viewing and editing user profile
 * Reuses the login form component in edit mode
 */
export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useSession();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSaveSuccess = () => {
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

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8">
        {/* Back button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/information">
            <ArrowLeft className="mr-2 size-4" />
            Back to Characters
          </Link>
        </Button>

        <div className="mx-auto max-w-md">
          <h1 className="mb-2 text-2xl font-bold">Settings</h1>
          <p className="mb-8 text-muted-foreground">
            Update your profile information or sign out
          </p>

          {/* Reuse login form in edit mode */}
          <LoginForm mode="edit" onSuccess={handleSaveSuccess} />

          {/* Logout button */}
          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 size-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
