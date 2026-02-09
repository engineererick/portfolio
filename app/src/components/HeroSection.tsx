"use client";

import { ExternalLink, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { useTranslations } from "next-intl";

export default function HeroSection() {
    const { theme } = useTheme();
    const t = useTranslations("hero");
    const tAccessibility = useTranslations("accessibility");

    return (
        <section className={`relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 pt-32 ${theme === "light" ? "bg-gradient-to-br from-cyan-200 via-violet-200 to-pink-200" : ""
            }`}>
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Text Content */}
                <div>
                    {/* Name & Title */}
                    <h1 className="animate-fade-up opacity-0 mb-4">
                        <span className="block text-lg md:text-xl font-normal text-[var(--foreground-muted)] mb-2">{t("greeting")}</span>
                        {t("name")}<span className="text-gradient">.</span>
                    </h1>
                    <h2 className="animate-fade-up opacity-0 animate-delay-100 text-[var(--foreground-muted)] font-normal mb-8">
                        {t("tagline")}
                    </h2>

                    {/* Bio */}
                    <p className="animate-fade-up opacity-0 animate-delay-200 text-lg text-[var(--foreground-muted)] max-w-2xl mb-10 leading-relaxed">
                        {t("description")}
                    </p>

                    {/* CTA Buttons */}
                    <div className="animate-fade-up opacity-0 animate-delay-300 flex flex-wrap gap-4">
                        <a href="#contact" className="btn btn-primary">
                            {t("cta.contact")}
                            <ExternalLink size={16} />
                        </a>
                        <a href="#experience" className="btn btn-outline">
                            {t("cta.resume")}
                        </a>
                    </div>
                </div>

                {/* Right Column - Gorilla Programmer */}
                <div className="animate-fade-up opacity-0 animate-delay-400 hidden lg:flex justify-center items-center">
                    <div className="relative w-full max-w-md aspect-square">
                        <Image
                            src={theme === "dark"
                                ? "/images/hero/gorila_hero_dark.png"
                                : "/images/hero/gorila_hero_light.png"
                            }
                            alt="Gorilla Programmer"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <a
                href="#skills"
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group animate-bounce"
                aria-label={t("scroll")}
            >
                <ChevronDown
                    size={24}
                    className="text-[var(--foreground-muted)] group-hover:text-[var(--accent-primary)] transition-colors"
                />
            </a>
        </section>
    );
}
