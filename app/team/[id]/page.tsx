import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/home_page/site_header";
import { PageFooter } from "@/components/team/page_footer";
import { MemberPhoto } from "@/components/team/member_photo";
import { getTeamMember, teamMembers } from "@/data/team-member";

export function generateStaticParams() {
  return teamMembers.map((member) => ({ id: member.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/team/[id]">): Promise<Metadata> {
  const { id } = await params;
  const member = getTeamMember(id);
  if (!member) return { title: "Member not found | West Team" };
  return {
    title: `${member.name} | West Team`,
    description: member.bio,
  };
}

export default async function MemberPage({ params }: PageProps<"/team/[id]">) {
  const { id } = await params;
  const member = getTeamMember(id);
  if (!member) notFound();

  const reviewsUrl = member.googlePlaceId
    ? `https://www.google.com/maps/place/?q=place_id:${member.googlePlaceId}`
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full">
          <div className="max-w-[1200px] mx-auto px-6 pt-8 lg:pt-10">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-graphite hover:text-ink transition-colors duration-200"
            >
              <span aria-hidden="true">←</span> All team members
            </Link>
          </div>
        </section>

        <section className="w-full pb-20 lg:pb-28">
          <div className="max-w-[1200px] mx-auto px-6 pt-10 lg:pt-14">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Portrait */}
              <div className="lg:col-span-5">
                <div className="relative max-w-[440px] w-full aspect-[4/5] mx-auto lg:mx-0">
                  <div
                    className="absolute inset-0 translate-x-4 translate-y-4 rounded-[24px] bg-stone"
                    aria-hidden="true"
                  />
                  <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-stone border border-mist">
                    <MemberPhoto
                      src={member.image}
                      name={member.name}
                      priority
                      sizes="(max-width: 1024px) 100vw, 440px"
                    />
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2 w-2 rounded-full bg-orange"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ashen">
                    {member.role}
                  </span>
                </div>
                <h1 className="font-serif text-[32px] lg:text-[40px] leading-[1.15] text-ink tracking-tight mt-3">
                  {member.name}
                </h1>
                <p className="text-lead text-graphite leading-lead mt-6 max-w-[54ch]">
                  {member.bio}
                </p>

                <div className="mt-10 bg-paper rounded-[24px] border border-mist p-8 max-w-[540px]">
                  <h2 className="font-serif text-heading-sm leading-heading-sm text-ink">
                    At a glance
                  </h2>
                  <dl className="mt-5 space-y-4">
                    <div className="flex items-baseline justify-between gap-6 border-b border-mist pb-4">
                      <dt className="text-caption font-medium text-ashen uppercase tracking-[0.12em]">
                        License
                      </dt>
                      <dd className="font-mono text-[13px] text-ink">
                        {member.licenseNumber}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-6">
                      <dt className="text-caption font-medium text-ashen uppercase tracking-[0.12em]">
                        Reviews
                      </dt>
                      <dd>
                        {reviewsUrl ? (
                          <a
                            href={reviewsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[14px] font-medium text-graphite underline underline-offset-4 decoration-mist hover:text-ink hover:decoration-pebble transition-colors duration-200"
                          >
                            Read on Google ↗
                          </a>
                        ) : (
                          <span className="text-[14px] text-pebble">
                            Coming soon
                          </span>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </div>
  );
}
