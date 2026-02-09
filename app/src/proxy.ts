import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n/request";

// Next.js 16 prefiere exportaciones nombradas para el Proxy
export const proxy = createMiddleware({
    // A list of all locales that are supported
    locales,

    // Used when no locale matches
    defaultLocale: "en",

    // Ignore browser language, always default to EN
    localeDetection: false,

    // Always use locale prefix (e.g., /en/about instead of /about for default)
    localePrefix: "always",
});

export const config = {
    // Match only internationalized pathnames
    // Este matcher es más robusto para Next.js 16
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
