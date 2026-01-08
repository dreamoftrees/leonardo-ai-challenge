import { CharacterModal } from "@/components/character-modal/character-modal";

interface ModalPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Intercepted route for character modal
 * Shows the modal overlay while preserving the information page underneath
 */
export default async function CharacterModalPage({ params }: ModalPageProps) {
  const { id } = await params;
  return <CharacterModal characterId={id} />;
}
