import type { ReactNode } from "react";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";

interface InformationLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

/**
 * Layout for the information section
 * Includes header, footer, and parallel route slot for modals
 */
export default function InformationLayout({
  children,
  modal,
}: InformationLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {modal}
    </div>
  );
}
