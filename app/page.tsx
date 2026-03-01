"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const inView = useInView(ref, { amount: 0.18 });

  // ✅ During prerender/SSR, don't render motion at all
  if (!mounted) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Icon({ type }: { type: "code" | "bi" | "db" | "eng" | "cloud" | "tools" | "os" }) {
  // small inline SVG icons (no extra install)
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none" as const };
  const stroke = { stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (type) {
    case "code":
      return (
        <svg {...common}>
          <path {...stroke} d="M9 18L3 12l6-6" />
          <path {...stroke} d="M15 6l6 6-6 6" />
          <path {...stroke} d="M11 20l2-16" />
        </svg>
      );
    case "bi":
      return (
        <svg {...common}>
          <path {...stroke} d="M4 19V5" />
          <path {...stroke} d="M4 19h16" />
          <path {...stroke} d="M8 17v-6" />
          <path {...stroke} d="M12 17v-9" />
          <path {...stroke} d="M16 17v-3" />
        </svg>
      );
    case "db":
      return (
        <svg {...common}>
          <ellipse {...stroke} cx="12" cy="6" rx="7" ry="3" />
          <path {...stroke} d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path {...stroke} d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
      );
    case "eng":
      return (
        <svg {...common}>
          <path {...stroke} d="M12 3v4" />
          <path {...stroke} d="M12 17v4" />
          <path {...stroke} d="M3 12h4" />
          <path {...stroke} d="M17 12h4" />
          <path {...stroke} d="M7 7l2 2" />
          <path {...stroke} d="M15 15l2 2" />
          <path {...stroke} d="M17 7l-2 2" />
          <path {...stroke} d="M9 15l-2 2" />
          <circle {...stroke} cx="12" cy="12" r="3.5" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path
            {...stroke}
            d="M7 18h10a4 4 0 0 0 .4-8A5 5 0 0 0 7.2 8.8 3.5 3.5 0 0 0 7 18Z"
          />
        </svg>
      );
    case "tools":
      return (
        <svg {...common}>
          <path {...stroke} d="M14 7l3 3" />
          <path {...stroke} d="M6 21l7-7" />
          <path {...stroke} d="M16 3a5 5 0 0 0-6.7 6.7L3 16v5h5l6.3-6.3A5 5 0 0 0 21 8l-4 2-2-2 2-4Z" />
        </svg>
      );
    case "os":
      return (
        <svg {...common}>
          <rect {...stroke} x="3.5" y="5" width="17" height="12" rx="2" />
          <path {...stroke} d="M8 21h8" />
          <path {...stroke} d="M12 17v4" />
        </svg>
      );
  }
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const blockPasteCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") ?? "").trim();
    const confirmEmail = String(data.get("confirmEmail") ?? "").trim();

    // ✅ Match check (case-insensitive)
    if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
      setStatus("error");
      setErrorMsg("Emails do not match. Please re-enter.");
      return;
    }

    // Optional: remove confirmEmail from what gets sent
    data.delete("confirmEmail");

    try {
      const res = await fetch("https://formspree.io/f/maqdzqzg", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <form className="contactForm" onSubmit={handleSubmit}>
      <div className="cardTitle">Message me</div>

      <div className="formGrid">
        <label className="label">
          Name
          <input className="input" name="name" placeholder="Your name" required />
        </label>

        <label className="label">
          Email
          <input
            className="input"
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            autoComplete="email"
          />
        </label>

        <label className="label">
          Confirm Email
          <input
            className="input"
            type="email"
            name="confirmEmail"
            placeholder="re-enter email"
            required
            autoComplete="off"
            onPaste={blockPasteCopy}   // ✅ block paste
            onCopy={blockPasteCopy}    // ✅ block copy
            onCut={blockPasteCopy}     // ✅ block cut
            spellCheck={false}
          />
        </label>
      </div>

      <label className="label">
        Message
        <textarea
          className="textarea"
          name="message"
          rows={6}
          placeholder="Write your message..."
          required
        />
      </label>

      <button className="sendBtn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "sent" && (
        <p className="formSuccess">✅ Message sent successfully! I’ll get back to you soon.</p>
      )}

      {status === "error" && (
        <p className="formError">❌ {errorMsg || "Something went wrong. Please try again."}</p>
      )}

      {status === "idle" && (
        <p className="formNote">This form sends messages to my email.</p>
      )}
    </form>
  );
}

