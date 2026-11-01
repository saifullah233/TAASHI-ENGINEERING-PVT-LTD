import test from "node:test";
import assert from "node:assert/strict";
import { httpsUrl, partnerWebsite, linkedinUrl, initials, approvedPartners, approvedTeam, phoneHref, emailHref } from "../src/lib/content.ts";
import { pageFromPath } from "../src/navigation.ts";

test("links require an approved relationship, explicit verification and HTTPS", () => {
  const fixture = { id: "test", name: "Test fixture", imagePath: "/test.svg", relationship: "client", approved: true, website: "https://example.com" };
  assert.equal(partnerWebsite(fixture), undefined);
  assert.equal(partnerWebsite({ ...fixture, websiteVerified: true }), "https://example.com/");
  assert.equal(partnerWebsite({ ...fixture, approved: false, websiteVerified: true }), undefined);
  for (const website of ["javascript:alert(1)", "//example.com", "http://example.com", "https://user:password@example.com", "invalid"]) {
    assert.equal(partnerWebsite({ ...fixture, website, websiteVerified: true }), undefined);
    assert.equal(httpsUrl(website), undefined);
  }
});

test("unapproved and incomplete companies or people never become public entries", () => {
  const partner = { id: "test", name: "Test fixture", imagePath: "/test.svg", relationship: "client", approved: true };
  assert.deepEqual(approvedPartners([partner, { ...partner, approved: false }, { ...partner, name: " " }, { ...partner, imagePath: "" }]), [partner]);
  const person = { id: "test", fullName: "Test Person", title: "Confirmed test role", biography: "Test biography", group: "team", approved: true };
  assert.deepEqual(approvedTeam([person, { ...person, approved: false }, { ...person, title: "" }, { ...person, biography: " " }]), [person]);
});

test("portrait initials work without generating an identity or a photograph", () => {
  assert.equal(initials("  Asha  Kumar "), "AK");
  assert.equal(initials("Asha"), "A");
  assert.equal(initials("Éva Martin"), "ÉM");
  assert.equal(initials(""), "");
});

test("optional contact links reject malformed or unrelated destinations", () => {
  assert.equal(linkedinUrl("https://www.linkedin.com/in/test-profile"), "https://www.linkedin.com/in/test-profile");
  assert.equal(linkedinUrl("https://linkedin.com.evil.example/in/test"), undefined);
  assert.equal(linkedinUrl("https://www.linkedin.com/company/test"), undefined);
  assert.equal(phoneHref("+91 (99999) 99999"), "tel:+919999999999");
  assert.equal(phoneHref("javascript:alert(1)"), undefined);
  assert.equal(emailHref("test@example.com"), "mailto:test@example.com");
  assert.equal(emailHref("test@example.com?bcc=someone@example.com"), undefined);
});

test("home and team routes support deep links and trailing slashes", () => {
  assert.equal(pageFromPath("/"), "home");
  assert.equal(pageFromPath("/team"), "team");
  assert.equal(pageFromPath("/team/"), "team");
  assert.equal(pageFromPath("/team/unknown"), "not-found");
});
