"use client";

import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import {
  GET_CHARACTER,
  type GetCharacterResponse,
} from "@/graphql/characters";
import { cn } from "@/lib/utils";

interface CharacterModalProps {
  characterId: string;
}

/**
 * Modal displaying full character information
 */
export function CharacterModal({ characterId }: CharacterModalProps) {
  const router = useRouter();

  const { data, loading, error } = useQuery<GetCharacterResponse>(
    GET_CHARACTER,
    {
      variables: { id: characterId },
    }
  );

  const handleClose = () => {
    // Use router.back() to properly close the intercepted route modal
    // This restores the previous route state without soft navigation issues
    router.back();
  };

  const character = data?.character;

  const statusColor = character
    ? {
        Alive: "bg-green-500",
        Dead: "bg-red-500",
        unknown: "bg-gray-500",
      }[character.status]
    : "bg-gray-500";

  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {loading ? (
          <>
            <VisuallyHidden>
              <DialogTitle>Loading character details</DialogTitle>
            </VisuallyHidden>
            <div className="space-y-4">
              <Skeleton className="mx-auto size-32 rounded-full" />
              <Skeleton className="mx-auto h-6 w-48" />
              <Skeleton className="mx-auto h-4 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </>
        ) : error ? (
          <>
            <VisuallyHidden>
              <DialogTitle>Error loading character</DialogTitle>
            </VisuallyHidden>
            <div className="py-8 text-center">
              <p className="text-destructive">Failed to load character</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {error.message}
              </p>
            </div>
          </>
        ) : character ? (
          <>
            <DialogHeader className="text-center">
              <div className="relative mx-auto mb-4 size-32 overflow-hidden rounded-full border-4 border-border">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <DialogTitle className="text-2xl">{character.name}</DialogTitle>
              <DialogDescription className="flex items-center justify-center gap-2">
                <span
                  className={cn("size-2.5 rounded-full", statusColor)}
                  aria-hidden="true"
                />
                {character.status} - {character.species}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">Gender</p>
                  <p className="text-foreground">{character.gender}</p>
                </div>
                {character.type && (
                  <div>
                    <p className="font-medium text-muted-foreground">Type</p>
                    <p className="text-foreground">{character.type}</p>
                  </div>
                )}
              </div>

              {/* Origin */}
              <div>
                <p className="font-medium text-muted-foreground">Origin</p>
                <p className="text-foreground">{character.origin.name}</p>
              </div>

              {/* Current Location */}
              <div>
                <p className="font-medium text-muted-foreground">
                  Last Known Location
                </p>
                <p className="text-foreground">{character.location.name}</p>
              </div>

              {/* Episodes */}
              <div>
                <p className="mb-2 font-medium text-muted-foreground">
                  Featured in {character.episode.length} episode
                  {character.episode.length !== 1 ? "s" : ""}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {character.episode.slice(0, 10).map((ep) => (
                    <Badge key={ep.id} variant="secondary" className="text-xs">
                      {ep.episode || ep.name}
                    </Badge>
                  ))}
                  {character.episode.length > 10 && (
                    <Badge variant="outline" className="text-xs">
                      +{character.episode.length - 10} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Created Date */}
              <p className="text-xs text-muted-foreground">
                First seen:{" "}
                {new Date(character.created).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </>
        ) : (
          <VisuallyHidden>
            <DialogTitle>Character details</DialogTitle>
          </VisuallyHidden>
        )}
      </DialogContent>
    </Dialog>
  );
}
