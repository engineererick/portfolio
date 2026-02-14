# AI Skill Generator - CLI Multiplataforma para Asistentes de Código IA

> **Herramienta CLI open-source** para crear, validar, empaquetar e instalar skills en 9+ asistentes de código IA incluyendo Claude, Cursor, Copilot y Codex.

---

## Visión General

**AI Skill Generator** es un CLI empresarial en Node.js que estandariza el ciclo de vida del desarrollo con IA. Resuelve el problema de crear, actualizar y sincronizar manualmente "skills" (prompts de sistema y archivos de contexto) entre diferentes entornos de código IA. Con 7 plantillas configurables, un sistema de empaquetado y la instalación multi-agente, elimina la duplicación de prompts y asegura consistencia entre equipos.

### Características Principales

| Área | Capacidades |
|------|-------------|
| **7 Plantillas Integradas** | REST API, Full-Stack, Frontend, Microservicio, DevOps, Librería y Básica con opciones configurables |
| **Plantillas Personalizadas** | Creación de plantillas en YAML con variables y preguntas para flujos reutilizables |
| **Vista Previa Interactiva** | Vista previa de SKILL.md con resaltado de sintaxis antes de escribir a disco |
| **Actualización de Skills** | Modificar skills existentes sin recrear desde cero con `skill-gen update` |
| **Empaquetado y Distribución** | Generación de archivos `.skill` (zip) para compartir fácilmente entre equipos |
| **Instalación Multi-Agente** | Instalación de skills en 9 agentes IA a la vez (Claude, Cursor, Copilot, Codex, Gemini y más) |

---

## Stack Tecnológico

### Frontend
| Tecnología | Uso |
|------------|-----|
| **TypeScript** | Base de código 100% tipada con modo estricto |
| **Ink + React** | Renderizado de UI en terminal con componentes interactivos |
| **Chalk** | Salida en terminal con resaltado de sintaxis |

### Backend
| Tecnología | Uso |
|------------|-----|
| **Node.js** | Runtime para ejecución del CLI |
| **Commander.js** | Parseo de comandos, flags y subcomandos |
| **Gray-Matter** | Parseo de frontmatter YAML para archivos SKILL.md |
| **Archiver** | Empaquetado zip para distribución de archivos `.skill` |
| **Handlebars** | Motor de plantillas para generación de skills |
| **Vitest** | Testing unitario y funcional (24 tests) |

---

## Enlaces

| Etiqueta | URL |
|----------|-----|
| **GitHub** | https://github.com/engineererick/ai-skill-generator |
| **npm** | https://www.npmjs.com/package/ai-skill-generator |

---

## Licencia

MIT - Proyecto open source.
