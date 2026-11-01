import { readFile, stat } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { approvedAssets } from "../src/data/assets.ts";
import { partners } from "../src/data/partners.ts";
import { teamMembers } from "../src/data/team.ts";
import { partnerWebsite, linkedinUrl, phoneHref, emailHref, httpsUrl } from "../src/lib/content.ts";
import { site, socialAccounts } from "../src/content.ts";

const publicRoot = resolve("public");
const errors = [];
async function asset(path, label, pdf = false) {
  if (!path) return;
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\") || /[?#]/.test(path)) {
    errors.push(`${label}: use a local public/ asset path beginning with /.`); return;
  }
  const local = resolve(publicRoot, `.${path}`);
  if (!local.startsWith(publicRoot + sep)) { errors.push(`${label}: path leaves public/.`); return; }
  try {
    if (!(await stat(local)).isFile()) throw new Error("not a file");
    if (pdf && (!(path.toLowerCase().endsWith(".pdf")) || !(await readFile(local)).subarray(0, 5).equals(Buffer.from("%PDF-")))) {
      errors.push(`${label}: supply an actual approved PDF.`);
    }
  } catch { errors.push(`${label}: missing file ${path}.`); }
}
function uniqueIds(entries, label) {
  const ids = new Set();
  entries.forEach(entry => { if (!entry.id?.trim() || ids.has(entry.id)) errors.push(`${label}: every entry needs a unique nonempty id.`); ids.add(entry.id); });
}
await Promise.all(Object.entries(approvedAssets).map(([key, path]) => asset(path, key, key === "companyProfilePdf")));
uniqueIds(partners, "partners"); uniqueIds(teamMembers, "team");
if (site.phone && !phoneHref(site.phone)) errors.push("Company phone: invalid number.");
const socialPlatforms = new Set();
for (const account of socialAccounts) {
  if (!httpsUrl(account.url)) errors.push(`Social ${account.platform}: use a full HTTPS URL.`);
  if (socialPlatforms.has(account.platform)) errors.push(`Social ${account.platform}: duplicate platform.`);
  socialPlatforms.add(account.platform);
}
for (const partner of partners.filter(p => p.approved)) {
  if (!partner.name?.trim() || !partner.imagePath?.trim() || !["client", "strategic-partner", "associate"].includes(partner.relationship)) errors.push(`Partner ${partner.id}: name, imagePath and valid relationship are required.`);
  await asset(partner.imagePath, `Partner ${partner.id} logo`);
  if (partner.websiteVerified && !partnerWebsite(partner)) errors.push(`Partner ${partner.id}: verified website must be a complete HTTPS URL.`);
}
for (const member of teamMembers.filter(m => m.approved)) {
  if (!member.fullName?.trim() || !member.title?.trim() || !member.biography?.trim() || !["leadership", "team"].includes(member.group)) errors.push(`Team ${member.id}: confirmed name, title, biography and valid group are required.`);
  await asset(member.imagePath, `Team ${member.id} photograph`);
  if (member.linkedin && !linkedinUrl(member.linkedin)) errors.push(`Team ${member.id}: use a professional HTTPS linkedin.com/in/ profile.`);
  if (member.phone && !phoneHref(member.phone)) errors.push(`Team ${member.id}: invalid phone number.`);
  if (member.email && !emailHref(member.email)) errors.push(`Team ${member.id}: invalid email address.`);
}
if (errors.length) { errors.forEach(error => console.error(error)); process.exitCode = 1; }
else console.log(`Content checks passed. Approved partners: ${partners.filter(p => p.approved).length}; approved profiles: ${teamMembers.filter(m => m.approved).length}. Unset assets remain pending.`);
