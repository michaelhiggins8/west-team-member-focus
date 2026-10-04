import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="w-full bg-cream/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/west-team-mark.png"
            alt="West Team logo"
            width={24}
            height={24}
            className="h-6 w-6"
            priority
          />
          <span className="font-serif text-[20px] text-ink tracking-tight">
            West Team
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {[
          { label: "The team", href: "/team" },
            { label: "Community", href: "/#underground" },
          
        
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-4 py-2 rounded-[8px] text-[15px] font-medium text-graphite hover:text-ink transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        <a
          href="#"
          className="inline-flex items-center rounded-[8px] bg-navy text-cream text-[15px] font-medium px-5 py-2.5 hover:bg-ink transition-colors duration-200"
        >
          Join the team
        </a>
      </div>
    </header>
  );
}
