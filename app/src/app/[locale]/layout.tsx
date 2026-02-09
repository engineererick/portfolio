import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/request";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleTagManager, { GoogleTagManagerNoScript } from "@/components/GoogleAnalytics";
import type { Metadata } from "next";
import "../globals.css";

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
    display: "swap",
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains",
    subsets: ["latin"],
    display: "swap",
});

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata" });
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    return {
        title: t("title"),
        description: t("description"),
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                en: "/en",
                es: "/es",
            },
        },
        openGraph: {
            type: "website",
            locale: locale === "es" ? "es_MX" : "en_US",
            url: `${baseUrl}/${locale}`,
            title: t("title"),
            description: t("description"),
            siteName: "Erick Galindo Portfolio",
            images: [
                {
                    url: "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: t("title"),
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
            images: ["/og-image.png"],
            creator: "@yourtwitterhandle", // TODO: Update with your Twitter handle
        },
        icons: {
            icon: "/images/ico/gorila_logo.ico",
            shortcut: "/images/ico/gorila_logo.ico",
            apple: "/apple-touch-icon.png",
            other: [
                {
                    rel: "icon",
                    type: "image/svg+xml",
                    url: "/images/logo/gorila_logo.svg",
                },
            ],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming locale is valid
    if (!locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html
            lang={locale}
            className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
        >
            <head>
                <StructuredData locale={locale} />
            </head>
            <body>
                <GoogleTagManagerNoScript />
                <ThemeProvider>
                    <NextIntlClientProvider messages={messages}>
                        {children}
                    </NextIntlClientProvider>
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
                <GoogleTagManager />
            </body>
        </html>
    );
}
