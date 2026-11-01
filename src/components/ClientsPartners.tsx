import { useState } from "react";
import { partners, relationshipLabels, type Partner, type RelationshipType } from "../data/partners";
import { approvedPartners, partnerWebsite } from "../lib/content";
import { useReveal } from "../hooks/useReveal";
import Icon from "./Icon";

function PartnerLogo({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false);
  const website = partnerWebsite(partner);
  const content = <>
    <div className="partner-logo-frame">
      {failed ? <span className="logo-unavailable">Logo pending</span> : (
        <img src={partner.imagePath} alt={`${partner.name} logo`} width="240" height="120" loading="lazy" decoding="async" onError={() => setFailed(true)} />
      )}
    </div>
    {partner.showName !== false && <span className="partner-name">{partner.name}</span>}
    {website && <span className="partner-external" aria-hidden="true"><Icon name="arrow-up" size={16} /></span>}
  </>;
  return <li className="partner-card reveal-item" data-reveal>
    {website ? <a href={website} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${partner.name} website (opens in a new tab)`}>{content}</a> : <div>{content}</div>}
  </li>;
}

export default function ClientsPartners({ entries = partners }: { entries?: Partner[] } = {}) {
  const root = useReveal();
  const approved = approvedPartners(entries);
  const categories = (Object.keys(relationshipLabels) as RelationshipType[])
    .filter(type => approved.some(partner => partner.relationship === type));

  return <section className="section section-relationships" id="relationships" aria-labelledby="relationships-title">
    <div className="container" ref={root}>
      <div className="section-header relationships-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-slashes" aria-hidden="true">//</span> BUILDING TOGETHER</div>
          <h2 id="relationships-title">Trusted <em>Relationships</em></h2>
          <p className="relationships-subtitle">Our Clients &amp; Partners</p>
        </div>
        <p className="relationships-intro">Strong relationships begin with shared purpose, clear communication and respect for the work.</p>
      </div>
      {approved.length ? categories.map(type => (
        <div className="relationship-group" key={type}>
          <h3 className="relationship-category">{relationshipLabels[type]}</h3>
          <ul className="partners-grid">{approved.filter(partner => partner.relationship === type).map(partner => <PartnerLogo key={partner.id} partner={partner} />)}</ul>
        </div>
      )) : <>
        <p className="development-note"><span aria-hidden="true">+</span> DEVELOPMENT PREVIEW · Approved company names and logos pending</p>
        <ul className="partners-grid partners-grid--pending" aria-label="Development layout placeholders, not confirmed relationships">
          {(["client", "client", "strategic-partner", "strategic-partner", "associate", "associate"] as RelationshipType[]).map((type, index) => (
            <li className="partner-card partner-card--pending reveal-item" data-reveal key={index}>
              <span className="partner-placeholder-label">{relationshipLabels[type]}</span>
              <div className="partner-logo-frame"><span className="partner-placeholder-mark" aria-hidden="true">+</span><span>Approved logo pending</span></div>
              <span className="partner-name">Development placeholder</span>
            </li>
          ))}
        </ul>
      </>}
      <div className="relationships-footer"><span>SHARED PURPOSE. LASTING VALUE.</span><a className="text-link" href="/#contact">Start a conversation <Icon name="arrow" size={18} /></a></div>
    </div>
  </section>;
}