export default function Page() {
  return (
    <main className="page">
      {/* NAV */}
      <header className="nav">
        <a className="brand" href="#top">Nikshith's Portfolio <span className="dot"></span></a>

        <nav className="navLinks">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="resumeBtn" href="/DataAnalyst_Nikshith.pdf" target="_blank" rel="noreferrer">
          Download Resume
        </a>
      </header>

      {/* HERO */}
      <section id="top" className="hero">
        <div className="heroGlow" />
        <div className="container">
          <Reveal>
            <div className="pill">Data Analyst • Business Intelligence • SQL • Power BI • Python</div>
            <h1 className="h1">Nikshith Reddy Sheelam</h1>
            <p className="lead">
              I am a Data Analyst with experience in SQL-based automation, data validation, and business intelligence reporting.
              I work with complex datasets to ensure data accuracy, build dashboards, and deliver insights that support
              data-driven decision-making for leadership and stakeholders.
            </p>

            <div className="stats">
              <div className="statCard">
                <div className="statTitle">Reporting</div>
                <div className="statValue">20–25%</div>
                <div className="statNote">reduced turnaround time</div>
              </div>
              <div className="statCard">
                <div className="statTitle">Quality</div>
                <div className="statValue">25%</div>
                <div className="statNote">fewer downstream errors</div>
              </div>
              <div className="statCard">
  <div className="statTitle">Compliance</div>
  <div className="statValue">Audit-ready</div>
  <div className="statNote">validation & QA workflows</div>
</div>
            </div>
          </Reveal>
        </div>
      </section>

      <Section id="about" title="About Me">
        <Reveal>
          <p className="p">
            I am currently working as an Accountability Data Analyst at Kansas City Public Schools, where I develop SQL-based
            validation logic, automate data quality checks, and design Power BI and SSRS reports for district and school leadership.
          </p>
          <p className="p">
            I have hands-on experience working across the full data lifecycle — from data ingestion and validation to analysis,
            visualization, and reporting. My work supports audit-ready reporting, regulatory compliance, and operational decision-making.
          </p>
          <p className="p">
            I hold a Master’s degree in Computer Science and have worked with education, nonprofit, and academic datasets.
            I enjoy transforming raw data into reliable insights and collaborating with cross-functional teams to solve data challenges.
          </p>
        </Reveal>
      </Section>

      <Section id="experience" title="Professional Work Experience">
        <div className="grid">
          {[
            {
              title: "Accountability Data Analyst",
              org: "Kansas City Public Schools",
              date: "Nov 2024 – Present",
              bullets: [
                "Develop and maintain SQL Server / Azure SQL triggers and automated actions to validate and correct student data, ensuring accurate, compliant student records.",
                "Design, build, and optimize Power BI dashboards and SSRS reports for district and school leadership, improving access to key metrics and reducing reporting turnaround time by 20–25%.",
                "Implement data validation, reconciliation, and QA workflows within SQL and BI systems, ensuring audit-ready, high-quality data for accountability reporting.",
                "Perform statistical analysis, calculations, and projections as a team contributor for MSIP submissions to MOSIS, supporting 100% on-time, compliant state reporting.",
                "Execute sandbox testing and production validation of SQL logic, dashboards, and reports, reducing downstream reporting errors by 25%.",
                "Collaborate with IT, data engineering, and SIS teams to resolve data integration issues, validate data loads, and maintain consistent datasets across development and production environments.",
              ],
            },
            {
              title: "Data Analyst, Volunteer",
              org: "WeCodeKC",
              date: "Jul 2024 – Jan 2025",
              bullets: [
                "Implemented logistic regression models to analyze factors influencing student retention, improving at-risk student predictions by 25%.",
                "Streamlined data integration and ETL using Python (Pandas, NumPy) and SQL, reducing processing time by 50% and ensuring data consistency.",
                "Built dynamic Tableau dashboards showing real-time student engagement and course effectiveness, improving decision-making speed by 15%.",
                "Conducted statistical analysis with R and Python (Pandas, NumPy, scikit-learn) to assess program impact, enhancing student retention by 10%.",
                "Optimized Spark and Hadoop data pipelines, improving processing efficiency by 30% and automating Python-based data cleaning to reduce manual work by 50%.",
              ],
            },
            {
              title: "Student Technical Assistant",
              org: "University of Missouri–Kansas City",
              date: "Jun 2023 – May 2024",
              bullets: [
                "Improved SQL queries by implementing indexing and partitioning techniques, significantly reducing data retrieval times by 30% and enhancing overall database efficiency and performance.",
                "Automated data cleaning tasks using Python with Pandas, cutting down manual processing time by 50%.",
                "Established a MySQL database to centralize over 1,000 student records, improving data access speed by 40%.",
                "Created Tableau dashboards and SSRS reports to support data analysis and reporting needs.",
                "Led a data migration project using SSIS for ETL, finishing two weeks ahead of schedule with no data loss.",
                "Trained 50+ users on SQL, Excel, and Tableau, leading to a 25% increase in effective use of these tools.",
              ],
            },
          ].map((job) => (
            <Reveal key={job.title} className="card">
              <div className="cardTop">
                <div>
                  <div className="cardTitle">{job.title}</div>
                  <div className="cardSub">{job.org} • {job.date}</div>
                </div>
              </div>
              <ul className="ul">
                {job.bullets.map((b) => <li key={b} className="li">{b}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Technical Projects">
        <div className="grid">
          {[
            {
              title: "Movie Ratings Analysis (Apr 2024)",
              tools: "Python (Pandas, NumPy), SQL, Tableau",
              bullets: [
                "Analyzed ~20,000 movie ratings using Python (Pandas, NumPy) and SQL to identify trends in viewer preferences.",
                "Performed data cleaning, aggregation, and exploratory data analysis (EDA), improving dataset usability by 30%.",
                "Computed statistical summaries (average ratings, rating distribution, top genres) to highlight key patterns.",
                "Created interactive dashboards and visualizations using Tableau, showing genre popularity, rating trends, and most-watched movies.",
                "Built reusable Python-SQL workflow to automate data preprocessing, aggregation, and visualization updates for new ratings data.",
              ],
            },
            {
              title: "Retail Sales Analysis (Oct 2023)",
              tools: "Python (Pandas, scikit-learn, SciPy), Matplotlib, Seaborn",
              bullets: [
                "Cleaned and aggregated a dataset of ~40,000 retail transactions using Python (Pandas, scikit-learn, SciPy).",
                "Conducted statistical analysis; top 20% of products contributed ~55% of revenue; peak months ~25% higher average sales.",
                "Built visualizations with Matplotlib and Seaborn to highlight weekly/monthly sales trends, revenue distribution, and top-performing products.",
                "Developed Python scripts to automate preprocessing and reporting, reducing manual preparation time by ~20%.",
              ],
            },
            {
              title: "Big Data Analytics of Mobile Applications (Jan 2023)",
              tools: "HDFS, Hive, Spark, Power BI",
              bullets: [
                "Processed a dataset of ~1 million mobile app events using HDFS, Hive, and Spark, performing aggregation, filtering, and ETL preprocessing for analysis.",
                "Built HiveQL queries to extract insights on user activity and location patterns.",
                "Created Power BI dashboards to visualize daily active users and engagement trends, enabling faster analysis of usage patterns by ~15%.",
                "Implemented data pipelines to clean and transform incoming datasets, reducing manual preprocessing by ~20%.",
              ],
            },
          ].map((p) => (
            <Reveal key={p.title} className="card">
              <div className="cardTitle">{p.title}</div>
              <div className="cardSub">{p.tools}</div>
              <ul className="ul">
                {p.bullets.map((b) => <li key={b} className="li">{b}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Skills (exact resume text) + icons */}
      <Section id="skills" title="Technical Skills">
        <div className="skillsWrap">
          <Reveal className="skillBlock">
            <div className="skillHeadRow">
              <span className="skillIcon"><Icon type="code" /></span>
              <div className="skillHead">Core Data Analysis &amp; Programming:</div>
            </div>
            <div className="skillText">SQL, Python (Pandas, NumPy), R, PySpark, C, C++, Java, JavaScript, HTML, CSS</div>
          </Reveal>

          <Reveal className="skillBlock">
            <div className="skillHeadRow">
              <span className="skillIcon"><Icon type="bi" /></span>
              <div className="skillHead">Business Intelligence &amp; Reporting:</div>
            </div>
            <div className="skillText">Power BI (DAX, Power Query), Tableau, Excel (Advanced), SSRS, SSAS, Seaborn</div>
          </Reveal>

          <Reveal className="skillBlock">
            <div className="skillHeadRow">
              <span className="skillIcon"><Icon type="db" /></span>
              <div className="skillHead">Database &amp; Data Platform:</div>
            </div>
            <div className="skillText">SQL Server, Azure SQL, MySQL, Oracle DB, PostgreSQL, MongoDB, NoSQL, Amazon Redshift</div>
          </Reveal>

          <Reveal className="skillBlock">
            <div className="skillHeadRow">
              <span className="skillIcon"><Icon type="eng" /></span>
              <div className="skillHead">Data Engineering &amp; Automation:</div>
            </div>
            <div className="skillText">SQL-based automation (stored procedures, triggers, scheduled actions), CI/CD, Docker</div>
          </Reveal>

          <Reveal className="skillBlock">
            <div className="skillHeadRow">
              <span className="skillIcon"><Icon type="cloud" /></span>
              <div className="skillHead">Cloud Platforms:</div>
            </div>
            <div className="skillText">Azure, AWS, Google Cloud Platform, Oracle Cloud</div>
          </Reveal>

          <Reveal className="skillBlock">
            <div className="skillHeadRow">
              <span className="skillIcon"><Icon type="tools" /></span>
              <div className="skillHead">Analytics &amp; Development Tools:</div>
            </div>
            <div className="skillText">Google Colab, Jupyter Notebook, RStudio, Visual Studio, Git, GitHub</div>
          </Reveal>

          <Reveal className="skillBlock">
            <div className="skillHeadRow">
              <span className="skillIcon"><Icon type="os" /></span>
              <div className="skillHead">Operating Systems:</div>
            </div>
            <div className="skillText">Windows, macOS, Linux</div>
          </Reveal>
        </div>
      </Section>

     <Section id="contact" title="Contact">

      
  <div className="contactGrid">
    {/* Left: contact info */}
    <Reveal className="contactCard">
      <div className="cardTitle">Let’s connect</div>

      <div className="contactRow">
        <span className="contactLabel">Email</span>
        <a className="contactLink" href="mailto:sheelamnikshithreddy@outlook.com">
          sheelamnikshithreddy@outlook.com
        </a>
      </div>

      <div className="contactRow">
        <span className="contactLabel">Phone</span>
        <span className="contactValue">+1 816-726-9353</span>
      </div>

      <div className="contactRow">
        <span className="contactLabel">LinkedIn</span>
        <a
          className="contactLink"
          href="https://www.linkedin.com/in/nikshith-reddy-sheelam"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/nikshith-reddy-sheelam
        </a>
      </div>

      <div className="mapCard">
  <div className="cardTitle">Location</div>

  <div className="mapEmbed">
    <iframe
      src="https://www.google.com/maps?q=Kansas%20City%2C%20Missouri&output=embed"
      width="100%"
      height="200"     // ✅ bigger map
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>

  <p className="mapNote">Kansas City, Missouri</p>
</div>
    </Reveal>

    {/* Right: message form */}
    <Reveal className="contactFormCard">
      <ContactForm />
    </Reveal>
  </div>
</Section> 

      <footer className="footer">© {new Date().getFullYear()} Nikshith Reddy Sheelam</footer>
    </main>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <h2 className="h2">{title}</h2>
        {children}
      </div>
    </section>
  );
}