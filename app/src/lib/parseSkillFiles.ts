import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ExperienceData {
    company: string;
    role: string;
    period: string;
    description: string;
    highlights: string[];
    technologies: string[];
}

/**
 * Parse SKILL.md files and extract experience data
 *
 * Reads markdown files with frontmatter from skills/jobs/ directory
 * and extracts structured data for the portfolio
 */
export function parseSkillFiles(locale: string = "en"): ExperienceData[] {
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

    const experiences: ExperienceData[] = [];

    for (const folder of jobFolders) {
        // Try locale-specific file first, then fall back to generic
        const localeSkillPath = path.join(skillsDir, folder, `SKILL.${locale}.md`);
        const genericSkillPath = path.join(skillsDir, folder, "SKILL.md");
        const skillPath = fs.existsSync(localeSkillPath) ? localeSkillPath : genericSkillPath;

        if (!fs.existsSync(skillPath)) {
            continue;
        }

        try {
            const fileContent = fs.readFileSync(skillPath, "utf-8");
            const { data, content } = matter(fileContent);

            // Extract company, role, period, description, and highlights from markdown content
            const lines = content.split("\n");
            let company = "";
            let role = "";
            let period = "";
            let description = "";
            const highlights: string[] = [];
            const technologies: string[] = [];

            let inContextSection = false;
            let inKeyProjectsSection = false;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();

                // Extract role from heading (e.g., "# Role: Software Engineer at FINCEA" or "# Role: Freelance Software Engineer")
                if (line.startsWith("# Role:")) {
                    const matchWithCompany = line.match(/# Role: (.+) at (.+)/);
                    if (matchWithCompany) {
                        role = matchWithCompany[1].trim();
                        company = matchWithCompany[2].trim();
                    } else {
                        // Handle case without "at" (e.g., "# Role: Freelance Software Engineer")
                        const roleText = line.replace("# Role:", "").trim();
                        role = roleText;
                        // If it starts with "Freelance", use "Freelance" as company
                        if (roleText.startsWith("Freelance")) {
                            company = "Freelance";
                            role = roleText.replace("Freelance", "").trim();
                        }
                    }
                }

                // Extract timeline
                if (line.startsWith("**Timeline**:")) {
                    period = line.replace("**Timeline**:", "").trim();
                }

                // Track when we enter Context section
                if (line.startsWith("## Context")) {
                    inContextSection = true;
                    inKeyProjectsSection = false;
                    continue;
                }

                // Track when we enter Key Projects section
                if (line.startsWith("## Key Projects")) {
                    inKeyProjectsSection = true;
                    inContextSection = false;
                    continue;
                }

                // Extract description from Context section (first paragraph)
                if (inContextSection && line.length > 0 && !line.startsWith("#")) {
                    if (!description) {
                        description = line;
                    }
                }

                // Extract highlights from Key Projects section
                if (inKeyProjectsSection && line.startsWith("- **")) {
                    // Extract just the title before the colon
                    const match = line.match(/^- \*\*(.+?)\*\*/);
                    if (match) {
                        highlights.push(match[1].trim());
                    }
                }

                // Stop context/projects sections when we hit another heading
                if (line.startsWith("##") && !line.startsWith("## Context") && !line.startsWith("## Key Projects")) {
                    inContextSection = false;
                    inKeyProjectsSection = false;
                }
            }

            // For now, use folder name to determine technologies
            // TODO: Extract from content or add to frontmatter
            const techMap: Record<string, string[]> = {
                fincea: ["Next.js", "Nest.js", "Python", "PHP", "AWS Lambda", "LLMs", "n8n"],
                kalapata: ["React", "Node.js", "AWS", "MongoDB", "Google Maps API"],
                superior: ["React", "Node.js", "MongoDB"],
                coronado: [".NET WPF", ".NET Core", "SQL Server", "SAP B1"],
                freelance: [".NET Framework", "Elasticsearch", "Next.js", "Node.js"],
            };

            experiences.push({
                company,
                role,
                period,
                description: description || "Full-stack development and architecture.", // Use extracted description
                highlights: highlights.slice(0, 5), // Limit to 5 highlights
                technologies: techMap[folder] || [],
            });
        } catch (error) {
            console.error(`Error parsing ${skillPath}:`, error);
        }
    }

    // Sort by period (most recent first)
    return experiences.sort((a, b) => {
        // Simple heuristic: if period contains "Present", it's most recent
        if (a.period.includes("Present")) return -1;
        if (b.period.includes("Present")) return 1;

        // Extract year from period (e.g., "Jun 2022 - Jul 2024" -> 2022)
        const yearA = parseInt(a.period.match(/\d{4}/)?.[0] || "0");
        const yearB = parseInt(b.period.match(/\d{4}/)?.[0] || "0");

        return yearB - yearA;
    });
}
