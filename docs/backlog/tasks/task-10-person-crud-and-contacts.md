---
id: task-10
github_issue: 10
title: "[Feat] Implement Person entity, contacts, and PersonService CRUD with atomic audit logging"
status: todo
assignee: ""
milestone: stage-2-registry-core
labels:
  - module:registry
  - type:feat
dependencies:
  - task-06
  - task-07
  - task-09
---

## Context & SDD References
- **Requirements:** `RF-01`, `RF-13`, `RF-15`, `RNF-04` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-003`, `DA-005`, `DA-008`, `DA-011` (`docs/sdd/DECISIONS.md`)
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#pessoas-e-documentos`
- **UX Guidelines:** `docs/sdd/05-ux.md`
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 2 — Implementar Pessoa com identificador interno; Auditar alterações em dados/documentos)

## Description
Implement the shared `Person` and `PersonContact` persistence models in the `registry` schema, `PersonService` public contract (`create`, `getById`, `update`, `manageContacts`), and UI views for creating/editing a person with explicit cross-module shared data notices and atomic audit logging.

## Acceptance Criteria
- [ ] Create `registry.persons` and `registry.person_contacts` tables using `UUIDv7` primary keys (`DA-011`), without redundant module flags (`is_active_assistance`, etc.).
- [ ] Define Zod input/output DTO schemas in `src/modules/registry/schemas/`.
- [ ] Implement `PersonService` enforcing `PermissionGuard` (`registry:person:read`, `registry:person:write`) and executing mutations inside `withAuditedTransaction`, recording `source_module`, `changed_fields`, `previous_values`, and `new_values` (`DA-008`).
- [ ] Build UI forms/views for viewing and editing `Person` and `PersonContact`, displaying a clear notice that changes to shared `Person` data immediately reflect across all modules (`05-ux.md`).
- [ ] Write unit and PostgreSQL integration tests verifying creation, shared update reflection, RBAC enforcement, and atomic `AuditEvent` generation.

## Definition of Done
- `PersonService` is exported via `src/modules/registry/index.ts`.
- Integration tests confirm shared updates are immediately visible and audited with `source_module`.

