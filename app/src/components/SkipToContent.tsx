"use client";

import { useTranslations } from "next-intl";

/**
 * Skip to Content link for keyboard navigation
 * Appears when focused with Tab key
 */
export default function SkipToContent() {
    const t = useTranslations("accessibility");

    return (
        <a
            href="#main-content"
            className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:px-4 focus-visible:py-2 focus-visible:bg-[var(--accent-primary)] focus-visible:text-white focus-visible:rounded-md focus-visible:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2"
        >
            {t("skipToContent")}
        </a>
    );
}
