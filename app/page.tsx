import Link from "next/link";
import { HangingIdCard } from "@/components/hanging-id-card";
import { featuredNotes, highlights, profile } from "./portfolio-data";

const focusAreas = [
  "SQL validation pipelines",
  "Power BI and SSRS reporting",
  "Audit-ready accountability workflows",
  "Stakeholder-friendly dashboards",
];

const roleRibbon = [
  "Accountability Data Analyst",
  "Business Intelligence Reporting",
  "SQL Automation",
  "Data Validation",
];

export default function HomePage() {
  return (
    <main className="pageShell">
      <section className="heroBoard">
        <div className="heroCopy">
          <p className="eyebrow">Pinned Introduction</p>
          <h1>Data portfolio with the original blue glow, rebuilt around an interactive hanging ID card.</h1>
          <p className="leadText">{profile.summary}</p>
          <p className="supportText">
            I work on data validation, business intelligence reporting, and workflow automation.
            This home page gives the short version. Each note opens a separate page for the full details.
          </p>
          <div className="heroActions">
            <Link className="primaryAction" href="/projects">
              View Projects
            </Link>
            <Link className="secondaryAction" href="/contact">
              Contact Me
            </Link>
          </div>
          <div className="focusStrip" aria-label="Focus areas">
            {(focusAreas as any).map((item: string) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="roleRibbon" aria-label="Role ribbon">
            {(roleRibbon as any).map((item: string) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="highlightRow">
            {(highlights as any).map((item: { label: string; value: string; note: string }) => (
              <article key={item.label} className="miniNote">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <small>{item.note}</small>
              </article>
            ))}
          </div>
        </div>
        <HangingIdCard />
      </section>

      <section className="sectionBlock">
        <div className="sectionIntro">
          <p className="eyebrow">Quick Look</p>
          <h2>Basic details about me and my work.</h2>
          <p className="supportText">
            I currently focus on clean data pipelines, audit-ready reporting, and dashboards that help leadership move faster.
          </p>
        </div>
        <div className="noteGrid">
          {(featuredNotes as any).map((note: { href: string; title: string; text: string; color: string }) => (
            <Link key={note.href} href={note.href} className={`stickyNote ${note.color}`}>
              <div className="noteHeader">
                <span className="notePin" />
                <h3>{note.title}</h3>
              </div>
              <p>{note.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="storyBoard">
        <article className="boardPanel paperPanel">
          <p className="eyebrow">How I Work</p>
          <h2>Reliable data first, polished reporting second.</h2>
          <p className="supportText">
            The goal is not just analysis. It is trustworthy data, fast reporting cycles, and clear outputs
            that leadership can use without decoding the logic behind them.
          </p>
          <div className="workflowSteps">
            <div>
              <span>01</span>
              <p>Validate source data and reduce downstream noise.</p>
            </div>
            <div>
              <span>02</span>
              <p>Automate repetitive checks and reporting paths.</p>
            </div>
            <div>
              <span>03</span>
              <p>Present results in dashboards and reporting views that are easy to act on.</p>
            </div>
          </div>
        </article>

        <article className="stickyNote noteBlue tapeNote roleSnapshot">
          <div className="noteHeader">
            <span className="notePin" />
            <h3>Current Role Snapshot</h3>
          </div>
          <p>
            Accountability Data Analyst at Kansas City Public Schools, working on validation logic, state reporting,
            QA workflows, and leadership dashboards.
          </p>
          <div className="inlineMeta">
            <span>SQL Server</span>
            <span>Azure SQL</span>
            <span>Power BI</span>
            <span>SSRS</span>
          </div>
        </article>
      </section>
    </main>
  );
}
