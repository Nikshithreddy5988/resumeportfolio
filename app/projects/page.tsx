import { projects } from "../portfolio-data";

export default function ProjectsPage() {
  return (
    <main className="pageShell">
      <section className="pageIntro">
        <p className="eyebrow">Projects</p>
        <h1>Selected analysis and reporting projects.</h1>
      </section>
      <section className="noteGrid">
        {(projects as any).map(
          (
            project: { title: string; tools: string; summary: string },
            index: number,
          ) => (
          <article
            key={project.title}
            className={`stickyNote ${index % 3 === 0 ? "notePink" : index % 3 === 1 ? "noteYellow" : "noteGreen"}`}
          >
            <div className="noteHeader">
              <span className="notePin" />
              <h2>{project.title}</h2>
            </div>
            <p className="toolsLine">{project.tools}</p>
            <p>{project.summary}</p>
          </article>
          ),
        )}
      </section>
    </main>
  );
}
