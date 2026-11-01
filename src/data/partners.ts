export const relationshipLabels = {
  client: "Clients",
  "strategic-partner": "Strategic Partners",
  associate: "Associates",
} as const;

export type RelationshipType = keyof typeof relationshipLabels;

export interface Partner {
  id: string;
  name: string;
  imagePath: string;
  relationship: RelationshipType;
  approved: boolean;
  showName?: boolean; // Defaults to true.
  website?: string;
  websiteVerified?: boolean; // Must be true to make a logo clickable.
}

// Add client-approved relationships and permission-cleared logos here.
// imagePath refers to a file in public/, e.g. /partners/approved-logo.svg.
// A website alone never creates a link; verify it and set websiteVerified: true.
// No real companies or partnerships have been supplied yet.
export const partners: Partner[] = [];
