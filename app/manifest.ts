import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Studio — Jules Deschamps",
    short_name: "Studio JD",
    description:
      "Studio web indépendant : création de sites sur-mesure pour les entreprises et commerces locaux.",
    start_url: "/",
    display: "standalone",
    background_color: "#2231d8",
    theme_color: "#2231d8",
    icons: [
      {
        src: "/img/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
