import Link from "next/link";
import { SiteHeader } from "@/components/home_page/site_header";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-[46ch]">
          <div className="flex items-center justify-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ashen">
              404
            </span>
          </div>
          <h1 className="font-serif text-[32px] lg:text-[40px] leading-[1.15] text-ink tracking-tight mt-3">
            This page has moved on.
          </h1>
          <p className="text-lead text-graphite leading-lead mt-4">
            The page you&rsquo;re looking for doesn&rsquo;t exist — but the team
            does.
          </p>
          <Link
            href="/team"
            className="inline-flex items-center rounded-[8px] bg-navy text-cream text-[15px] font-medium px-5 py-2.5 hover:bg-ink transition-colors duration-200 mt-8"
          >
            Meet the team
          </Link>
        </div>
      </main>
    </div>
  );
}
