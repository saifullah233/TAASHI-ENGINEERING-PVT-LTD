export interface ApprovedAssets {
  horizontalLogo: string | null;
  horizontalLogoOnDark: string | null;
  standaloneIcon: string | null;
  favicon: string | null;
  companyProfilePdf: string | null;
}

// Add ONLY approved files to public/, then use paths starting with /.
// Example: public/brand/taashi-horizontal.svg -> /brand/taashi-horizontal.svg.
// Original SVGs are displayed as supplied; no recoloring or recreation.
// The supplied standalone PNG is approved for the logo mark and favicon.
// Keep the existing company-name text until a horizontal logo asset arrives.
export const approvedAssets: ApprovedAssets = {
  horizontalLogo: null,
  horizontalLogoOnDark: null, // Optional approved version for a navy background.
  standaloneIcon: "/brand/taashi-icon.png",
  favicon: "/brand/taashi-icon.png",
  companyProfilePdf: null, // Example after approval: /documents/company-profile.pdf.
};
