---
id: task-21
github_issue: 21
title: "[Test] Implement authorization, privacy isolation, and endpoint security tests"
status: todo
assignee: ""
milestone: stage-4-quality-operations
labels:
  - module:iam
  - type:test
dependencies:
  - task-06
  - task-11
  - task-19
---

## Context & SDD References
- **Requirements:** `RF-14`, `RNF-01`, `RNF-02` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-007` (`docs/sdd/DECISIONS.md`)
- **Security Spec:** `docs/sdd/SECURITY.md`
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#segurança-e-operação`
- **Tech Spec:** `docs/sdd/11-tech-spec.md` (§3.2 Backend Authorization Enforcement, §4.3 Explicit DTOs, §5.2 Testing Strategy)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 4 — Testes de autorização e privacidade)

## Description
Implement automated security, RBAC, and privacy isolation tests proving that backend authorization cannot be bypassed by direct route/action invocation and that sensitive Social Assistance data is never exposed to unauthorized roles.

## Acceptance Criteria
- [ ] Write integration and E2E tests attempting to call every `registry`, `assistance`, `audit`, and `iam` service/action and document download route unauthenticated (`UnauthorizedError`) and with insufficient role permissions (`ForbiddenError`).
- [ ] Write privacy isolation tests proving a user with only `registry` (or future `education`) permissions can read/reuse basic `Person` data but receives zero sensitive `assistance` data (attendances, socioeconomic profile, incomes, benefits, emergency baskets).
- [ ] Verify that protected files in `./storage/documents/` cannot be accessed via static public paths or without `registry:document:read` permission.
- [ ] Verify error responses and logs never leak stack traces, database internals, password hashes, or session secrets (`SECURITY.md`).

## Definition of Done
- All security and privacy acceptance criteria in `09-acceptance.md#segurança-e-operação` are verified by automated tests.

