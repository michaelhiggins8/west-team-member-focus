import { SiteHeader } from "@/components/home_page/site_header";
import { Hero } from "@/components/home_page/hero";
import { TeamLead } from "@/components/home_page/team_lead";
import { Underground } from "@/components/home_page/underground";
import { Pricing } from "@/components/home_page/pricing";

export default function Home() {
  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <TeamLead />
        <Underground />
        <Pricing />
      </main>
    </div>
  );
}
