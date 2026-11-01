import type { Partner } from "../data/partners.ts";
import type { TeamMember } from "../data/team.ts";

export function httpsUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

export function partnerWebsite(partner: Partner): string | undefined {
  return partner.approved && partner.websiteVerified ? httpsUrl(partner.website) : undefined;
}

export function linkedinUrl(value?: string): string | undefined {
  const safe = httpsUrl(value);
  if (!safe) return undefined;
  const url = new URL(safe);
  return (url.hostname === "linkedin.com" || url.hostname === "www.linkedin.com") && url.pathname.startsWith("/in/")
    ? safe : undefined;
}

export function initials(name: string): string {
  const words = name.trim().split(/\s+/u).filter(Boolean);
  return words.length ? [words[0], ...(words.length > 1 ? [words.at(-1)!] : [])]
    .map(word => Array.from(word)[0]).join("").toLocaleUpperCase() : "";
}

export function approvedPartners(entries: Partner[]): Partner[] {
  return entries.filter(entry => entry.approved && entry.name.trim() && entry.imagePath.trim());
}

export function approvedTeam(entries: TeamMember[]): TeamMember[] {
  return entries.filter(entry => entry.approved && entry.fullName.trim() && entry.title.trim() && entry.biography.trim());
}

export function phoneHref(phone?: string): string | undefined {
  const cleaned = phone?.replace(/[\s().-]/g, "");
  return cleaned && /^\+?\d{5,15}$/.test(cleaned) ? `tel:${cleaned}` : undefined;
}

export function emailHref(email?: string): string | undefined {
  return email && /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email) ? `mailto:${email}` : undefined;
}
