import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jules Deschamps · Créateur de sites internet",
    short_name: "Jules Deschamps",
    description:
      "Créateur de sites internet indépendant : des sites sur-mesure pour les entreprises et commerces locaux.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1f0ea",
    theme_color: "#f1f0ea",
    icons: [
      {
        src: "/img/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
