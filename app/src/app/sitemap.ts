import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const lastModified = new Date();
    const locales = ["en", "es"];

    // Generate sitemap entries for each locale
    const entries: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        // Home page
        entries.push({
            url: `${baseUrl}/${locale}`,
            lastModified,
            changeFrequency: "monthly",
            priority: 1,
            alternates: {
                languages: {
                    en: `${baseUrl}/en`,
                    es: `${baseUrl}/es`,
                },
            },
        });

        // Skills section
        entries.push({
            url: `${baseUrl}/${locale}#skills`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
            alternates: {
                languages: {
                    en: `${baseUrl}/en#skills`,
                    es: `${baseUrl}/es#skills`,
                },
            },
        });

        // Projects section
        entries.push({
            url: `${baseUrl}/${locale}#projects`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
            alternates: {
                languages: {
                    en: `${baseUrl}/en#projects`,
                    es: `${baseUrl}/es#projects`,
                },
            },
        });

        // Experience section
        entries.push({
            url: `${baseUrl}/${locale}#experience`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
            alternates: {
                languages: {
                    en: `${baseUrl}/en#experience`,
                    es: `${baseUrl}/es#experience`,
                },
            },
        });

        // Contact section
        entries.push({
            url: `${baseUrl}/${locale}#contact`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.5,
            alternates: {
                languages: {
                    en: `${baseUrl}/en#contact`,
                    es: `${baseUrl}/es#contact`,
                },
            },
        });
    });

    return entries;
}
