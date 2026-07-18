# JoinMe Constitution v1.0

> Status: Approved (Draft v1.0)
> Purpose: Dokumen ini menjadi sumber kebenaran (Source of Truth) untuk seluruh pengembangan JoinMe. Jika implementasi AI bertentangan dengan dokumen ini, maka dokumen ini yang menjadi acuan.

---

# 1. Vision

JoinMe adalah platform SaaS undangan digital berbasis **Theme Engine**, bukan editor drag-and-drop.

Yang dijual adalah **template premium** dan pengalaman membuat undangan dengan cepat.

---

# 2. Product Philosophy

- Template adalah produk.
- Studio hanya untuk mengisi data.
- Fokus pada kecepatan publish, bukan kompleksitas editor.

Target alur pengguna:

Daftar → Pilih Template → Isi Data → Preview → Publish → Share

---

# 3. Core Architecture Principles

## Architecture First
Tidak ada implementasi sebelum arsitektur disepakati.

## SDK First
Semua theme wajib menggunakan JoinMe Theme SDK.

## Runtime Owns Business Logic
Seluruh logika bisnis berada di Runtime.

## Theme Owns Presentation
Theme hanya mengatur layout, UI, animasi, dan pengalaman pengguna.

---

# 4. Theme Development

Theme dibuat sebagai project React terpisah di komputer lokal.

Stack:

- React
- Vite
- TypeScript
- Tailwind CSS

Workflow:

Create Theme → Coding → Preview Lokal → Build → ZIP → Upload

---

# 5. JoinMe Theme SDK

SDK disediakan sebagai package npm.

Contoh:

@joinme/theme-sdk

SDK menyediakan:

## Components

- Cover
- Gallery
- Countdown
- RSVP
- Story
- Timeline
- Gift
- MusicPlayer

## Hooks

- useInvitation()
- useGallery()
- useGuest()
- useMusic()
- useStory()
- useRSVP()

## Utilities

- formatDate()
- copyToClipboard()

## Types

Seluruh model data menggunakan TypeScript.

---

# 6. Runtime Engine

Runtime bertanggung jawab terhadap:

- membaca manifest
- mengambil data
- menyediakan data ke SDK
- menjalankan theme

Runtime adalah satu-satunya lapisan yang mengetahui database.

---

# 7. Theme Rules

Theme wajib:

- menggunakan Theme SDK
- fokus pada UI

Theme dilarang:

- fetch data langsung
- mengakses database
- membuat RSVP sendiri
- membuat Countdown sendiri
- membuat business logic

---

# 8. Manifest

Setiap theme wajib memiliki manifest.json.

Manifest menjadi kontrak antara Theme dan Runtime.

---

# 9. AI First Development

JoinMe dirancang agar mudah dipahami AI.

Setiap package wajib memiliki:

- README
- Examples
- TypeScript Types
- JSDoc
- AI Instructions

---

# 10. Repository Structure (MVP)

joinme/

- apps/
- packages/
- themes/
- docs/

Menggunakan monorepo pada fase awal.

---

# 11. Team Roles

## Product Owner

- menentukan visi
- menentukan roadmap
- menjalankan AI
- testing
- deployment

## Chief Software Architect

- menjaga arsitektur
- mendesain SDK
- mendesain Runtime
- review milestone

## AI Software Engineer

- implementasi kode
- refactor
- testing
- dokumentasi

---

# 12. Development Workflow

Architecture

↓

Specification

↓

AI Implementation

↓

Architecture Review

↓

Approval

↓

Merge

Tidak ada merge tanpa review.

---

# 13. Roadmap

1. Foundation
2. Theme SDK
3. Theme Starter + CLI
4. Runtime Engine
5. Upload Theme
6. Invitation Engine
7. Landing Page
8. Authentication
9. Billing
10. Marketplace

---

# 14. Non-Negotiable Rules

1. Theme tidak boleh mengakses database.
2. Theme tidak boleh melakukan fetch data.
3. Runtime memiliki seluruh business logic.
4. Theme hanya presentation layer.
5. Semua theme menggunakan SDK.
6. Tidak ada editor drag-and-drop pada MVP.
7. Semua perubahan arsitektur harus melalui review.

---

# 15. Long-Term Vision

JoinMe akan berkembang menjadi ekosistem:

- JoinMe Platform
- JoinMe Runtime
- JoinMe Theme SDK
- JoinMe CLI
- JoinMe Theme Starter
- Theme Marketplace
- Dokumentasi AI

Seluruh ekosistem dibangun agar developer manusia maupun AI dapat membuat theme dengan cepat, konsisten, dan mudah dipelihara.

---

# Motto

> "Architecture before implementation. Consistency before speed. Themes are products, Studio is only the tool."
