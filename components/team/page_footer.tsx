import Link from "next/link";

export function PageFooter() {
  return (
    <footer className="w-full bg-navy mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div>
            <p className="font-serif text-[20px] text-cream">West Team</p>
            <p className="text-caption text-pebble mt-2 max-w-[40ch]">
              A real estate team serving the West Valley of the Phoenix metro
              area.
            </p>
          </div>
          <nav className="flex items-center gap-6" aria-label="Footer">
            <Link
              href="/"
              className="text-[14px] text-cream/70 hover:text-cream transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/team"
              className="text-[14px] text-cream/70 hover:text-cream transition-colors duration-200"
            >
              The team
            </Link>
          </nav>
        </div>
        <div className="border-t border-cream/10 mt-12 pt-6">
          <p className="text-caption text-pebble">
            © {new Date().getFullYear()} West Team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
