---
id: task-16
github_issue: 16
title: "[Feat] Implement social Programs and Benefits tracking"
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
- **Requirements:** `RF-08`, `RF-11`, `RF-13`, `RNF-02` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-007`, `DA-008` (`docs/sdd/DECISIONS.md`)
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#social`
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 3 — Implementar programas/benefícios)

## Description
Implement `assistance.benefits` to track household and member participation in social programs and benefits, including entry/exit dates, benefit status, monetary/material value when applicable, and historical records.

## Acceptance Criteria
- [ ] Create `assistance.benefits` table in PostgreSQL with `household_id`, optional beneficiary `person_id`, program/benefit name and category, status (`ACTIVE`, `SUSPENDED`, `ENDED`), `started_at`, `ended_at`, and notes.
- [ ] Implement service methods in `modules/assistance` to register, update, and conclude program/benefit participation with `PermissionGuard` and atomic `AuditEvent` logging.
- [ ] Build UI section within the Household workspace to manage current and historical programs/benefits.
- [ ] Write unit and integration tests validating benefit lifecycle transitions and audit trail creation.

## Definition of Done
- Users with Social permissions can register, update, and view historical program/benefit participation for any household.

