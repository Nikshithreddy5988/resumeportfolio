import { skillGroups } from "../portfolio-data";

export default function SkillsPage() {
  return (
    <main className="pageShell">
      <section className="pageIntro">
        <p className="eyebrow">Skills</p>
        <h1>The tools on the back of the badge.</h1>
      </section>
      <section className="noteGrid">
        {(skillGroups as any).map(
          (group: { title: string; items: string[] }, index: number) => (
          <article
            key={group.title}
            className={`stickyNote ${index % 2 === 0 ? "noteBlue" : "notePeach"}`}
          >
            <div className="noteHeader">
              <span className="notePin" />
              <h2>{group.title}</h2>
            </div>
            <div className="skillChipGrid">
              {(group.items as any).map((item: string) => (
                <span key={item} className="skillChip">
                  {item}
                </span>
              ))}
            </div>
          </article>
          ),
        )}
      </section>
    </main>
  );
}
