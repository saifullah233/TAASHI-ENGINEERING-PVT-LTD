export type Page = "home" | "team" | "not-found";

export function pageFromPath(path: string): Page {
  const normalized = path.replace(/\/+$/, "") || "/";
  return normalized === "/" ? "home" : normalized === "/team" ? "team" : "not-found";
}

export const navigation = [
  { label: "Home", href: "/#home", section: "home" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Services", href: "/#expertise", section: "expertise" },
  { label: "Projects", href: "/#projects", section: "projects" },
  { label: "Our Team", href: "/team", section: "team" },
  { label: "Contact", href: "/#contact", section: "contact" },
] as const;

export const pageMetadata: Record<Page, { title: string; description: string }> = {
  home: {
    title: "Taashi Engineering | Civil Construction & Infrastructure",
    description: "Taashi Engineering Private Limited — civil construction and infrastructure. Discover our approach and connect with our team.",
  },
  team: {
    title: "Leadership & Team | Taashi Engineering",
    description: "Meet the people behind Taashi Engineering. Explore our leadership and team profiles in civil construction and infrastructure.",
  },
  "not-found": {
    title: "Page not found | Taashi Engineering",
    description: "Return to Taashi Engineering to explore our civil construction and infrastructure website.",
  },
};
