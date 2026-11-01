# Taashi Engineering — Corporate Website (Client Concept V1)

A responsive React + TypeScript + Vite two-page website concept for **TAASHI ENGINEERING PRIVATE LIMITED**, focused on civil construction and infrastructure.

## Run locally

Requirements: Node.js 22.18+ (24 recommended) and npm. Content checks use native TypeScript support in Node.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (usually http://localhost:5173/).

Build and preview for production:

```bash
npm run build
npm run preview
```

The deployable build is produced in `dist/`. It can be hosted on Cloudflare Pages, Netlify, Vercel or other static hosting. For Cloudflare Pages: build command `npm run build`; output directory `dist`.

## Files

- `src/App.tsx`: website sections and interactive navigation, filters, and enquiry form.
- `src/content.ts`: one place to edit company information, services, and portfolio slots.
- `src/styles.css`: responsive design and visual tokens.
- `public/images/`: **original vector illustrations**, not client project photographs.
- `public/brand/taashi-icon.png`: supplied Taashi icon, used unchanged in the header, footer and favicon.
- `public/favicon.svg`: retained provisional fallback.

## Client content approval checklist — mandatory before public launch

1. Confirm **exact legal name**, CIN, registered office, phone, email, and authorized contact person with company directors or MCA records.
2. The supplied standalone icon is integrated. Obtain the approved horizontal logo and confirm the existing company-name lockup and tagline.
3. Confirm which service categories are genuinely offered; replace all draft descriptions in `src/content.ts`.
4. Replace all portfolio placeholders with **real, client-approved** projects, photographs, captions, project roles, locations, and permission to disclose names.
5. Review the four-stage approach; current copy is a suggested framework, not a verified process.
6. Connect the contact form to a secure form endpoint before promoting it as a submission form. Current implementation opens a prefilled **mailto:** draft; it does not send or store data on the site.
7. Add phone contact, domain email, full compliance disclosures, privacy notice and actual legal pages as required; verify by counsel if needed.
8. Add analytics, SEO, spam prevention and accessibility testing, and connect final domain.
9. Remove the visible draft-review notice and placeholder badges **only after all related content is approved**.

## About the hero and project graphics

All SVG graphics were created specifically for this concept. They are illustrative architectural diagrams and **do not depict Taashi's completed projects**. Replace with licensed photo content or Taashi's own project photos when approved.

## Publication note

The company's incorporation year and publicly listed contact details are for review, based on public company-register aggregators. They must not be treated as client-verified details. This version is a **design prototype** rather than a fully launched website.

## Homepage and team additions

The existing homepage sections remain in place. Trusted Relationships appears between Projects and Our Approach; /team contains separate leadership and team sections. Navigation links work across pages and support keyboard access, Escape to close the mobile menu and active-page/section indicators.

Editable content:

- src/data/assets.ts: approved horizontal logo paths, optional dark-background horizontal asset, standalone icon, favicon and company-profile PDF. All paths refer to files under public/. Keep missing assets null. The supplied PNG is used directly without modifying the artwork; the existing company-name text remains until a horizontal logo is supplied.
- src/data/partners.ts: company name, imagePath, relationship, approval and optional website. Only approved records appear. Logo links require websiteVerified: true and a valid HTTPS URL. Category groups appear only when there are approved entries in them.
- src/data/team.ts: all leadership and team profiles. Only approved records with confirmed names, operational titles and biographies appear. Optional photos fall back to initials; phone, professional email and LinkedIn links appear only when supplied and valid.
- src/content.ts: existing company details, services and project slots.

No approved relationship records, staff profiles or company-profile PDF have been supplied. Labelled development placeholders are displayed for the new content; they do not assert partnerships or appointments. The company-profile control stays disabled until an approved PDF path is configured. Approval flags must reflect permission to publish, rather than an inference from public company registers.

Validation commands:

~~~sh
npm run check:content
npm test
npm run build
~~~

On Windows PowerShell with script execution disabled, use npm.cmd instead of npm.

Build validation rejects missing configured local assets, malformed verified URLs, incomplete approved profiles and invalid contact links. Supply a real PDF before activating the download. Do not enable a path that points to a placeholder document.

The build pre-renders dist/index.html and dist/team/index.html with page-specific metadata and hydrates them with React. Existing Vite and React tooling handles this without an added router library. Serve dist/ at the domain root. A fallback in public/_redirects supports Netlify/Cloudflare Pages; other hosts should serve /team from team/index.html and configure SPA fallback as appropriate. No deployment has been performed from this workspace.

preview.html and team-preview.html are generated snapshots of the same React components and data, with local public/ paths and a small offline interaction script. Open them directly for offline review; run npm run preview:offline after source/data changes, or npm run build to refresh them. Edit the React source rather than these generated files.

The company phone number is maintained in src/content.ts as site.phone. It appears directly below the location in both the contact section and footer, with a tap-to-call link. The same file contains socialAccounts for Instagram, LinkedIn and Facebook. Current entries are explicitly labelled examples pointing to platform homepages. Replace each url with the actual company profile and remove example: true to switch to the final account labels. Both pages and offline previews use this shared data.

The footer construction element uses public/images/footer-construction.gif (a six-second looping animation) and a static SVG selected by prefers-reduced-motion. The original vector drawing remains in src/components/FooterConstruction.tsx. To regenerate the assets after changing that drawing, install the optional authoring tools listed in scripts/create-footer-gif.mjs, then run node scripts/create-footer-gif.mjs followed by npm run build. The authoring tools are not required to run or build the website with the checked-in image files.
