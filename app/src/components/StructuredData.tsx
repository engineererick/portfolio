/**
 * JSON-LD Structured Data for SEO
 * Helps search engines understand the content better
 */

interface StructuredDataProps {
    locale: string;
}

const translations = {
    en: {
        jobTitle: "Software Engineer & Fintech Architect",
        personDescription: "Software Engineer with 5+ years of experience building scalable fintech solutions",
        websiteDescription: "Professional portfolio of Erick Galindo, Software Engineer specializing in fintech solutions",
        serviceName: "Erick Galindo - Software Engineering Services",
        serviceDescription: "Full-stack development, fintech architecture, and AI integration services",
    },
    es: {
        jobTitle: "Ingeniero de Software y Arquitecto Fintech",
        personDescription: "Ingeniero de Software con mas de 5 anos de experiencia construyendo soluciones fintech escalables",
        websiteDescription: "Portafolio profesional de Erick Galindo, Ingeniero de Software especializado en soluciones fintech",
        serviceName: "Erick Galindo - Servicios de Ingenieria de Software",
        serviceDescription: "Desarrollo full-stack, arquitectura fintech e integracion de servicios de IA",
    },
};

export default function StructuredData({ locale }: StructuredDataProps) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const t = translations[locale as keyof typeof translations] || translations.en;

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Erick Galindo Chavez",
        jobTitle: t.jobTitle,
        description: t.personDescription,
        url: siteUrl,
        image: `${siteUrl}/og-image.png`,
        address: {
            "@type": "PostalAddress",
            addressLocality: "San Luis Potosi",
            addressCountry: "Mexico",
        },
        knowsAbout: [
            "Software Engineering",
            "Fintech",
            "Next.js",
            "React",
            "Node.js",
            "AI/LLM Integration",
            "Cloud Architecture",
            "Banking Systems",
            "Credit Scoring",
        ],
        alumniOf: {
            "@type": "Organization",
            name: "Universidad Autonoma de San Luis Potosi",
        },
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Erick Galindo Portfolio",
        url: siteUrl,
        description: t.websiteDescription,
        author: {
            "@type": "Person",
            name: "Erick Galindo Chavez",
        },
    };

    const professionalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: t.serviceName,
        description: t.serviceDescription,
        areaServed: {
            "@type": "Country",
            name: "Mexico",
        },
        availableLanguage: ["English", "Spanish"],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(professionalServiceSchema),
                }}
            />
        </>
    );
}
