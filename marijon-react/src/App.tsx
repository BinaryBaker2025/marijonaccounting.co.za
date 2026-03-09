import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

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

const compliancePulse = [
  { month: "Jan", value: 42, deadline: false },
  { month: "Feb", value: 56, deadline: true },
  { month: "Mar", value: 48, deadline: false },
  { month: "Apr", value: 62, deadline: true },
  { month: "May", value: 46, deadline: false },
  { month: "Jun", value: 54, deadline: false },
  { month: "Jul", value: 66, deadline: true },
  { month: "Aug", value: 58, deadline: false },
  { month: "Sep", value: 52, deadline: false },
  { month: "Oct", value: 68, deadline: true },
  { month: "Nov", value: 50, deadline: false },
  { month: "Dec", value: 60, deadline: true },
];

const serviceMix = [
  { label: "Bookkeeping", value: 32 },
  { label: "Tax", value: 24 },
  { label: "VAT", value: 18 },
  { label: "Payroll", value: 16 },
  { label: "Reporting", value: 10 },
];

const mixColors = ["#2f4f75", "#3b678f", "#4f7da4", "#73a0b8", "#d4644f"];

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

function ComplianceLineChart() {
  const coords = compliancePulse.map((item, idx) => ({
    x: 26 + idx * 24,
    y: 122 - item.value,
    month: item.month,
  }));

  const linePoints = coords.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPoints = `${linePoints} ${coords[coords.length - 1].x},122 ${coords[0].x},122`;

  return (
    <svg
      className="mini-chart line-chart"
      viewBox="0 0 320 170"
      role="img"
      aria-label="Monthly compliance filing momentum trend"
    >
      <defs>
        <linearGradient id="lineArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(212,100,79,0.28)" />
          <stop offset="100%" stopColor="rgba(212,100,79,0.02)" />
        </linearGradient>
      </defs>

      <rect x="1" y="1" width="318" height="168" rx="16" className="chart-shell-bg" />
      <line x1="18" y1="122" x2="300" y2="122" className="chart-axis" />

      {Array.from({ length: 4 }).map((_, idx) => (
        <line key={idx} x1="18" y1={42 + idx * 20} x2="300" y2={42 + idx * 20} className="chart-grid" />
      ))}

      <polygon className="line-area" points={areaPoints} />
      <polyline className="trend-line" points={linePoints} />

      {coords.map((point, idx) => (
        <g key={point.month}>
          <circle className="trend-point" style={{ "--point-index": idx } as CSSProperties} cx={point.x} cy={point.y} r="3.7" />
          {idx % 2 === 0 ? (
            <text x={point.x} y="146" textAnchor="middle" className="chart-label">
              {point.month}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}

function ComplianceBarsChart() {
  return (
    <svg
      className="mini-chart compliance-chart"
      viewBox="0 0 320 170"
      role="img"
      aria-label="Compliance intensity by month with highlighted tax months"
    >
      <rect x="1" y="1" width="318" height="168" rx="16" className="chart-shell-bg" />
      <line x1="18" y1="122" x2="300" y2="122" className="chart-axis" />

      {compliancePulse.map((item, idx) => {
        const x = 15 + idx * 24;
        const barHeight = item.value;
        const y = 122 - barHeight;
        return (
          <g key={item.month}>
            <rect
              className={`pulse-bar ${item.deadline ? "is-deadline" : ""}`}
              style={{ "--bar-index": idx } as CSSProperties}
              x={x}
              y={y}
              width="14"
              height={barHeight}
              rx="5"
            />
            <text x={x + 7} y="146" textAnchor="middle" className="chart-label">
              {item.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function ServiceMixDonutChart() {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let cumulativeLength = 0;

  return (
    <svg
      className="mini-chart donut-chart"
      viewBox="0 0 320 170"
      role="img"
      aria-label="Typical service mix by category in donut chart"
    >
      <rect x="1" y="1" width="318" height="168" rx="16" className="chart-shell-bg" />

      <g transform="translate(20 0)">
        <circle cx="74" cy="86" r={radius} className="donut-track" />
        {serviceMix.map((item, idx) => {
          const segmentLength = (item.value / 100) * circumference;
          const segmentOffset = -cumulativeLength;
          cumulativeLength += segmentLength;

          return (
            <circle
              key={item.label}
              cx="74"
              cy="86"
              r={radius}
              className="donut-segment"
              style={
                {
                  stroke: mixColors[idx % mixColors.length],
                  strokeDasharray: `${segmentLength} ${circumference}`,
                  strokeDashoffset: segmentOffset,
                  "--segment-index": idx,
                } as CSSProperties
              }
            />
          );
        })}
        <text x="74" y="82" textAnchor="middle" className="donut-center-main">
          Service
        </text>
        <text x="74" y="98" textAnchor="middle" className="donut-center-sub">
          Mix
        </text>
      </g>

      <g transform="translate(145 36)" className="donut-legend" aria-hidden="true">
        {serviceMix.map((item, idx) => (
          <g key={item.label} transform={`translate(0 ${idx * 23})`}>
            <rect x="0" y="-8" width="10" height="10" rx="2" fill={mixColors[idx % mixColors.length]} />
            <text x="16" y="0" className="donut-legend-label">
              {item.label}
            </text>
            <text x="128" y="0" textAnchor="end" className="donut-legend-value">
              {item.value}%
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function DecorativeTile({ label, tone = "light" }: { label: string; tone?: "light" | "warm" | "deep" }) {
  return (
    <figure className={`tile tile-${tone}`} role="img" aria-label={label}>
      <svg viewBox="0 0 260 150" aria-hidden="true">
        <rect x="0" y="0" width="260" height="150" rx="18" />
        <path d="M20 116h220" />
        <path d="M24 102c24-28 46-35 68-24 20 10 37 11 52 2 24-14 51-10 92 22" />
        <path d="M30 82l24-16 22 10 36-28 24 11 34-22 26 18" />
        <circle cx="54" cy="54" r="10" />
        <circle cx="186" cy="44" r="8" />
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function ServicesSignalBoard() {
  return (
    <aside className="service-signal reveal reveal-left" aria-label="Services spotlight and performance visuals">
      <p className="eyebrow">Service Signal</p>
      <h3>Compliance confidence, backed by a repeatable process.</h3>
      <p>
        CA(SA)-led oversight, practical turnaround, and structured compliance support across
        bookkeeping, tax, VAT, payroll, and reporting.
      </p>

      <div className="signal-stats" role="list" aria-label="Service trust metrics">
        <article role="listitem" className="signal-card">
          <strong>500+</strong>
          <span>Entities supported</span>
        </article>
        <article role="listitem" className="signal-card">
          <strong>20+</strong>
          <span>Years in practice</span>
        </article>
        <article role="listitem" className="signal-card signal-card-wide">
          <strong>2 Hubs</strong>
          <span>Vereeniging and Alberton delivery footprint</span>
        </article>
      </div>

      <div className="chart-stack">
        <figure className="chart-panel chart-panel-wide">
          <figcaption>Filing Momentum</figcaption>
          <ComplianceLineChart />
        </figure>
        <figure className="chart-panel">
          <figcaption>Typical Service Mix</figcaption>
          <ServiceMixDonutChart />
        </figure>
        <figure className="chart-panel">
          <figcaption>Compliance Calendar Intensity</figcaption>
          <ComplianceBarsChart />
        </figure>
      </div>
    </aside>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!elements.length) return;

    elements.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index * 85, 510)}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
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
      { threshold: 0.18, rootMargin: "0px 0px -34px 0px" },
    );

    elements.forEach((element) => observer.observe(element));

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
      <header className="topbar reveal reveal-down">
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
          onClick={() => setMenuOpen((open) => !open)}
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
        <section id="home" className="hero reveal reveal-up">
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

          <aside className="hero-visual" aria-label="Professional accounting support illustration">
            <div className="hero-visual-art">
              <span className="hero-shape hero-shape-wash" aria-hidden />
              <span className="hero-shape hero-shape-stripe" aria-hidden />
              <span className="hero-shape hero-shape-ring" aria-hidden />
              <span className="hero-shape hero-shape-dots" aria-hidden />
              <img
                className="hero-image"
                src="/hero-accounting.jpg"
                alt="Professional reviewing financial documents on a laptop"
                loading="eager"
              />
            </div>

            <div className="hero-proof">
              <p className="eyebrow">Why Businesses Choose Us</p>
              <ul className="plain-list plain-list-tight">
                <li>CA(SA)-led expertise</li>
                <li>One partner for accounting, tax, payroll, and compliance</li>
                <li>Support in Vereeniging and Alberton</li>
              </ul>
              <div className="hero-proof-stats" role="list" aria-label="Trust indicators">
                <span role="listitem">
                  <strong>500+</strong> entities
                </span>
                <span role="listitem">
                  <strong>20+</strong> years
                </span>
              </div>
              <a className="button button-outline hero-panel-cta" href="#services">
                Explore Services
              </a>
            </div>
          </aside>
        </section>

        <section id="services" className="section section-services reveal">
          <div className="section-intro">
            <p className="eyebrow">Services</p>
            <h2>End-to-end accounting and compliance support</h2>
          </div>

          <div className="services-layout">
            <ServicesSignalBoard />

            <div className="service-list">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  className={`service-item reveal ${index % 2 === 0 ? "reveal-right" : "reveal-left"}`}
                  style={{ "--service-index": index } as CSSProperties}
                >
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
          </div>
        </section>

        <section id="about" className="section section-about reveal reveal-up">
          <div className="about-story reveal reveal-left">
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
          <div className="about-panel reveal reveal-right">
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

        <section id="team" className="section section-team reveal">
          <div className="section-intro">
            <p className="eyebrow">Team</p>
            <h2>Experienced professionals behind every submission and report</h2>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <article
                key={member.name}
                className="team-card reveal reveal-scale"
                style={{ "--card-index": index } as CSSProperties}
              >
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

        <section className="section section-subtle section-insights reveal">
          <div className="section-intro">
            <p className="eyebrow">Insights</p>
            <h2>Useful updates for owners and finance teams</h2>
          </div>

          <div className="insight-grid">
            {insights.map((post, index) => (
              <article
                key={post}
                className="insight-card reveal reveal-up"
                style={{ "--insight-index": index } as CSSProperties}
              >
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
