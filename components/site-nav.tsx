"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
};

export function SiteNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="topnav" aria-label="Primary">
      {(items as any).map((item: NavItem) => (
        <Link key={item.href} href={item.href} className={pathname === item.href ? "activeNav" : ""}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
