import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Démo",
  description: "Démonstration interactive des composants graphiques et animations : WebGL Shader, boutons effet verre liquide, etc.",
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

