---
id: task-17
github_issue: 17
title: "[Feat] Implement Social Attendance, evaluation, referrals, and historical timeline"
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
- **Requirements:** `RF-09`, `RF-11`, `RF-13`, `RNF-02` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-007`, `DA-008` (`docs/sdd/DECISIONS.md`)
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#social`
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 3 — Implementar atendimentos, avaliações e histórico)

## Description
Implement `assistance.attendances` and `AttendanceService` to record social attendances, responsible professional (`iam.users`), attended person/household, social evaluations/observations, referrals, and decisions, along with a chronological history view of attendances and relevant household changes.

## Acceptance Criteria
- [ ] Create `assistance.attendances` table in PostgreSQL with `id` (`UUIDv7`), `household_id`, attended `person_id`, `responsible_user_id` (`iam.users`), `attended_at` (`TIMESTAMPTZ`), evaluation/notes, referrals, decision/outcome, and timestamps.
- [ ] Implement `AttendanceService` (`registerAttendance`, `updateAttendance`, `getHouseholdHistory`) enforcing `PermissionGuard` (`assistance:attendance:read`, `assistance:attendance:write`) and atomic `AuditEvent` logging.
- [ ] Build UI for registering a social attendance and viewing the chronological history of attendances and relevant changes for a person/household (`RF-11`, `05-ux.md`).
- [ ] Ensure attendance records cannot be physically deleted (soft-state / append history) and are strictly isolated from non-Social roles (`RNF-02`).
- [ ] Write unit and PostgreSQL integration tests for attendance creation, history retrieval, RBAC enforcement, and audit logging.

## Definition of Done
- Social workers can record attendances, evaluations, referrals, and decisions, and inspect the complete historical timeline.

