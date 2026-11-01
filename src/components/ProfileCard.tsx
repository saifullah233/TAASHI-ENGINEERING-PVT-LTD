import { useState } from "react";
import type { TeamMember } from "../data/team";
import { emailHref, initials, linkedinUrl, phoneHref } from "../lib/content";
import Icon from "./Icon";

export default function ProfileCard({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);
  const phone = phoneHref(member.phone);
  const email = emailHref(member.email);
  const linkedin = linkedinUrl(member.linkedin);
  return <article className={`person-card reveal-item ${member.group === "leadership" ? "person-card--leadership" : ""}`} data-reveal>
    <div className="person-portrait">
      {member.imagePath && !failed ? <img src={member.imagePath} alt={`${member.fullName}, ${member.title}`} width="600" height="600" loading="lazy" decoding="async" onError={() => setFailed(true)} /> : (
        <div className="person-initials" role="img" aria-label={`Initials for ${member.fullName}; photograph unavailable`}><span>{initials(member.fullName)}</span></div>
      )}
    </div>
    <div className="person-info">
      <p className="person-role">{member.title}</p>
      <h3>{member.fullName}</h3>
      <p className="person-bio">{member.biography}</p>
      {(phone || email || linkedin) && <div className="person-links" aria-label={`Contact ${member.fullName}`}>
        {phone && <a href={phone}><Icon name="phone" size={16} /><span>{member.phone}</span></a>}
        {email && <a href={email}><Icon name="mail" size={16} /><span>{member.email}</span></a>}
        {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Icon name="arrow-up" size={15} /><span className="sr-only"> (opens in a new tab)</span></a>}
      </div>}
    </div>
  </article>;
}

export function PendingProfile({ leadership = false }: { leadership?: boolean }) {
  return <article className={`person-card person-card--pending reveal-item ${leadership ? "person-card--leadership" : ""}`} data-reveal aria-label="Development profile placeholder, not an actual employee">
    <div className="person-portrait"><div className="person-initials person-initials--pending" aria-hidden="true"><span>+</span><small>PROFILE PENDING</small></div></div>
    <div className="person-info">
      <p className="person-role">DEVELOPMENT PLACEHOLDER</p>
      <h3>{leadership ? "Leadership profile" : "Team profile"}</h3>
      <p className="person-bio">{leadership ? "Approved name, operational title and biography will appear here." : "Confirmed name, role and biography will appear here."}</p>
      <span className="person-pending-note">Awaiting approved profile</span>
    </div>
  </article>;
}
