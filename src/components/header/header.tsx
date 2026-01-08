"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/providers/session-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/**
 * Application header component
 * Displays logo on left, user info with link to settings on right
 */
export function Header() {
  const { user, isAuthenticated } = useSession();

  // Get initials for avatar fallback
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo - Left side */}
        <Link href="/information" className="flex items-center">
          <Image
            src="/leonardo-logo-text.svg"
            alt="Leonardo AI"
            width={140}
            height={40}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* User info - Right side */}
        {isAuthenticated && user && (
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent"
          >
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium leading-none text-foreground">{user.username}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {user.jobTitle}
              </p>
            </div>
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(user.username)}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </header>
  );
}
