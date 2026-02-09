"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const footerLinks = [
    { icon: Github, href: "https://github.com/", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:erick.galindochavez@gmail.com", label: "Email" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const t = useTranslations("footer");

    return (
        <footer className="relative z-10 px-6 md:px-12 lg:px-24 py-12 border-t border-[var(--border)]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Branding */}
                <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-[var(--foreground-muted)] text-center md:text-left">
                    <span>© {currentYear} Erick Galindo. {t("rights")}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{t("builtWith")}</span>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                    {footerLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] transition-colors"
                            aria-label={link.label}
                        >
                            <link.icon size={20} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
