import type { MetadataRoute } from "next";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TokenPocket",
    short_name: "TokenPocket",
    description: "Secure crypto wallet to explore blockchain",
    start_url: "/en/home",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1273FF",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
