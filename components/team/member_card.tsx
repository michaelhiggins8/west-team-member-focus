import Link from "next/link";
import type { TeamMember } from "@/data/team-member";
import { MemberPhoto } from "./member_photo";

export function MemberCard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/team/${member.id}`}
      className="group block focus-visible:outline-2 focus-visible:outline-gold rounded-[24px]"
    >
      <div className="bg-paper rounded-[24px] border border-mist overflow-hidden transition-all duration-200 group-hover:shadow-lg group-hover:border-pebble group-focus-visible:shadow-lg">
        <div className="relative aspect-[4/5] bg-stone">
          <MemberPhoto
            src={member.image}
            name={member.name}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-gold"
              aria-hidden="true"
            />
            <p className="text-caption font-medium text-ashen uppercase tracking-[0.12em]">
              {member.role}
            </p>
          </div>
          <h3 className="font-serif text-[22px] leading-heading-sm text-ink mt-2">
            {member.name}
          </h3>
          {member.googlePlaceId ? (
            <p className="text-caption text-ashen mt-2 flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full bg-orange"
                aria-hidden="true"
              />
              Google reviews
            </p>
          ) : (
            <p className="text-caption text-pebble mt-2 opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
              View profile →
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
