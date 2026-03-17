import { profile } from "../portfolio-data";

export default function AboutPage() {
  return (
    <main className="pageShell">
      <section className="pageIntro">
        <p className="eyebrow">About</p>
        <h1>Who I am and how I approach data work.</h1>
      </section>
      <section className="noteGrid">
        {(profile.about as any).map((paragraph: string, index: number) => (
          <article
            key={paragraph}
            className={`stickyNote ${index % 2 === 0 ? "notePeach" : "noteGreen"}`}
          >
            <div className="noteHeader">
              <span className="notePin" />
              <h2>{index === 0 ? "Current Focus" : index === 1 ? "Work Style" : "Background"}</h2>
            </div>
            <p>{paragraph}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
