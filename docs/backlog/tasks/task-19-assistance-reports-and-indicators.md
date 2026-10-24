---
id: task-19
github_issue: 19
title: "[Feat] Implement Assistance basic reports and indicators with RBAC enforcement"
status: todo
assignee: ""
milestone: stage-3-assistance-mvp
labels:
  - module:assistance
  - type:feat
dependencies:
  - task-15
  - task-16
  - task-17
  - task-18
---

## Context & SDD References
- **Requirements:** `RF-12`, `RNF-01`, `RNF-02` (`docs/sdd/02-requirements.md`)
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#social`
- **Tech Spec:** `docs/sdd/11-tech-spec.md` (§3.1 Module Structure)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 3 — Implementar relatórios/indicadores básicos)

## Description
Implement `AssistanceReportService` and dashboard/report screens providing basic Social Assistance indicators and filtered operational reports while strictly enforcing backend RBAC permissions.

## Acceptance Criteria
- [ ] Implement `AssistanceReportService` in `src/modules/assistance/application/` with date-range and category filters for:
  - Total active households and registered household members.
  - Social attendances performed in a period (by outcome/referral).
  - Emergency vs. recurring baskets delivered in a period.
  - Active project participations and social benefits/programs.
- [ ] Enforce `PermissionGuard.assertCan(actor, 'assistance:report:read')` on all report queries (`09-acceptance.md`).
- [ ] Build UI dashboard and printable/exportable basic summary views in `frontend/src/features/assistance/reports`.
- [ ] Write integration tests verifying aggregation accuracy and `ForbiddenError` for unauthorized roles.

## Definition of Done
- Authorized users can consult Social Assistance indicators and basic reports; unauthorized users are blocked at the service layer.

