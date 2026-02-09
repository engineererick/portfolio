# Reporteador - Financial & Administrative Management System

> **Enterprise full-stack application** for lease management, electronic invoicing, payments, assets, and financial portfolio analysis.

---

## Overview

**Reporteador** is a comprehensive platform designed for financial and operational leasing companies. The system manages the entire contract lifecycle: from asset registration, through electronic invoicing (CFDI), payment processing, to risk analysis and financial reporting.

### Key Features

| Area | Capabilities |
|------|-------------|
| **Electronic Invoicing (CFDI)** | Batch XML processing, SAT validation, automatic duplicate detection, async queue jobs |
| **Payment Processing** | Manual and direct debit payments, automatic reconciliation, FIFO application to overdue leases |
| **Asset Management** | Full inventory with GPS, insurance, plates tracking, S3 document management with presigned URLs |
| **Credit Scoring & Analytics** | ML-based client scoring, financial portfolio analysis, regulatory reports (CRB, CDD) |
| **Commercial Portal** | Advisor dashboards, client assignment, performance metrics, conversion tracking |
| **GIS Visualization** | Google Maps with clustering, postal code filtering, asset heatmaps |

---

## Tech Stack

### Frontend
| Technology | Use |
|------------|-----|
| **Next.js 16** | React framework with App Router and RSC |
| **React 19** | UI library with Server Components |
| **TypeScript** | Static typing across the codebase |
| **Tailwind CSS 4** | Utility-first styling |
| **Shadcn/ui** | Accessible component library (Radix UI) |
| **Zustand** | Lightweight global state management |
| **Recharts** | Financial charts and data visualizations |
| **TanStack Table** | Advanced tables with sorting, filtering, pagination |
| **Google Maps** | GIS visualization with clustering |

### Backend
| Technology | Use |
|------------|-----|
| **Laravel 12** | PHP framework with queue jobs |
| **PHP 8.2** | Server-side language |
| **Laravel Sanctum** | API authentication with token management |
| **Redis** | Queue processing and caching |
| **AWS S3** | Document storage with presigned URLs |
| **AWS EC2** | Cloud compute infrastructure |
| **AWS Lambda** | Serverless functions for async processing |
| **MySQL** | Production relational database |
| **DomPDF** | Automated PDF generation |

---

## License

Private project - All rights reserved.
