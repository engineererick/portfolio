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
    links?: { label: string; url: string }[];
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
        // Discover all PORTFOLIO files in this folder
        // Supports: PORTFOLIO.en.md, PORTFOLIO.my-project.en.md, PORTFOLIO.md
        const folderPath = path.join(skillsDir, folder);
        const allFiles = fs.readdirSync(folderPath);
        const portfolioFiles = allFiles.filter((f) => {
            const lower = f.toLowerCase();
            // Match locale-specific: PORTFOLIO.en.md, PORTFOLIO.xyz.en.md
            if (lower.startsWith("portfolio") && lower.endsWith(`.${locale}.md`)) return true;
            // Match generic: PORTFOLIO.md (only if no locale-specific version exists)
            if (lower === "portfolio.md" && !allFiles.some((g) => g.toLowerCase() === `portfolio.${locale}.md`)) return true;
            return false;
        });

        // Skip if no PORTFOLIO files exist
        if (portfolioFiles.length === 0) {
            continue;
        }

        for (const portfolioFile of portfolioFiles) {
            const portfolioPath = path.join(folderPath, portfolioFile);

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
                const links: { label: string; url: string }[] = [];
                let metrics: PortfolioProject["metrics"] = {};

                let inVisionGeneralSection = false;
                let inFeaturesSection = false;
                let inTechStackFrontend = false;
                let inTechStackBackend = false;
                let inMetricsSection = false;
                let inLinksSection = false;
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
                        inLinksSection = false;
                        continue;
                    }

                    // Track Links section
                    if (line === "## Links" || line === "## Enlaces") {
                        inLinksSection = true;
                        inMetricsSection = false;
                        inTechStackFrontend = false;
                        inTechStackBackend = false;
                        continue;
                    }

                    // Extract links from table
                    if (inLinksSection && line.startsWith("| **")) {
                        const match = line.match(/\|\s*\*\*(.+?)\*\*\s*\|\s*(https?:\/\/\S+)\s*\|/);
                        if (match) {
                            links.push({ label: match[1].trim(), url: match[2].trim() });
                        }
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
                    if (line.startsWith("## ") && !line.includes("Visión General") && !line.includes("Vision General") && !line.includes("Características") && !line.includes("Caracteristicas") && !line.includes("Links") && !line.includes("Enlaces")) {
                        inVisionGeneralSection = false;
                        inFeaturesSection = false;
                        inTechStackFrontend = false;
                        inTechStackBackend = false;
                        inMetricsSection = false;
                        inLinksSection = false;
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

                // Generate a unique slug for multi-file folders
                const slugBase = folder;
                const fileSlug = portfolioFile
                    .replace(`PORTFOLIO.`, "")
                    .replace(`.${locale}.md`, "")
                    .replace(".md", "");
                const slug = fileSlug && fileSlug !== slugBase ? `${slugBase}-${fileSlug}` : slugBase;

                projects.push({
                    slug,
                    company: companyMap[folder] || folder,
                    title: title || "Untitled Project",
                    summary: summary || "Full-stack development project with modern architecture.",
                    techStack: {
                        frontend: techStackFrontend,
                        backend: techStackBackend,
                        other: techStackOther,
                    },
                    features: features.slice(0, 6), // Limit to 6 features
                    links: links.length > 0 ? links : undefined,
                    metrics: Object.keys(metrics).length > 0 ? metrics : undefined,
                });
            } catch (error) {
                console.error(`Error parsing ${portfolioPath}:`, error);
            }
        } // end for portfolioFiles
    }

    return projects;
}
