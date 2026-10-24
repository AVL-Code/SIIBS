---
id: task-15
github_issue: 15
title: "[Feat] Implement socioeconomic profile and HouseholdIncome management"
status: todo
assignee: ""
milestone: stage-3-assistance-mvp
labels:
  - module:assistance
  - type:feat
dependencies:
  - task-14
---

## Context & SDD References
- **Requirements:** `RF-07`, `RF-11`, `RF-13`, `RNF-02` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-007`, `DA-008` (`docs/sdd/DECISIONS.md`)
- **UX Guidelines:** `docs/sdd/05-ux.md`
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#social`
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 3 — Implementar dados socioeconômicos e rendas)

## Description
Implement socioeconomic assessment data and `assistance.household_incomes` management for households and their members, including automated household and per-capita income calculations, strict RBAC protection, and atomic audit logging.

## Acceptance Criteria
- [ ] Create PostgreSQL tables/columns in schema `assistance` for household socioeconomic characterization (housing condition, vulnerability indicators, expenses) and `assistance.household_incomes` (linked to `household_id` and optionally `person_id`, source/type, amount, frequency, validity dates).
- [ ] Implement domain calculation logic for total household income and per-capita income based on active household members.
- [ ] Enforce backend `PermissionGuard` (`assistance:income:read`, `assistance:household:write`) and record `AuditEvent` on all mutations.
- [ ] Build UI views clearly separated from general `Person` registration (`05-ux.md`).
- [ ] Write unit tests for socioeconomic calculations and integration tests for persistence, audit logging, and privacy isolation.

## Definition of Done
- Socioeconomic and income records are persisted, calculated accurately, audited, and inaccessible to users without `assistance` permissions.

