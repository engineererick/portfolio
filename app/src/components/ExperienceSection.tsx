"use client";

import { Building2, ShieldCheck } from "lucide-react";
import { useScrollAnimationChildren } from "@/hooks/useScrollAnimation";
import { useTranslations } from "next-intl";

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    highlights: string[];
    technologies: string[];
}

// Fallback data if parsing fails
const fallbackExperiences: Experience[] = [
    {
        company: "FINCEA",
        role: "Software Engineer",
        period: "May 2025 - Present",
        description:
            "Leading development of fintech solutions including ERP systems, AI-powered data analysis, and banking integrations.",
        highlights: [
            "Architected Fintech ERP with quotations, billing, and collections modules",
            "Implemented LLM-powered invoice analysis and data extraction pipelines",
            "Designed proprietary credit scoring algorithm based on payment history",
            "Implemented domiciliación with Santander, Bajío, and Banorte",
            "Led migration from legacy PHP system to Next.js + Nest.js architecture",
        ],
        technologies: ["Next.js", "Nest.js", "Python", "PHP", "AWS", "LLMs", "n8n"],
    },
    {
        company: "Kalapata",
        role: "Software Engineer",
        period: "Jun 2022 - Jul 2024",
        description:
            "Full-stack development for real estate, logistics, and e-commerce platforms.",
        highlights: [
            "Built real estate management platform with Google Maps API integration",
            "Developed real-time GPS delivery tracking application",
            "Reduced marketplace manual processes by 80% (Liverpool, Coppel, MercadoLibre)",
            "Created LLM-based recommendation engine",
        ],
        technologies: ["React", "Node.js", "AWS", "MongoDB", "Google Maps API"],
    },
    {
        company: "Superior CS Group",
        role: "Full Stack Developer",
        period: "Oct 2021 - Jun 2022",
        description: "CRM development for sales and customer management.",
        highlights: [
            "Developed custom CRM from scratch with lead tracking and sales pipeline",
        ],
        technologies: ["React", "Node.js", "MongoDB"],
    },
    {
        company: "Rompope Coronado",
        role: "IT Lead & Software Engineer",
        period: "Aug 2020 - Oct 2021",
        description:
            "Industrial software development and IT infrastructure management.",
        highlights: [
            "Created MRP desktop application with SAP Business One integration",
            "Built intranet and invoice query web applications",
            "Managed hybrid cloud/on-premise infrastructure",
        ],
        technologies: [".NET WPF", ".NET Core", "SQL Server", "SAP B1"],
    },
    {
        company: "Freelance",
        role: "Software Engineer",
        period: "2019 - Present",
        description:
            "Independent projects including network security systems and university websites.",
        highlights: [
            "Network security expert system with .NET and Elastic Stack",
            "University web ecosystem with Next.js and Node.js",
            "Specialized technical support for software and hardware",
        ],
        technologies: [".NET Framework", "Elasticsearch", "Next.js", "Node.js"],
    },
];

interface ExperienceSectionProps {
    experiences?: Experience[];
}

export default function ExperienceSection({ experiences = fallbackExperiences }: ExperienceSectionProps) {
    const sectionRef = useScrollAnimationChildren<HTMLElement>(".experience-card");
    const t = useTranslations("experience");

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative z-10 px-6 md:px-12 lg:px-24 py-24 bg-[var(--background-elevated)]"
        >
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <h2 className="mb-4">
                        {t("title")} <span className="text-gradient">{t("titleHighlight")}</span>
                    </h2>
                    <p className="text-[var(--foreground-muted)] max-w-xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-secondary)] to-transparent opacity-50" />

                    {/* Experience Items */}
                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp.company}
                                className="experience-card opacity-0 relative pl-12"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-[var(--background)] border-2 border-[var(--accent-primary)] flex items-center justify-center">
                                    <Building2
                                        size={14}
                                        className="text-[var(--accent-primary)]"
                                    />
                                </div>

                                {/* Card */}
                                <div className="card bg-[var(--background-elevated)]">
                                    {/* Header */}
                                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                        <div>
                                            <h3 className="text-xl font-semibold flex items-center gap-2 text-[var(--foreground)]">
                                                {exp.company}
                                                <span className="tag tag-nda">
                                                    <ShieldCheck size={12} />
                                                    NDA
                                                </span>
                                            </h3>
                                            <p className="text-[var(--foreground-muted)]">
                                                {exp.role}
                                            </p>
                                        </div>
                                        <span className="text-sm text-[var(--accent-primary)]">
                                            {exp.period}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-[var(--foreground-muted)] mb-4">
                                        {exp.description}
                                    </p>

                                    {/* Highlights */}
                                    <ul className="space-y-1.5 mb-4">
                                        {exp.highlights.map((highlight, i) => (
                                            <li
                                                key={i}
                                                className="text-sm text-[var(--foreground-muted)] flex items-start gap-2"
                                            >
                                                <span className="text-[var(--accent-primary)] mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0" />
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech) => (
                                            <span key={tech} className="tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
