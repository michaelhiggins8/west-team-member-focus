import type { Metadata } from "next";
import { SiteHeader } from "@/components/home_page/site_header";
import { MemberCard } from "@/components/team/member_card";
import { PageFooter } from "@/components/team/page_footer";
import { teamMembers } from "@/data/team-member";

export const metadata: Metadata = {
  title: "The Team | West Team",
  description:
    "Meet the agents of West Team — a real estate team serving the West Valley of the Phoenix metro area.",
};

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full">
          <div className="max-w-[1200px] mx-auto px-6 pt-4 lg:pt-6 pb-6 lg:pb-8">
            <h1 className="font-serif text-[32px] lg:text-[40px] leading-[1.15] text-ink tracking-tight">
              The people behind West Team.
            </h1>
            <p className="text-body text-graphite leading-body mt-2 max-w-[52ch]">
              {teamMembers.length} licensed agents serving Sun City, Sun City
              West, Surprise, Peoria, and the greater West Valley.
            </p>
          </div>
        </section>

        <section className="w-full pb-12 lg:pb-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <li key={member.id}>
                  <MemberCard member={member} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <PageFooter />
    </div>
  );
}
