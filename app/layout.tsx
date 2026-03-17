import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export const metadata: Metadata = {
  title: "Nikshith Reddy Sheelam | Portfolio",
  description: "Sticky-note style portfolio for Nikshith Reddy Sheelam.",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <body>
        <div className="boardBackdrop">
          <div className="boardTexture" />
          <div className="threadAccent threadAccentLeft" />
          <div className="threadAccent threadAccentRight" />
          <header className="topbar">
            <Link className="brandMark" href="/">
              Nikshith Reddy Sheelam
            </Link>
            <SiteNav items={navItems as any} />
            <a
              className="resumeLink"
              href="/DataAnalyst_Nikshith.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
          </header>
          {children}
          <footer className="siteFooter">
            <p>Built as a sticky-note portfolio with separate pages for work, projects, skills, and contact.</p>
            <p>{new Date().getFullYear()} Nikshith Reddy Sheelam</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
