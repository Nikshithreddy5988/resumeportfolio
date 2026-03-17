import { ContactForm } from "@/components/contact-form";
import { profile } from "../portfolio-data";

export default function ContactPage() {
  return (
    <main className="pageShell">
      <section className="pageIntro">
        <p className="eyebrow">Contact</p>
        <h1>Start with a note, email, or LinkedIn message.</h1>
      </section>
      <section className="contactLayout">
        <article className="stickyNote noteYellow">
          <div className="noteHeader">
            <span className="notePin" />
            <h2>Contact Details</h2>
          </div>
          <div className="contactLines">
            <p>
              <strong>Email</strong>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
            <p>
              <strong>Phone</strong>
              <span>{profile.phone}</span>
            </p>
            <p>
              <strong>LinkedIn</strong>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/nikshith-reddy-sheelam
              </a>
            </p>
            <p>
              <strong>Location</strong>
              <span>{profile.location}</span>
            </p>
          </div>
        </article>
        <article className="stickyNote noteBlue">
          <ContactForm />
        </article>
      </section>
    </main>
  );
}
