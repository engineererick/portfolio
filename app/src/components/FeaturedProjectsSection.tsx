"use client";

import { Code2, Layers, FileCode, ExternalLink } from "lucide-react";
import { useScrollAnimationChildren } from "@/hooks/useScrollAnimation";
import { useTranslations } from "next-intl";
import type { PortfolioProject } from "@/lib/parsePortfolioFiles";

interface FeaturedProjectsSectionProps {
    projects: PortfolioProject[];
}

export default function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
    const sectionRef = useScrollAnimationChildren<HTMLElement>(".project-card");
    const t = useTranslations("projects");

    if (projects.length === 0) {
        return null;
    }

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative z-10 px-6 md:px-12 lg:px-24 py-24"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        {t("title")} <span className="text-gradient">{t("titleHighlight")}</span>
                    </h2>
                    <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <article
                            key={project.slug}
                            className="project-card card card-glass group opacity-0"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 text-sm text-[var(--accent-primary)] mb-2">
                                    <Code2 size={16} />
                                    <span>{project.company}</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                                    {project.title}
                                </h3>
                            </div>

                            {/* Summary */}
                            <p className="text-[var(--foreground-muted)] mb-6 leading-relaxed">
                                {project.summary}
                            </p>

                            {/* Features */}
                            {project.features.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-[var(--foreground-muted)] mb-3 flex items-center gap-2">
                                        <Layers size={14} />
                                        {t("keyFeatures")}
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {project.features.map((feature, idx) => (
                                            <div
                                                key={idx}
                                                className="text-sm text-[var(--foreground-muted)] flex items-start gap-2"
                                            >
                                                <span className="text-[var(--accent-primary)] mt-1">•</span>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tech Stack */}
                            <div>
                                <h4 className="text-sm font-semibold text-[var(--foreground-muted)] mb-3 flex items-center gap-2">
                                    <FileCode size={14} />
                                    {t("techStack")}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        ...project.techStack.frontend.slice(0, 4),
                                        ...project.techStack.backend.slice(0, 4),
                                    ]
                                        .slice(0, 8)
                                        .map((tech) => (
                                            <span key={tech} className="tag">
                                                {tech}
                                            </span>
                                        ))}
                                </div>
                            </div>

                            {/* Links */}
                            {project.links && project.links.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-3">
                                    {project.links.map((link) => (
                                        <a
                                            key={link.url}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
                                        >
                                            <ExternalLink size={14} />
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
