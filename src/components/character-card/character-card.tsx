"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Character } from "@/graphql/characters";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<Character["status"], string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  unknown: "bg-gray-500",
};

interface CharacterCardProps {
  character: Character;
  /** Current page for back navigation context */
  currentPage?: number;
  /** Whether this image should be prioritized for LCP optimization */
  priority?: boolean;
}

/**
 * Displays a character card in the grid
 * Links to the character detail modal
 * Memoized to prevent unnecessary re-renders in list
 */
export const CharacterCard = memo(function CharacterCard({
  character,
  currentPage,
  priority = false,
}: CharacterCardProps) {
  const statusColor = STATUS_COLORS[character.status];

  // Build the modal URL with page context
  const modalUrl = currentPage
    ? `/information/${character.id}?page=${currentPage}`
    : `/information/${character.id}`;

  return (
    <Link href={modalUrl} scroll={false}>
      <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            priority={priority}
          />
          {/* Status indicator */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
            <span className={cn("size-2 rounded-full", statusColor)} />
            {character.status}
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="truncate font-semibold text-foreground">
            {character.name}
          </h3>
          <p className="truncate text-sm text-muted-foreground">
            {character.species}
            {character.type && ` - ${character.type}`}
          </p>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            📍 {character.location.name}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
});
