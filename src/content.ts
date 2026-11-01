/**
 * Content control center for the Taashi Engineering website.
 * IMPORTANT: Client must approve every item flagged [VERIFY] before publishing.
 */
export const site = {
  name: "Taashi Engineering",
  legalName: "TAASHI ENGINEERING PRIVATE LIMITED",
  tagline: "Engineering Progress. Building Trust.", // [VERIFY] proposed tagline; not approved
  description: "Civil construction & infrastructure", // confirmed by client briefing
  companyCIN: "U45200UP2021PTC152130", // [VERIFY] current MCA record before launch
  registeredOffice:
    "573 C, Regent Suncity, Indirapuram, Ghaziabad, Uttar Pradesh 201011", // [VERIFY]
  email: "taashiinfra@gmail.com", // [VERIFY] directory email; ask client to confirm
  phone: "+91 8130163626", // supplied by client
  serviceArea: "", // [ADD] client-confirmed operating regions
  companyFounded: "2021", // incorporation year only, not proof of project experience
};

export type SocialPlatform = "linkedin" | "instagram" | "facebook" | "youtube" | "x";
export interface SocialAccount {
  platform: SocialPlatform;
  url: string;
  example?: boolean; // Remove or set false when replacing with the actual company profile.
}

// Example links go to the platforms' homepages, not unconfirmed company profiles.
// Replace each URL with the company account and remove example: true.
export const socialAccounts: SocialAccount[] = [
  { platform: "instagram", url: "https://www.instagram.com/", example: true },
  { platform: "linkedin", url: "https://www.linkedin.com/", example: true },
  { platform: "facebook", url: "https://www.facebook.com/", example: true },
];

// [VERIFY] The entries below are DRAFT categories — not factual claims of Taashi's service scope.
export const services = [
  {
    number: "01",
    title: "Civil Construction",
    short: "Built on sound fundamentals.",
    description:
      "A proposed service category for building and general civil works, subject to confirmation of Taashi’s actual scope.",
    icon: "building" as const,
  },
  {
    number: "02",
    title: "Structural Works",
    short: "Strength in every detail.",
    description:
      "A proposed category covering structural construction and RCC-related work, to be validated with the company.",
    icon: "layers" as const,
  },
  {
    number: "03",
    title: "Infrastructure Works",
    short: "The foundation for progress.",
    description:
      "A proposed category for site and infrastructure works. Replace this copy with client-approved capabilities.",
    icon: "road" as const,
  },
  {
    number: "04",
    title: "Project Execution",
    short: "From plan to delivery.",
    description:
      "A proposed category for coordinated civil-project execution. Specify only services Taashi actually provides.",
    icon: "helmet" as const,
  },
];

// Portfolio category slots. These DO NOT describe completed Taashi projects.
export const portfolioSlots = [
  {
    id: "01",
    category: "Buildings",
    title: "Building Construction",
    subtitle: "Space reserved for an approved project",
    image: "/images/project-building.svg",
  },
  {
    id: "02",
    category: "Infrastructure",
    title: "Infrastructure Development",
    subtitle: "Space reserved for an approved project",
    image: "/images/project-infra.svg",
  },
  {
    id: "03",
    category: "Civil Works",
    title: "Civil & Structural Works",
    subtitle: "Space reserved for an approved project",
    image: "/images/project-civil.svg",
  },
];
