import { useEffect, useRef, useState, type FormEvent } from "react";
import Icon from "./components/Icon";
import BrandMark from "./components/BrandMark";
import ClientsPartners from "./components/ClientsPartners";
import CompanyProfileDownload from "./components/CompanyProfileDownload";
import SocialLinks from "./components/SocialLinks";
import FooterConstruction from "./components/FooterConstruction";
import { phoneHref } from "./lib/content";
import TeamPage from "./pages/TeamPage";
import { approvedAssets } from "./data/assets";
import {
  navigation,
  pageFromPath,
  pageMetadata,
  type Page,
} from "./navigation";
import { site, services, portfolioSlots } from "./content";

function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const header = useRef<HTMLElement>(null);
  const nav = useRef<HTMLElement>(null);
  const menu = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (page !== "home" || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
    );
    navigation
      .filter((item) => item.section !== "team")
      .forEach((item) => {
        const section = document.getElementById(item.section);
        if (section) observer.observe(section);
      });
    return () => observer.disconnect();
  }, [page]);

  useEffect(() => {
    if (!open) return;
    nav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menu.current?.focus();
      }
      if (event.key !== "Tab") return;
      const links = Array.from(
        nav.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
      );
      const first = links[0];
      const last = menu.current;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    function closeOutside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 981px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>CIVIL CONSTRUCTION &amp; INFRASTRUCTURE</span>
          <span className="utility-right">
            ENGINEERING PROGRESS. BUILDING TRUST.
            <span className="utility-line" />
          </span>
        </div>
      </div>
      <header className="site-header" ref={header}>
        <div className="container header-inner">
          <BrandMark />
          <nav
            className={`primary-nav ${open ? "primary-nav--open" : ""}`}
            id="primary-navigation"
            aria-label="Primary navigation"
            ref={nav}
          >
            {navigation.map((item) => {
              const current =
                item.section === "team"
                  ? page === "team"
                  : page === "home" && activeSection === item.section;
              return (
                <a
                  href={item.href}
                  key={item.href}
                  aria-current={
                    current
                      ? item.section === "team" || item.section === "home"
                        ? "page"
                        : "location"
                      : undefined
                  }
                  onClick={() => {
                    setOpen(false);
                    if (item.section !== "team") setActiveSection(item.section);
                  }}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="/#contact"
              className="mobile-contact"
              onClick={() => setOpen(false)}
            >
              Let's Talk <Icon name="arrow-up" size={16} />
            </a>
          </nav>
          <a className="button button--dark header-cta" href="/#contact">
            Let's Talk <Icon name="arrow-up" size={16} />
          </a>
          <button
            ref={menu}
            type="button"
            className="menu-button"
            aria-controls="primary-navigation"
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} size={25} />
          </button>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="eyebrow-line" /> BUILDING WHAT'S NEXT
          </div>
          <h1 id="hero-title">
            Built on <em>purpose.</em>
            <br />
            Engineered for <em>progress.</em>
          </h1>
          <p>
            Thoughtful civil construction and infrastructure solutions — built
            around the details that shape better spaces and stronger
            foundations.
          </p>
          <div className="hero-actions">
            <a className="button button--orange" href="#expertise">
              Explore Our Expertise <Icon name="arrow-up" size={18} />
            </a>
            <a className="text-link hero-link" href="#about">
              Discover Taashi <Icon name="arrow" size={19} />
            </a>
          </div>
          <div className="hero-bottom">
            <span className="hero-bottom-line" />
            <span>STRUCTURE / STRENGTH / PROGRESS</span>
          </div>
        </div>
        <div className="hero-art">
          <img
            src="/images/hero-structure.svg"
            alt="Conceptual architectural illustration of civil construction, beams, and a crane"
          />
          <span className="hero-art-index">01 / TAASHI ENGINEERING</span>
          <div className="hero-art-label">
            <span className="label-plus">+</span>
            <span>
              FOUNDATIONS FOR
              <br />
              WHAT'S NEXT
            </span>
          </div>
        </div>
      </div>
      <div className="hero-ticker">
        <div className="container ticker-inner">
          <span>ENGINEERING-LED THINKING</span>
          <span className="ticker-star">✳</span>
          <span>BUILT WITH PURPOSE</span>
          <span className="ticker-star">✳</span>
          <span>INFRASTRUCTURE-FOCUSED</span>
          <span className="ticker-star">✳</span>
          <span>DETAILS THAT MATTER</span>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section
      className="section section-about"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="container">
        <div className="about-topline">
          <div className="eyebrow">
            <span className="eyebrow-slashes" aria-hidden="true">
              //
            </span>{" "}
            WHO WE ARE
          </div>
          <span className="about-location">
            EST. 2021 <span aria-hidden="true">&middot;</span> INDIA
          </span>
        </div>
        <div className="about-layout">
          <h2 id="about-title" className="about-title">
            More than
            <br />
            structures.
            <br />
            <em>What comes next.</em>
          </h2>
          <div className="about-story">
            <p className="about-lead">
              Good engineering creates the foundation for meaningful progress.
            </p>
            <p className="about-description">
              At Taashi Engineering, our focus is civil construction and
              infrastructure. We bring a clear vision, responsible planning and
              respect for the work itself to the spaces that shape our future.
            </p>
            <a className="about-cta" href="#approach">
              <span>Explore our approach</span>
              <Icon name="arrow-up" size={20} />
            </a>
            <CompanyProfileDownload />
          </div>
        </div>
        <div className="about-principles" aria-label="Our guiding principles">
          <div className="about-principle">
            <span className="about-number">01</span>
            <div>
              <h3>Clear vision.</h3>
              <p>Purpose at every step.</p>
            </div>
          </div>
          <div className="about-principle">
            <span className="about-number">02</span>
            <div>
              <h3>Responsible planning.</h3>
              <p>Thought behind every detail.</p>
            </div>
          </div>
          <div className="about-principle">
            <span className="about-number">03</span>
            <div>
              <h3>Respect for the work.</h3>
              <p>Care in everything we build.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="section section-services" id="expertise">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-slashes" aria-hidden="true">
                //
              </span>
              WHAT WE DO
            </div>
            <h2>
              Built to make
              <br />
              <em>a difference.</em>
            </h2>
          </div>
          <div className="section-side">
            <p>
              From the ground beneath us to the structures above — explore the
              areas where thoughtful construction creates lasting value.
            </p>
            <span className="content-warning">
              Draft service categories · Confirm with Taashi
            </span>
          </div>
        </div>
        <div className="service-grid">
          {services.map((s) => (
            <article className="service-card" key={s.number}>
              <div className="service-top">
                <span>{s.number} / EXPERTISE</span>
                <span className="service-icon">
                  <Icon name={s.icon} size={29} />
                </span>
              </div>
              <div className="service-details">
                <h3>{s.title}</h3>
                <p className="service-short">{s.short}</p>
                <p className="service-description">{s.description}</p>
              </div>
              <a
                href="#contact"
                className="service-action"
                aria-label={`Enquire about ${s.title}`}
              >
                <span>Enquire about this service</span>
                <Icon name="arrow-up" size={20} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="statement">
      <div className="container statement-inner">
        <div className="statement-kicker">
          A STRONG FOUNDATION CHANGES EVERYTHING
        </div>
        <div className="statement-big">
          WE DON'T JUST <span>BUILD.</span>
          <br />
          WE HELP CREATE
          <br />
          <span>WHAT'S NEXT.</span>
        </div>
        <div className="statement-footer">
          <div className="plus-mark">+</div>
          <p>
            Practical thinking. Clear intent.
            <br />A commitment to sound construction.
          </p>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Buildings", "Infrastructure", "Civil Works"];
  const shown =
    filter === "All"
      ? portfolioSlots
      : portfolioSlots.filter((p) => p.category === filter);
  return (
    <section className="section section-projects" id="projects">
      <div className="container">
        <div className="section-header projects-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" /> OUR WORK
            </div>
            <h2>
              Progress you
              <br />
              <em>can see.</em>
            </h2>
          </div>
          <div className="section-side">
            <p>
              The best way to understand our work is to see it. This gallery is
              ready for Taashi's approved project photographs and case studies.
            </p>
            <span className="content-warning">
              Portfolio placeholders — no completed projects claimed
            </span>
          </div>
        </div>
        <div
          className="filter-row"
          aria-label="Project category filter"
          data-project-filters
        >
          {filters.map((f) => (
            <button
              key={f}
              data-project-filter={f}
              type="button"
              className={`filter-btn ${filter === f ? "filter-btn--active" : ""}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
              {filter === f ? <span>↗</span> : null}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {shown.map((p) => (
            <article
              className="project-card"
              key={p.id}
              data-project-category={p.category}
            >
              <div className="project-image">
                <img
                  src={p.image}
                  alt={`Illustrative ${p.category.toLowerCase()} construction graphic; not a Taashi project photograph`}
                  loading="lazy"
                />
                <span className="project-demo">
                  ILLUSTRATIVE / REPLACE WITH REAL PROJECT
                </span>
              </div>
              <div className="project-meta">
                <span>
                  {p.category.toUpperCase()} / SLOT {p.id}
                </span>
                <Icon name="arrow-up" size={22} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.subtitle}</p>
            </article>
          ))}
        </div>
        <div className="projects-footnote">
          <span>YOUR WORK DESERVES A STRONG SHOWCASE.</span>
          <a className="text-link" href="#contact">
            Discuss your project <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    {
      n: "01",
      title: "Understand",
      descr:
        "Start with the purpose, technical requirements and constraints of the work.",
    },
    {
      n: "02",
      title: "Plan",
      descr:
        "Define the scope, sequence and resources needed for responsible execution.",
    },
    {
      n: "03",
      title: "Build",
      descr:
        "Translate plans into coordinated on-site activity and construction progress.",
    },
    {
      n: "04",
      title: "Deliver",
      descr: "Focus on completion, documentation and a clear project handover.",
    },
  ];
  return (
    <section className="section section-approach" id="approach">
      <div className="container approach-grid">
        <div className="approach-side">
          <div className="eyebrow">
            <span className="eyebrow-line" /> OUR THINKING
          </div>
          <h2>
            Every great build
            <br />
            begins with <em>clarity.</em>
          </h2>
          <p>
            A proposed four-stage approach to presenting project execution.
            Tailor the final description to Taashi's actual processes.
          </p>
          <div className="architect-stamp">
            T<span>+</span>
          </div>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <div className="step" key={step.n}>
              <div className="step-num">{step.n}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.descr}</p>
              </div>
              <Icon name="arrow-up" size={20} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const phone = phoneHref(site.phone);
  const [status, setStatus] = useState("");
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const type = String(data.get("projectType") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setStatus("Please complete all required fields.");
      return;
    }
    const subject = encodeURIComponent(
      `Website project enquiry — ${type || "Civil construction"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${type}\n\nMessage:\n${message}`,
    );
    setStatus(
      "Your email application should open with a pre-filled message. This demo website does not send or store enquiries itself.",
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }
  return (
    <section className="section section-contact" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> LET'S CONNECT
          </div>
          <h2>
            Let's build
            <br />
            <em>something better.</em>
          </h2>
          <p>
            Planning a civil construction or infrastructure project? Start a
            conversation about what you need.
          </p>
          <div className="contact-detail">
            <span className="detail-icon">
              <Icon name="mail" size={20} />
            </span>
            <div>
              <span>EMAIL </span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
          <div className="contact-detail">
            <span className="detail-icon">
              <Icon name="pin" size={20} />
            </span>
            <div>
              <span> </span>
              <p>{site.registeredOffice}</p>
            </div>
          </div>
          <div className="contact-detail">
            <span className="detail-icon">
              <Icon name="phone" size={20} />
            </span>
            <div>
              <span>CALL US</span>
              {phone ? (
                <a href={phone}>{site.phone}</a>
              ) : (
                <p className="contact-pending">Contact number pending</p>
              )}
            </div>
          </div>
          <SocialLinks />
        </div>
        <div className="contact-form-card">
          <div className="form-heading">
            <span>PROJECT ENQUIRY</span>
            <span>01 / 04</span>
          </div>
          <h3>
            Tell us about
            <br />
            your project.
          </h3>
          <form
            id="project-enquiry"
            data-recipient={site.email}
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <label>
                YOUR NAME *
                <input
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Full name"
                />
              </label>
              <label>
                EMAIL ADDRESS *
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <label>
              PROJECT TYPE
              <select name="projectType" defaultValue="">
                <option value="">Select a category</option>
                <option>Civil construction</option>
                <option>Infrastructure</option>
                <option>Other / Not sure</option>
              </select>
            </label>
            <label>
              PROJECT DETAILS *
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell us what you're planning…"
              />
            </label>
            <button className="button button--orange form-button" type="submit">
              Prepare Email Enquiry <Icon name="arrow-up" size={19} />
            </button>
            {status && (
              <p className="form-status" role="status">
                {status}
              </p>
            )}
            <p className="form-disclaimer">
              Demo mode: opens your email application. No server-side submission
              is configured.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer({ page }: { page: Page }) {
  const phone = phoneHref(site.phone);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <BrandMark light />
            <p>
              Civil construction & infrastructure.
              <br />
              Built on purpose. Focused on progress.
            </p>
            <FooterConstruction />
          </div>
          <nav className="footer-links footer-explore" aria-label="Footer navigation">
            <span>EXPLORE</span>
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={
                  page === "team" && item.section === "team"
                    ? "page"
                    : undefined
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="footer-links">
            <span>GET IN TOUCH</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p>Ghaziabad, Uttar Pradesh, India</p>
            {phone ? (
              <a className="footer-phone" href={phone}>
                <Icon name="phone" size={15} />
                <span>{site.phone}</span>
              </a>
            ) : (
              <p className="footer-phone contact-pending">
                <Icon name="phone" size={15} />
                <span>Contact number pending</span>
              </p>
            )}
            <p>CIN: {site.companyCIN}</p>
            <SocialLinks footer />
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </span>
          <span> </span>
          <a href={page === "home" ? "#home" : "#page-top"}>BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}

function SiteMetadata({ page }: { page: Page }) {
  useEffect(() => {
    document.title = pageMetadata[page].title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", pageMetadata[page].description);
    const favicon = approvedAssets.favicon ?? approvedAssets.standaloneIcon;
    if (favicon) {
      const icon = document.querySelector('link[rel="icon"]');
      icon?.setAttribute("href", favicon);
      icon?.removeAttribute("type");
    }
  }, [page]);
  return null;
}

export default function App({ page: requestedPage }: { page?: Page } = {}) {
  const page =
    requestedPage ??
    pageFromPath(
      typeof window === "undefined" ? "/" : window.location.pathname,
    );
  return (
    <div id="page-top">
      <SiteMetadata page={page} />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header page={page} />
      <main id="main-content" tabIndex={-1}>
        {page === "home" ? (
          <>
            <Hero />
            <Intro />
            <Expertise />
            <Statement />
            <Projects />
            <ClientsPartners />
            <Approach />
            <Contact />
          </>
        ) : page === "team" ? (
          <TeamPage />
        ) : (
          <section className="section not-found">
            <div className="container">
              <div className="eyebrow">404 / PAGE NOT FOUND</div>
              <h1>
                Let's get you
                <br />
                back on track.
              </h1>
              <a className="button button--dark" href="/">
                Return home <Icon name="arrow" />
              </a>
            </div>
          </section>
        )}
      </main>
      <Footer page={page} />
    </div>
  );
}
