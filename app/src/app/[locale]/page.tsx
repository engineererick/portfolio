import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import SkipToContent from "@/components/SkipToContent";
import { parseSkillFiles } from "@/lib/parseSkillFiles";
import { parsePortfolioFiles } from "@/lib/parsePortfolioFiles";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Parse experience data from locale-specific SKILL files
  const experiences = parseSkillFiles(locale);
  // Parse featured projects from locale-specific PORTFOLIO files
  const projects = parsePortfolioFiles(locale);

  return (
    <>
      <SkipToContent />
      <Header />
      <main id="main-content" className="relative min-h-screen overflow-hidden">
        {/* Decorative Background Orbs */}
        <div className="gradient-orb top-[-200px] left-[-200px]" />
        <div className="gradient-orb gradient-orb-secondary bottom-[20%] right-[-300px]" />

        <HeroSection />
        <SkillsSection />
        <FeaturedProjectsSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <ContactSection />
      </main>
    </>
  );
}
