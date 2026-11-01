import { teamMembers } from "../data/team";
import { approvedTeam } from "../lib/content";
import { useReveal } from "../hooks/useReveal";
import ProfileCard, { PendingProfile } from "../components/ProfileCard";
import Icon from "../components/Icon";

export default function TeamPage() {
  const root = useReveal();
  const members = approvedTeam(teamMembers);
  const leadership = members.filter(member => member.group === "leadership");
  const team = members.filter(member => member.group === "team");
  return <div ref={root}>
    <section className="team-hero" aria-labelledby="team-title">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Our Team</span></nav>
        <div className="team-hero-grid">
          <div>
            <div className="eyebrow hero-eyebrow"><span className="eyebrow-slashes" aria-hidden="true">//</span> LEADERSHIP &amp; TEAM</div>
            <h1 id="team-title">The People Behind<br />Our <em>Progress.</em></h1>
          </div>
          <div className="team-hero-side"><span className="team-plus" aria-hidden="true">+</span><p>Clear thinking. Shared purpose.<br />A human foundation for every build.</p><a className="text-link" href="#leadership">Meet our people <Icon name="arrow" size={18} /></a></div>
        </div>
        <div className="team-hero-foot"><span>PEOPLE / PURPOSE / PROGRESS</span><span>TAASHI ENGINEERING</span></div>
      </div>
    </section>
    <section className="section section-leadership" id="leadership" aria-labelledby="leadership-title">
      <div className="container">
        <div className="section-header team-section-heading"><div><div className="eyebrow"><span className="eyebrow-slashes" aria-hidden="true">//</span> OUR LEADERSHIP</div><h2 id="leadership-title">Direction with <em>purpose.</em></h2></div><p>Meet the people guiding our work, our relationships and the road ahead.</p></div>
        {!leadership.length && <p className="development-note"><span aria-hidden="true">+</span> DEVELOPMENT PREVIEW · Leadership profiles await approval. Layout samples do not represent confirmed appointments.</p>}
        <div className="leadership-grid">{leadership.length ? leadership.map(member => <ProfileCard member={member} key={member.id} />) : <><PendingProfile leadership /><PendingProfile leadership /></>}</div>
      </div>
    </section>
    <section className="section section-people" id="people" aria-labelledby="people-title">
      <div className="container">
        <div className="section-header team-section-heading"><div><div className="eyebrow"><span className="eyebrow-slashes" aria-hidden="true">//</span> OUR TEAM</div><h2 id="people-title">Every detail.<br /><em>A shared commitment.</em></h2></div><p>The people who bring thoughtful planning and care to the work itself.</p></div>
        {!team.length && <p className="development-note"><span aria-hidden="true">+</span> DEVELOPMENT PREVIEW · Confirmed team members, roles and photographs pending.</p>}
        <div className="people-grid">{team.length ? team.map(member => <ProfileCard member={member} key={member.id} />) : <><PendingProfile /><PendingProfile /><PendingProfile /></>}</div>
      </div>
    </section>
    <section className="team-contact" aria-labelledby="team-contact-title"><div className="container team-contact-inner"><div><div className="eyebrow hero-eyebrow"><span className="eyebrow-slashes" aria-hidden="true">//</span> LET'S CONNECT</div><h2 id="team-contact-title">Start with a <em>conversation.</em></h2><p>Tell us about your civil construction or infrastructure project.</p></div><a className="button button--orange" href="/#contact">Get in touch <Icon name="arrow-up" size={20} /></a></div></section>
  </div>;
}
