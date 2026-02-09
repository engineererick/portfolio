# Reporteador - Sistema de Gestión Financiera y Administrativa

> **Aplicación full-stack empresarial** para la administración de arrendamientos, facturación electrónica, pagos, activos y análisis de cartera financiera.

---

## Visión General

**Reporteador** es una plataforma integral diseñada para empresas de arrendamiento financiero y operativo. El sistema permite gestionar todo el ciclo de vida de los contratos: desde el registro de activos, pasando por la facturación electrónica (CFDI), aplicación de pagos, hasta el análisis de riesgo y reportes financieros.

### Características Principales

| Área | Capacidades |
|------|-------------|
| **Facturación Electrónica (CFDI)** | Procesamiento masivo de XML, validación SAT, detección automática de duplicados, jobs asíncronos en cola |
| **Procesamiento de Pagos** | Pagos manuales y domiciliados, conciliación automática, aplicación FIFO a arrendamientos vencidos |
| **Gestión de Activos** | Inventario completo con GPS, seguros, placas, gestión documental S3 con URLs prefirmadas |
| **Scoring Crediticio y Analítica** | Scoring de clientes basado en ML, análisis de cartera financiera, reportes regulatorios (CRB, CDD) |
| **Portal Comercial** | Dashboards de asesores, asignación de clientes, métricas de desempeño, seguimiento de conversión |
| **Visualización GIS** | Google Maps con clustering, filtrado por código postal, heatmaps de activos |

---

## Stack Tecnológico

### Frontend
| Tecnología | Uso |
|------------|-----|
| **Next.js 16** | Framework React con App Router y RSC |
| **React 19** | Librería UI con Server Components |
| **TypeScript** | Tipado estático en todo el código |
| **Tailwind CSS 4** | Estilos utility-first |
| **Shadcn/ui** | Librería de componentes accesibles (Radix UI) |
| **Zustand** | Gestión de estado global ligera |
| **Recharts** | Gráficos financieros y visualización de datos |
| **TanStack Table** | Tablas avanzadas con ordenamiento, filtrado y paginación |
| **Google Maps** | Visualización GIS con clustering |

### Backend
| Tecnología | Uso |
|------------|-----|
| **Laravel 12** | Framework PHP con jobs en cola |
| **PHP 8.2** | Lenguaje del lado del servidor |
| **Laravel Sanctum** | Autenticación API con gestión de tokens |
| **Redis** | Procesamiento de colas y caché |
| **AWS S3** | Almacenamiento de documentos con URLs prefirmadas |
| **AWS EC2** | Infraestructura de cómputo en la nube |
| **AWS Lambda** | Funciones serverless para procesamiento asíncrono |
| **MySQL** | Base de datos relacional de producción |
| **DomPDF** | Generación automatizada de PDF |

---

## Licencia

Proyecto privado - Todos los derechos reservados.