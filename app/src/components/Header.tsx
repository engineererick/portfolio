"use client";

import { Github, Linkedin, Instagram, MapPin, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

function XIcon({ size = 24 }: { size?: number }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
    );
}

const socialLinks = [
    { icon: Github, href: "https://github.com/engineererick", labelKey: "github" },
    { icon: Linkedin, href: "https://linkedin.com/in/engineererick", labelKey: "linkedin" },
    { icon: Instagram, href: "https://instagram.com/engineererick", labelKey: "instagram" },
    { icon: XIcon, href: "https://x.com/engineererick", labelKey: "x" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const t = useTranslations("header");
    const tAccessibility = useTranslations("accessibility");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const switchLocale = (newLocale: string) => {
        // Replace the current locale in the pathname with the new locale
        const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPathname);
    };

    return (
        <header
            role="banner"
            className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-4 transition-all duration-300 ${scrolled
                ? "bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--border)]"
                : "bg-transparent"
                }`}
        >
            <nav className="max-w-6xl mx-auto flex items-center justify-between" aria-label={tAccessibility("mainNavigation")}>
                {/* Logo */}
                <a href={`/${locale}`} className="flex items-center gap-2 group" aria-label={tAccessibility("home")}>
                    <Image
                        src="/images/logo/gorila_logo.svg"
                        alt="Gorilla Logo"
                        width={32}
                        height={32}
                        className="transition-transform group-hover:scale-110"
                    />
                    <span className="text-lg font-semibold">
                        EG<span className="text-gradient">.</span>
                    </span>
                </a>

                {/* Right Side: Location + Language + Theme + Socials */}
                <div className="flex items-center gap-6">
                    {/* Location */}
                    <div className="hidden md:flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                        <MapPin size={14} className="text-[var(--accent-primary)]" />
                        <span>{t("location")}</span>
                    </div>

                    {/* Language Switcher */}
                    <div className="flex gap-1 p-1 rounded-full border border-[var(--border)] bg-[var(--background)]/50">
                        <button
                            onClick={() => switchLocale("en")}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                locale === "en"
                                    ? "bg-[var(--accent-primary)] text-white"
                                    : "text-[var(--foreground-muted)] hover:text-[var(--accent-primary)]"
                            }`}
                            aria-label={tAccessibility("switchToEnglish")}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => switchLocale("es")}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                locale === "es"
                                    ? "bg-[var(--accent-primary)] text-white"
                                    : "text-[var(--foreground-muted)] hover:text-[var(--accent-primary)]"
                            }`}
                            aria-label={tAccessibility("switchToSpanish")}
                        >
                            ES
                        </button>
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all"
                        aria-label={t("toggleTheme")}
                    >
                        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    </button>

                    {/* Social Links */}
                    <div className="flex gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.labelKey}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all"
                                aria-label={t(link.labelKey)}
                            >
                                <link.icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
}
