import { experience } from "../portfolio-data";

export default function ExperiencePage() {
  return (
    <main className="pageShell">
      <section className="pageIntro">
        <p className="eyebrow">Experience</p>
        <h1>Roles across school systems, nonprofit work, and university support.</h1>
      </section>
      <section className="stackedNotes">
        {(experience as any).map(
          (
            job: { title: string; org: string; date: string; bullets: string[] },
            index: number,
          ) => (
          <article
            key={job.title}
            className={`stickyNote wideNote ${index % 2 === 0 ? "noteYellow" : "noteBlue"}`}
          >
            <div className="noteHeader">
              <span className="notePin" />
              <div>
                <h2>{job.title}</h2>
                <p className="noteMeta">
                  {job.org} | {job.date}
                </p>
              </div>
            </div>
            <ul className="bulletList">
              {(job.bullets as any).map((bullet: string) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
          ),
        )}
      </section>
    </main>
  );
}
