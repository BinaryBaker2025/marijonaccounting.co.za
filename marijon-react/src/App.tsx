import { useEffect, useMemo, useState } from "react";

type Service = {
  tag: string;
  title: string;
  body: string;
};

type TeamMember = {
  name: string;
  role: string;
};

const services: Service[] = [
  {
    tag: "Core",
    title: "Monthly Bookkeeping",
    body: "Accurate monthly records, reconciliations, and reporting to support better business decisions.",
  },
  {
    tag: "Compliance",
    title: "Income Tax and SARS Compliance",
    body: "Structured tax support to keep filings current and reduce compliance pressure.",
  },
  {
    tag: "Compliance",
    title: "VAT Returns",
    body: "VAT registration, preparation, and submission support with practical turnaround.",
  },
  {
    tag: "Operations",
    title: "Payroll Solutions",
    body: "Reliable payroll processing and statutory compliance support for your team.",
  },
  {
    tag: "Business Setup",
    title: "Company Registrations and CIPC",
    body: "Entity setup and ongoing CIPC submissions for new and growing businesses.",
  },
  {
    tag: "Reporting",
    title: "Annual Financial Statements",
    body: "Professional year-end financial statements prepared for compliance and confidence.",
  },
];

const team: TeamMember[] = [
  { name: "Marie Viljoen", role: "Founder and CA(SA)" },
  { name: "Reynard Viljoen", role: "Client Services" },
  { name: "Angelo Aliveriotis", role: "Accounting Support" },
  { name: "Mario Boshoff", role: "Accounting Support" },
  { name: "Nicole Botha", role: "Compliance Support" },
  { name: "Johnny Fitzsimons", role: "Client Services" },
  { name: "Ernst Volschenk", role: "Payroll and Operations" },
  { name: "Ulani Erasmus", role: "Client Services" },
];

const insights = [
  "Key SARS Deadlines for South African Businesses",
  "VAT Mistakes That Trigger Penalties",
  "Payroll Compliance Checklist for Employers",
];

function ServiceTagIcon({ tag }: { tag: string }) {
  const iconByTag: Record<string, JSX.Element> = {
    Core: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="13" y2="16" />
      </svg>
    ),
    Compliance: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l7 3v6c0 5-3.2 7.8-7 9-3.8-1.2-7-4-7-9V6l7-3z" />
        <path d="M9 12.5l2 2 4-4" />
      </svg>
    ),
    Operations: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M19 12a7 7 0 0 0-.1-1l2-1.4-2-3.4-2.4 1a7.2 7.2 0 0 0-1.7-1L14.4 3h-4.8l-.4 2.2a7.2 7.2 0 0 0-1.7 1l-2.4-1-2 3.4L5 11a7 7 0 0 0 0 2l-2 1.4 2 3.4 2.4-1a7.2 7.2 0 0 0 1.7 1l.4 2.2h4.8l.4-2.2a7.2 7.2 0 0 0 1.7-1l2.4 1 2-3.4-2.1-1.4c.1-.3.1-.7.1-1z" />
      </svg>
    ),
    "Business Setup": (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 21h18" />
        <path d="M6 21V8l6-4 6 4v13" />
        <path d="M9 12h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2z" />
      </svg>
    ),
    Reporting: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20V4" />
        <path d="M4 20h16" />
        <path d="M7 15l3-3 3 2 4-5" />
        <circle cx="7" cy="15" r="1" />
        <circle cx="10" cy="12" r="1" />
        <circle cx="13" cy="14" r="1" />
        <circle cx="17" cy="9" r="1" />
      </svg>
    ),
  };

  return <span className="icon-tag">{iconByTag[tag] ?? iconByTag.Core}</span>;
}

function ServiceItemIcon({ index }: { index: number }) {
  const icons: JSX.Element[] = [
    (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3h9l3 3v15H6z" />
        <path d="M15 3v4h4M9 13l2 2 4-4" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M8 9h8M8 13h8M8 17h5" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="M8 3v3M16 3v3M4 10h16" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 21h18" />
        <path d="M6 21V7h12v14M9 11h2M13 11h2M9 15h2M13 15h2" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4v8h8" />
        <path d="M20 12A8 8 0 1 1 12 4" />
      </svg>
    ),
  ];

  return <span className="icon-item">{icons[index % icons.length]}</span>;
}

function DecorativeTile({ label, tone = "light" }: { label: string; tone?: "light" | "warm" | "deep" }) {
  return (
    <div className={`tile tile-${tone}`} role="img" aria-label={label}>
      <svg viewBox="0 0 240 140" aria-hidden="true">
        <rect x="0" y="0" width="240" height="140" rx="16" />
        <circle cx="42" cy="36" r="18" />
        <path d="M24 98c22-24 46-29 72-14 14 8 28 8 42 0 24-14 50-10 78 14" />
        <path d="M16 120h210" />
      </svg>
      <span>{label}</span>
    </div>
  );
}

