# AI Skill Generator - Cross-Platform CLI for AI Coding Assistants

> **Open-source CLI tool** to create, validate, package, and install skills for 9+ AI coding assistants including Claude, Cursor, Copilot, and Codex.

---

## Overview

**AI Skill Generator** is an enterprise-grade Node.js CLI that standardizes the AI development lifecycle. It solves the problem of manually creating, updating, and syncing "skills" (system prompts and context files) across different AI coding environments. With 7 configurable templates, a packaging system, and multi-agent installation, it eliminates prompt duplication and ensures consistency across teams.

### Key Features

| Area | Capabilities |
|------|-------------|
| **7 Built-in Templates** | REST API, Full-Stack, Frontend, Microservice, DevOps, Library, and Basic templates with configurable options |
| **Custom Templates** | YAML-based template creation with variables and questions for reusable workflows |
| **Interactive Preview** | Syntax-highlighted SKILL.md preview before writing to disk |
| **Skill Updates** | Modify existing skills without recreating from scratch via `skill-gen update` |
| **Packaging & Distribution** | Generate `.skill` files (zip) for easy sharing across teams |
| **Multi-Agent Install** | Install skills to 9 AI agents at once (Claude, Cursor, Copilot, Codex, Gemini, and more) |

---

## Tech Stack

### Frontend
| Technology | Use |
|------------|-----|
| **TypeScript** | 100% type-safe codebase with strict mode |
| **Ink + React** | Terminal UI rendering with interactive components |
| **Chalk** | Syntax-highlighted terminal output |

### Backend
| Technology | Use |
|------------|-----|
| **Node.js** | Runtime for CLI execution |
| **Commander.js** | Command parsing, flags, and subcommands |
| **Gray-Matter** | YAML frontmatter parsing for SKILL.md files |
| **Archiver** | Zip packaging for `.skill` file distribution |
| **Handlebars** | Template rendering engine for skill generation |
| **Vitest** | Unit and functional testing (24 tests) |

---

## Links

| Label | URL |
|-------|-----|
| **GitHub** | https://github.com/engineererick/ai-skill-generator |
| **npm** | https://www.npmjs.com/package/ai-skill-generator |

---

## License

MIT - Open source project.
