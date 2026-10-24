---
id: task-04
github_issue: 4
title: "[Chore] Set up local PostgreSQL 16 environment, multi-schema configuration, and Zod env validation"
status: todo
assignee: ""
milestone: stage-1-foundations
labels:
  - module:shared
  - type:chore
dependencies:
  - task-01
---

## Context & SDD References
- **Requirements:** `RNF-04`, `RNF-05`, `RNF-09` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-002`, `DA-011` (`docs/sdd/DECISIONS.md`)
- **Tech Spec:** `docs/sdd/11-tech-spec.md` (§1.2 Database & Local Persistence, §4.2 PostgreSQL Conventions, §4.3 Domain Errors, §7 Local Operations)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 1 — Confirmar stack e ambiente local; Definir esquema e migrações)

## Description
Configure the local PostgreSQL 16+ database environment, boot-time environment variable validation with Zod, ORM multi-schema setup (`iam`, `audit`, `registry`, `assistance`, `education`), `UUIDv7` identifier generation, and standardized domain error classes.

## Acceptance Criteria
- [ ] Create `docker-compose.yml` providing PostgreSQL 16+ for local development and isolated test database execution.
- [ ] Create `.env.example` and `src/shared/env.ts` using Zod to validate required environment variables at startup (`DATABASE_URL`, `SESSION_SECRET`, `STORAGE_DIR`, `BACKUP_TARGET_DIR`).
- [ ] Configure ORM (Prisma with `multiSchema` or Drizzle) and initial migration creating PostgreSQL schemas: `iam`, `audit`, `registry`, `assistance`, and `education`.
- [ ] Implement `UUIDv7` generator helper in `src/shared/` (`DA-011`) and standardized domain error classes (`NotFoundError`, `ForbiddenError`, `UnauthorizedError`, `ValidationError`, `ConflictError`).

## Definition of Done
- Local database starts via Docker Compose and migrations apply cleanly creating the 5 bounded context schemas.
- Unit test verifies `UUIDv7` temporal ordering and environment validation failure on missing config.

