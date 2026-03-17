export const profile = {
  name: "Nikshith Reddy Sheelam",
  role: "Accountability Data Analyst",
  location: "Kansas City, Missouri",
  email: "sheelamnikshithreddy@outlook.com",
  phone: "+1 816-726-9353",
  linkedin: "https://www.linkedin.com/in/nikshith-reddy-sheelam",
  summary:
    "I build reliable reporting systems, validate complex datasets, and turn operational data into decisions leaders can actually use.",
  about: [
    "I currently work as an Accountability Data Analyst at Kansas City Public Schools, where I develop SQL-based validation logic, automate quality checks, and design reporting for district and school leadership.",
    "My work sits across the full data lifecycle: ingestion, reconciliation, reporting, dashboards, audit readiness, and stakeholder-facing analysis.",
    "I have a Master's degree in Computer Science and experience working with education, nonprofit, and academic datasets.",
  ],
};

export const highlights = [
  { label: "Reporting Turnaround", value: "20-25%", note: "faster delivery for leadership reporting" },
  { label: "Downstream Errors", value: "25%", note: "reduced through validation and QA" },
  { label: "State Reporting", value: "100%", note: "on-time compliant MSIP submissions" },
];

export const experience = [
  {
    title: "Accountability Data Analyst",
    org: "Kansas City Public Schools",
    date: "Nov 2024 - Present",
    bullets: [
      "Develop and maintain SQL Server and Azure SQL validation logic to correct and monitor student data.",
      "Design Power BI dashboards and SSRS reports that improved reporting turnaround time by 20-25%.",
      "Implement reconciliation and QA workflows that keep accountability reporting audit-ready.",
      "Support MSIP submissions to MOSIS with calculations, validation, and compliant state reporting.",
      "Test SQL logic, dashboards, and reports in sandbox and production environments to reduce downstream reporting errors by 25%.",
    ],
  },
  {
    title: "Data Analyst, Volunteer",
    org: "WeCodeKC",
    date: "Jul 2024 - Jan 2025",
    bullets: [
      "Built retention analysis models that improved at-risk student prediction by 25%.",
      "Streamlined ETL with Python and SQL, reducing processing time by 50%.",
      "Created Tableau dashboards to surface student engagement and course effectiveness in near real time.",
      "Used Python, R, Spark, and Hadoop to analyze impact and improve processing efficiency.",
    ],
  },
  {
    title: "Student Technical Assistant",
    org: "University of Missouri-Kansas City",
    date: "Jun 2023 - May 2024",
    bullets: [
      "Improved SQL query performance through indexing and partitioning, reducing retrieval time by 30%.",
      "Automated data cleaning with Python and Pandas, cutting manual work by 50%.",
      "Centralized over 1,000 student records in MySQL and supported reporting with Tableau and SSRS.",
      "Led a data migration project with SSIS that finished two weeks early with no data loss.",
    ],
  },
];

export const projects = [
  {
    title: "Movie Ratings Analysis",
    tools: "Python, Pandas, NumPy, SQL, Tableau",
    summary:
      "Analyzed roughly 20,000 movie ratings to identify trends, automate preprocessing, and publish dashboard-ready insights.",
  },
  {
    title: "Retail Sales Analysis",
    tools: "Python, scikit-learn, SciPy, Matplotlib, Seaborn",
    summary:
      "Cleaned and aggregated about 40,000 retail transactions to identify product concentration, seasonal spikes, and revenue patterns.",
  },
  {
    title: "Big Data Analytics of Mobile Applications",
    tools: "HDFS, Hive, Spark, Power BI",
    summary:
      "Processed around 1 million mobile app events and built dashboards to monitor active users, engagement, and location patterns.",
  },
];

export const skillGroups = [
  {
    title: "Programming & Analysis",
    items: ["SQL", "Python", "Pandas", "NumPy", "R", "PySpark", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "BI & Visualization",
    items: ["Power BI", "DAX", "Power Query", "Tableau", "SSRS", "Excel", "Seaborn"],
  },
  {
    title: "Data Platforms",
    items: ["SQL Server", "Azure SQL", "MySQL", "PostgreSQL", "Oracle DB", "MongoDB", "Redshift"],
  },
  {
    title: "Engineering & Workflow",
    items: ["Stored Procedures", "Triggers", "ETL", "QA Validation", "CI/CD", "Docker", "Git", "GitHub"],
  },
];

export const featuredNotes = [
  {
    href: "/about",
    title: "About Me",
    text: "The short version of who I am, how I work, and the kind of data problems I like solving.",
    color: "notePeach",
  },
  {
    href: "/experience",
    title: "Experience",
    text: "District analytics, volunteer work, and technical support experience in one timeline.",
    color: "noteYellow",
  },
  {
    href: "/projects",
    title: "Projects",
    text: "Examples of analysis, reporting, and data engineering work across different datasets.",
    color: "noteBlue",
  },
  {
    href: "/skills",
    title: "Skills",
    text: "Tools, platforms, and workflows that appear on the back of the hanging ID card too.",
    color: "noteGreen",
  },
  {
    href: "/contact",
    title: "Contact Me",
    text: "Drag the ID card down or open this page when you want to start a conversation.",
    color: "notePink",
  },
];
