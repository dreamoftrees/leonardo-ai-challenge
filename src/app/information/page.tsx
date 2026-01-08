"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useQuery } from "@apollo/client/react";
import { CharacterCard } from "@/components/character-card/character-card";
import { Pagination } from "@/components/pagination/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GET_CHARACTERS,
  type GetCharactersResponse,
} from "@/graphql/characters";
import { useSession } from "@/providers/session-provider";

/**
 * Loading skeleton for character grid
 */
function CharacterGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={`skeleton-${i}`} className="space-y-2">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

/**
 * Character grid with data fetching
 */
function CharacterGrid({ page }: { page: number }) {
  const { data, loading, error } = useQuery<GetCharactersResponse>(
    GET_CHARACTERS,
    {
      variables: { page },
    }
  );

  if (loading) {
    return <CharacterGridSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-destructive">Failed to load characters</p>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  if (!data?.characters.results.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No characters found</p>
      </div>
    );
  }

  const { results, info } = data.characters;

  return (
    <>
      {/* Character grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {results.map((character, index) => (
          <CharacterCard
            key={character.id}
            character={character}
            currentPage={page}
            priority={index < 10}
          />
        ))}
      </div>

      {/* Pagination */}
      {info.pages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={page}
            totalPages={info.pages}
            basePath="/information"
          />
        </div>
      )}

      {/* Results info */}
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Showing page {page} of {info.pages} ({info.count} total characters)
      </p>
    </>
  );
}

/**
 * Information page content with search params handling
 */
function InformationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useSession();

  // Get page from URL, default to 1
  const pageParam = searchParams.get("page");
  const page = pageParam ? Math.max(1, Number.parseInt(pageParam, 10)) : 1;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking session
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Characters</h1>
        <p className="mt-2 text-muted-foreground">
          Explore characters from the Rick and Morty universe
        </p>
      </div>

      <CharacterGrid page={page} />
    </div>
  );
}

/**
 * Information page - displays paginated character grid
 * Protected route - requires authentication
 */
export default function InformationPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="mt-2 h-5 w-72" />
          </div>
          <CharacterGridSkeleton />
        </div>
      }
    >
      <InformationPageContent />
    </Suspense>
  );
}
