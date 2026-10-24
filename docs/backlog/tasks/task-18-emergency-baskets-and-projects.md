---
id: task-18
github_issue: 18
title: "[Feat] Implement Emergency Baskets and Project Participation tracking"
status: todo
assignee: ""
milestone: stage-3-assistance-mvp
labels:
  - module:assistance
  - type:feat
dependencies:
  - task-14
  - task-17
---

## Context & SDD References
- **Requirements:** `RF-10`, `RF-11`, `RF-13`, `RNF-02` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-007`, `DA-008` (`docs/sdd/DECISIONS.md`)
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#social`
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 3 — Implementar cestas e participação em projetos)

## Description
Implement `assistance.emergency_baskets` (`CestaBeneficio`) and `assistance.project_participations` (`ParticipacaoProjeto`) to track emergency/recurring basket deliveries and participation in institutional social projects, distinguishing between emergency and recurring modalities.

## Acceptance Criteria
- [ ] Create `assistance.emergency_baskets` table with `household_id`, recipient `person_id`, optional linked `attendance_id`, modality (`EMERGENCY` vs. `RECURRING`), delivery date, status, and responsible user.
- [ ] Create `assistance.project_participations` table with `household_id`, participant `person_id`, project name/modality, `started_at`, `ended_at`, status, and observations.
- [ ] Implement service operations in `modules/assistance` with `PermissionGuard` and atomic `AuditEvent` logging.
- [ ] Build UI views for recording and consulting basket deliveries and project participations per household/person.
- [ ] Write unit and integration tests covering emergency vs. recurring basket rules, project participation history, and audit logging.

## Definition of Done
- Emergency and recurring baskets and social project participations are persisted, distinguishable, and visible in the household history.

