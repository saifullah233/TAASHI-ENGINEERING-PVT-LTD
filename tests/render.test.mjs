import { after, test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: "custom" });
after(() => server.close());
const { renderPage } = await server.ssrLoadModule("/src/offlinePreview.tsx");

test("homepage preserves existing sections with relationships between projects and approach", () => {
  const { body } = renderPage("home");
  const ids = ["home", "about", "expertise", "projects", "relationships", "approach", "contact"];
  const positions = ids.map(id => body.indexOf(`id="${id}"`));
  positions.forEach(position => assert.ok(position >= 0));
  assert.deepEqual([...positions].sort((a,b) => a-b), positions);
  assert.match(body, /data-project-filter="Infrastructure"/);
  assert.match(body, /id="project-enquiry"/);
  assert.match(body, /href="\/team"/);
  assert.match(body, /DEVELOPMENT PREVIEW/);
});

test("team deep link renders its own heading, sections, metadata and cross-page links", () => {
  const { body, title } = renderPage("team");
  assert.match(title, /Leadership & Team/);
  assert.match(body, /The People Behind/);
  assert.match(body, /id="leadership"/);
  assert.match(body, /id="people"/);
  assert.match(body, /href="\/team" aria-current="page"/);
  assert.match(body, /href="\/#expertise"/);
  assert.match(body, /href="\/#contact"/);
  assert.doesNotMatch(body, /id="project-enquiry"/);
});

test("missing PDF has a disabled labelled control and no download destination", () => {
  const { body } = renderPage("home");
  assert.match(body, /disabled="" aria-describedby="profile-pdf-pending"/);
  assert.match(body, /Approved PDF pending/);
  assert.doesNotMatch(body, /download=""/);
});

test("partner component links only verified companies, groups categories and excludes unapproved data", async () => {
  const { default: ClientsPartners } = await server.ssrLoadModule("/src/components/ClientsPartners.tsx");
  const fixture = { id: "test", name: "Test fixture", imagePath: "/test.svg", relationship: "client", approved: true, website: "https://example.com", websiteVerified: true };
  const html = renderToStaticMarkup(createElement(ClientsPartners, { entries: [fixture, { ...fixture, id: "other", name: "Unapproved test record", approved: false }, { ...fixture, id: "associate", relationship: "associate", name: "Unlinked test record", websiteVerified: false }] }));
  assert.match(html, /href="https:\/\/example.com\/" target="_blank" rel="noopener noreferrer"/);
  assert.match(html, /Clients/);
  assert.match(html, /Associates/);
  assert.doesNotMatch(html, /Unapproved test record/);
  assert.equal((html.match(/target="_blank"/g) ?? []).length, 1);
});

test("approved profile supports initials and only the supplied contact fields", async () => {
  const { default: ProfileCard } = await server.ssrLoadModule("/src/components/ProfileCard.tsx");
  const member = { id: "test", fullName: "Test Person", title: "Confirmed test role", biography: "A test biography.", group: "leadership", approved: true, email: "test@example.com" };
  const html = renderToStaticMarkup(createElement(ProfileCard, { member }));
  assert.match(html, /Initials for Test Person/);
  assert.match(html, />TP</);
  assert.match(html, /href="mailto:test@example.com"/);
  assert.doesNotMatch(html, /href="tel:|linkedin.com|<img/);
});
