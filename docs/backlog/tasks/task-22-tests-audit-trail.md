---
id: task-22
github_issue: 22
title: "[Test] Implement transactional Audit trail and append-only protection tests"
status: todo
assignee: ""
milestone: stage-4-quality-operations
labels:
  - module:audit
  - type:test
dependencies:
  - task-07
  - task-10
  - task-14
  - task-17
---

## Context & SDD References
- **Requirements:** `RF-13`, `RNF-03` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-008` (`docs/sdd/DECISIONS.md`)
- **Audit Spec:** `docs/sdd/AUDIT.md`
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#segurança-e-operação`
- **Tech Spec:** `docs/sdd/11-tech-spec.md` (§3.2 Atomic Business + Audit Transactions, §4.2 Append-Only Audit, §5.2 Testing Strategy)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 4 — Testes de auditoria)

## Description
Implement end-to-end audit verification tests ensuring every relevant mutation across `iam`, `registry`, and `assistance` records a complete `AuditEvent` atomically, and that audit records cannot be modified or deleted.

## Acceptance Criteria
- [ ] Write integration tests verifying that creating/updating `Person`, `PersonDocument`, `Household`, `HouseholdMember` (including head change), `HouseholdIncome`, `Benefit`, `Attendance`, `EmergencyBasket`, and `ProjectParticipation` each produces an `AuditEvent` containing `actor_user_id`, `created_at`, `source_module`, `action`, `entity_type`, `entity_id`, and `changed_fields`.
- [ ] Write fault-injection integration tests proving that if `audit.events` insertion fails, the domain mutation in `registry` or `assistance` rolls back completely (`DA-008`).
- [ ] Write tests confirming `UPDATE` and `DELETE` against `audit.events` fail at the PostgreSQL level and non-authorized users cannot query the audit trail (`AUDIT.md`).

## Definition of Done
- 100% of audited domain operations are verified for completeness, transactional atomicity, and immutability.

