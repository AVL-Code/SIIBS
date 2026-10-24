---
id: task-07
github_issue: 7
title: "[Feat] Implement transversal append-only Audit module and transactional logging helper"
status: todo
assignee: ""
milestone: stage-1-foundations
labels:
  - module:audit
  - type:feat
dependencies:
  - task-04
  - task-06
---

## Context & SDD References
- **Requirements:** `RF-13`, `RNF-03` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-008` (`docs/sdd/DECISIONS.md`)
- **Audit Spec:** `docs/sdd/AUDIT.md`
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#segurança-e-operação`
- **Tech Spec:** `docs/sdd/11-tech-spec.md` (§1.2 Database, §3.2 Atomic Business + Audit Transactions, §4.2 Append-Only Audit)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 1 — Implementar auditoria transversal)

## Description
Implement the `audit` module (`audit.events`) as an append-only audit trail and provide a transactional execution helper that guarantees every domain mutation and its corresponding `AuditEvent` are committed atomically in the same PostgreSQL transaction.

## Acceptance Criteria
- [ ] Create `audit.events` table in PostgreSQL with `id` (`UUIDv7`), `created_at` (`TIMESTAMPTZ`), `actor_user_id`, `source_module` (`IAM`, `REGISTRY`, `ASSISTANCE`, `EDUCATION`), `action`, `entity_type`, `entity_id`, `result`, `changed_fields` (`JSONB`), `previous_values` (`JSONB`), `new_values` (`JSONB`), and `justification`.
- [ ] Add PostgreSQL trigger/rule on `audit.events` blocking `UPDATE` and `DELETE` statements to guarantee append-only immutability (`AUDIT.md`).
- [ ] Implement `AuditService` (`record`, `queryEvents`) with automatic sensitive field redaction (never logging passwords, session tokens, or secrets) and RBAC validation (`audit:event:read`).
- [ ] Implement transactional helper (`withAuditedTransaction`) ensuring that if `AuditService.record` fails, the entire domain database transaction rolls back (`DA-008`).
- [ ] Write integration tests verifying atomic rollback and rejection of `UPDATE`/`DELETE` on `audit.events`.

## Definition of Done
- `audit.events` enforces append-only behavior at both repository and PostgreSQL database levels.
- Transactional wrapper is exported via `src/modules/audit/index.ts` and tested against PostgreSQL.

