import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PortfolioProject {
    slug: string;
    company: string;
    title: string;
    summary: string;
    techStack: {
        frontend: string[];
        backend: string[];
        other: string[];
    };
    features: string[];
    metrics?: {
        linesOfCodeFrontend?: number;
        linesOfCodeBackend?: number;
        components?: number;
        endpoints?: number;
        modules?: number;
    };
}

/**
 * Parse PORTFOLIO.md files and extract project data
 *
 * Reads markdown files from skills/jobs/ directories
 * and extracts structured data for the featured projects section
 */
export function parsePortfolioFiles(locale: string = "en"): PortfolioProject[] {
    const skillsDir = path.join(process.cwd(), "..", "skills", "jobs");

    // Check if directory exists
    if (!fs.existsSync(skillsDir)) {
        console.warn(`Skills directory not found: ${skillsDir}`);
        return [];
    }

    const jobFolders = fs
        .readdirSync(skillsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    const projects: PortfolioProject[] = [];

    for (const folder of jobFolders) {
        // Try locale-specific file first, then fall back to generic
        const localePortfolioPath = path.join(skillsDir, folder, `PORTFOLIO.${locale}.md`);
        const genericPortfolioPath = path.join(skillsDir, folder, "PORTFOLIO.md");
        const portfolioPath = fs.existsSync(localePortfolioPath) ? localePortfolioPath : genericPortfolioPath;

        // Skip if no PORTFOLIO file exists
        if (!fs.existsSync(portfolioPath)) {
            continue;
        }

        try {
            const fileContent = fs.readFileSync(portfolioPath, "utf-8");
            const { data, content } = matter(fileContent);

            const lines = content.split("\n");
            let title = "";
            let summary = "";
            const features: string[] = [];
            const techStackFrontend: string[] = [];
            const techStackBackend: string[] = [];
            const techStackOther: string[] = [];
            let metrics: PortfolioProject["metrics"] = {};

            let inVisionGeneralSection = false;
            let inFeaturesSection = false;
            let inTechStackFrontend = false;
            let inTechStackBackend = false;
            let inMetricsSection = false;
            let summaryFound = false;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();

                // Extract title from first H1
                if (!title && line.startsWith("# ")) {
                    title = line.replace("# ", "").trim();
                    continue;
                }

                // Track sections
                if (line.includes("Visión General") || line.includes("Vision General") || line.includes("Overview")) {
                    inVisionGeneralSection = true;
                    inFeaturesSection = false;
                    continue;
                }

                if (line.includes("Características Principales") || line.includes("Caracteristicas Principales") || line.includes("Key Features")) {
                    inFeaturesSection = true;
                    inVisionGeneralSection = false;
                    continue;
                }

                // Extract summary from Visión General (first substantial paragraph)
                if (inVisionGeneralSection && !summaryFound && line.length > 50 && !line.startsWith("#") && !line.startsWith("|")) {
                    summary = line.replace(/\*\*/g, "");
                    summaryFound = true;
                }

                // Extract features from bullet lists in Características section
                if (inFeaturesSection && line.startsWith("| **")) {
                    // Extract from table format: | **Area** | Capabilities |
                    const match = line.match(/\|\s*\*\*(.+?)\*\*\s*\|/);
                    if (match && !match[1].includes("Área")) {
                        features.push(match[1].trim());
                    }
                }

                // Track Frontend tech stack section
                if (line.includes("### Frontend") || line.includes("Frontend")) {
                    inTechStackFrontend = true;
                    inTechStackBackend = false;
                    continue;
                }

                // Track Backend tech stack section
                if (line.includes("### Backend") || line.includes("Backend")) {
                    inTechStackBackend = true;
                    inTechStackFrontend = false;
                    continue;
                }

                // Extract tech from tables
                if (inTechStackFrontend && line.startsWith("| **")) {
                    const match = line.match(/\|\s*\*\*(.+?)\*\*\s*\|/);
                    if (match && !match[1].includes("Tecnología")) {
                        techStackFrontend.push(match[1].trim());
                    }
                }

                if (inTechStackBackend && line.startsWith("| **")) {
                    const match = line.match(/\|\s*\*\*(.+?)\*\*\s*\|/);
                    if (match && !match[1].includes("Tecnología")) {
                        techStackBackend.push(match[1].trim());
                    }
                }

                // Track Metrics section
                if (line.includes("Métricas del Proyecto") || line.includes("Project Metrics")) {
                    inMetricsSection = true;
                    continue;
                }

                // Extract metrics from table
                if (inMetricsSection && line.startsWith("|")) {
                    if (line.includes("Líneas de código Frontend")) {
                        const match = line.match(/\|\s*~?(\d+,?\d*)\+?\s*\|/);
                        if (match) {
                            metrics.linesOfCodeFrontend = parseInt(match[1].replace(",", ""));
                        }
                    }
                    if (line.includes("Líneas de código Backend")) {
                        const match = line.match(/\|\s*~?(\d+,?\d*)\+?\s*\|/);
                        if (match) {
                            metrics.linesOfCodeBackend = parseInt(match[1].replace(",", ""));
                        }
                    }
                    if (line.includes("Componentes UI")) {
                        const match = line.match(/\|\s*(\d+)\+?\s*\|/);
                        if (match) {
                            metrics.components = parseInt(match[1]);
                        }
                    }
                    if (line.includes("Endpoints API")) {
                        const match = line.match(/\|\s*(\d+)\+?\s*\|/);
                        if (match) {
                            metrics.endpoints = parseInt(match[1]);
                        }
                    }
                    if (line.includes("Módulos principales")) {
                        const match = line.match(/\|\s*(\d+)\s*\|/);
                        if (match) {
                            metrics.modules = parseInt(match[1]);
                        }
                    }
                }

                // Stop sections when we hit another major heading
                if (line.startsWith("## ") && !line.includes("Visión General") && !line.includes("Vision General") && !line.includes("Características") && !line.includes("Caracteristicas")) {
                    inVisionGeneralSection = false;
                    inFeaturesSection = false;
                    inTechStackFrontend = false;
                    inTechStackBackend = false;
                    inMetricsSection = false;
                }
            }

            // Map folder name to company
            const companyMap: Record<string, string> = {
                fincea: "FINCEA",
                kalapata: "Kalapata",
                superior: "Colegio Superior",
                coronado: "Autotransportes Coronado",
                freelance: "Freelance",
            };

            projects.push({
                slug: folder,
                company: companyMap[folder] || folder,
                title: title || "Untitled Project",
                summary: summary || "Full-stack development project with modern architecture.",
                techStack: {
                    frontend: techStackFrontend,
                    backend: techStackBackend,
                    other: techStackOther,
                },
                features: features.slice(0, 6), // Limit to 6 features
                metrics: Object.keys(metrics).length > 0 ? metrics : undefined,
            });
        } catch (error) {
            console.error(`Error parsing ${portfolioPath}:`, error);
        }
    }

    return projects;
}