function ComplianceDeadlinesPanel() {
  const rows = [
    { cycle: "Monthly", item: "Bookkeeping Close", target: "Day 1-5" },
    { cycle: "VAT Cycle", item: "VAT Reconciliation", target: "Before SARS cut-off" },
    { cycle: "Payroll", item: "PAYE / UIF Checks", target: "Before payroll run" },
    { cycle: "Annual", item: "Financial Statements", target: "Year-end reporting window" },
  ];

  return (
    <article className="info-card" aria-label="Compliance schedule matrix">
      <h3>Compliance Schedule</h3>
      <p>Simple visibility on recurring obligations and reporting windows.</p>
      <div className="deadline-list" role="list">
        {rows.map((row) => (
          <div key={row.item} className="deadline-row" role="listitem">
            <span>{row.cycle}</span>
            <span>{row.item}</span>
            <span>{row.target}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ServiceWorkflowPanel() {
  const steps = [
    { title: "Initial Review", body: "Understand your current structure and urgent compliance needs." },
    { title: "Setup and Align", body: "Confirm systems, filing dates, payroll flow, and reporting format." },
    { title: "Monthly Execution", body: "Run bookkeeping, tax, and payroll cycles with clear checkpoints." },
    { title: "Quarterly / Annual", body: "Consolidate reports and ensure year-end readiness." },
  ];

  return (
    <article className="info-card" aria-label="Client onboarding and service workflow">
      <h3>Service Workflow</h3>
      <p>How client work is structured for consistency and predictable delivery.</p>
      <ol className="workflow-list">
        {steps.map((step) => (
          <li key={step.title}>
            <h4>{step.title}</h4>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}

function ServicesSpotlight() {
  return (
    <section className="services-spotlight" aria-label="Service trust highlights">
      <div className="spotlight-copy">
        <p className="eyebrow">Trusted Delivery</p>
        <h3>Why businesses choose Marijon Accounting</h3>
        <p>
          CA(SA)-led oversight, practical turnaround, and structured compliance support across
          bookkeeping, tax, VAT, payroll, and reporting.
        </p>
        <div className="spotlight-metrics" role="list" aria-label="Trust metrics">
          <div role="listitem">
            <strong>500+</strong>
            <span>Entities supported</span>
          </div>
          <div role="listitem">
            <strong>20+</strong>
            <span>Years in practice</span>
          </div>
          <div role="listitem">
            <strong>2</strong>
            <span>Regional hubs</span>
          </div>
        </div>
      </div>

      <div className="cert-card" role="img" aria-label="Certified professional support visual">
        <svg viewBox="0 0 180 180" aria-hidden="true">
          <defs>
            <linearGradient id="certGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f06a58" />
              <stop offset="100%" stopColor="#d74635" />
            </linearGradient>
          </defs>
          <circle cx="90" cy="90" r="56" fill="none" stroke="url(#certGrad)" strokeWidth="10" />
          <circle cx="90" cy="90" r="38" fill="none" stroke="#f5b8af" strokeWidth="4" />
          <path d="M78 91l8 8 16-16" fill="none" stroke="#1d2c43" strokeWidth="6" strokeLinecap="round" />
          <path d="M62 136l-8 24 23-8m50-16l8 24-23-8" fill="none" stroke="#f06a58" strokeWidth="6" />
        </svg>
        <div className="cert-label">
          <span>Certified-Standard</span>
          <strong>Professional Accounting Support</strong>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "AccountingService",
      name: "Marijon Accounting (Pty) Ltd",
      url: "https://marijonaccounting.co.za/",
      foundingDate: "2004",
      areaServed: ["Vereeniging", "Vaal Triangle", "Alberton", "Johannesburg", "Gauteng"],
      description:
        "Accounting, bookkeeping, tax, VAT, payroll and compliance services in Gauteng.",
    }),
    [],
  );

  return (
    <div className="site">
      <header className="topbar">
        <div className="brand-wrap">
          <a className="brand" href="#home">
            <span className="brand-mark">MA</span>
            <span className="brand-text">
              Marijon
              <strong> Accounting</strong>
            </span>
          </a>
          <p className="top-meta">Established 2004 | 500+ client entities supported</p>
        </div>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#services" onClick={() => setMenuOpen(false)}>
            Services
          </a>
          <a href="#team" onClick={() => setMenuOpen(false)}>
            Team
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
          <a className="button button-small" href="#contact" onClick={() => setMenuOpen(false)}>
            Request a Quote
          </a>
        </nav>
      </header>

      <main className="page">
        <section id="home" className="hero reveal">
          <div className="hero-copy">
            <p className="eyebrow">Accounting and Tax Advisory</p>
            <h1>Financial clarity for businesses that need to move with confidence.</h1>
            <p className="lead">
              Marijon Accounting supports businesses across Vereeniging, the Vaal Triangle, and
              greater Johannesburg with bookkeeping, payroll, VAT, and SARS compliance.
            </p>
            <div className="hero-actions">
              <a className="button" href="#contact">
                Request a Quote
              </a>
              <a className="button button-outline" href="#services">
                View Services
              </a>
            </div>
            <div className="kpi-row" role="list" aria-label="Company highlights">
              <span role="listitem">
                <strong>2004</strong> Established
              </span>
              <span role="listitem">
                <strong>500+</strong> Client entities
              </span>
              <span role="listitem">
                <strong>2</strong> Regional hubs
              </span>
            </div>
          </div>

          <aside className="hero-aside">
            <p className="eyebrow">Why Clients Stay</p>
            <ul className="plain-list">
              <li>CA(SA)-led expertise</li>
              <li>One partner for accounting, tax, payroll, and compliance</li>
              <li>Support in Vereeniging and Alberton</li>
            </ul>
            <div className="hero-tiles">
              <DecorativeTile label="Advisory Session Graphic" tone="deep" />
              <DecorativeTile label="Compliance Workflow Graphic" />
            </div>
            <blockquote>
              Professional support with practical turnaround. Their team keeps our deadlines and
              compliance in order.
            </blockquote>
          </aside>
        </section>

        <section id="services" className="section reveal">
          <div className="section-intro">
            <p className="eyebrow">Services</p>
            <h2>End-to-end accounting and compliance support</h2>
          </div>

          <ServicesSpotlight />

          <div className="info-grid">
            <ComplianceDeadlinesPanel />
            <ServiceWorkflowPanel />
          </div>

          <div className="service-list">
            {services.map((service, index) => (
              <article key={service.title} className="service-item">
                <div className="service-head">
                  <div className="service-badge">
                    <ServiceTagIcon tag={service.tag} />
                    <span>{service.tag}</span>
                  </div>
                  <h3>{service.title}</h3>
                </div>

                <p>{service.body}</p>

                <div className="service-meta">
                  <ServiceItemIcon index={index} />
                  <span className="service-num">{String(index + 1).padStart(2, "0")}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section section-split reveal">
          <div className="about-story">
            <p className="eyebrow">About</p>
            <h2>From two clients to a trusted accounting partner across Gauteng</h2>
            <p>
              Marijon Accounting was established in Three Rivers, Vereeniging, in 2004. We now
              support more than 500 entities with additional presence through Reymar Financial
              Solutions in Alberton.
            </p>
            <p>
              Our approach combines professional rigor with practical business support so clients
              can stay compliant and make better financial decisions.
            </p>
          </div>
          <div className="about-panel">
            <DecorativeTile label="Founder Profile Graphic" tone="warm" />
            <h3>What You Can Expect</h3>
            <ul className="plain-list">
              <li>Clear communication and faster turnaround</li>
              <li>Consistent compliance support</li>
              <li>Accurate reporting for better decision-making</li>
              <li>Long-term partnership, not once-off support</li>
            </ul>
          </div>
        </section>

        <section id="team" className="section reveal">
          <div className="section-intro">
            <p className="eyebrow">Team</p>
            <h2>Experienced professionals behind every submission and report</h2>
          </div>

          <div className="team-grid">
            {team.map((member) => (
              <article key={member.name} className="team-card">
                <div className="team-avatar" aria-hidden>
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-subtle reveal">
          <div className="section-intro">
            <p className="eyebrow">Insights</p>
            <h2>Useful updates for owners and finance teams</h2>
          </div>

          <div className="insight-grid">
            {insights.map((post) => (
              <article key={post} className="insight-card">
                <DecorativeTile label="Insight Visual" />
                <h3>{post}</h3>
                <p>Short, practical guidance focused on action and compliance deadlines.</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact reveal">
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h2>Need support with accounting, tax, VAT, or payroll?</h2>
            <p>Tell us what you need and we will recommend the right next step.</p>
            <ul className="plain-list contact-points">
              <li>Three Rivers, Vereeniging, Gauteng</li>
              <li>Johannesburg support via Alberton</li>
              <li>Business-hours support for SMEs and established firms</li>
            </ul>
            <DecorativeTile label="Location Map Graphic" tone="deep" />
          </div>

          <form className="contact-form">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" />

            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" placeholder="you@business.co.za" />

            <label htmlFor="service">Service Needed</label>
            <select id="service" name="service" defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              <option>Bookkeeping</option>
              <option>Income Tax</option>
              <option>VAT</option>
              <option>Payroll</option>
              <option>Company Registration</option>
            </select>

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={4} placeholder="How can we help?" />

            <button className="button" type="button">
              Send Enquiry
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>Marijon Accounting (Pty) Ltd | Accounting and Tax Services</p>
        <p>Serving Vereeniging, Vaal Triangle, Alberton, and greater Johannesburg</p>
      </footer>

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </div>
  );
}

export default App;
