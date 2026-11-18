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
- **Requirements:** `RF-01`, `RF-13`, `RF-15`, `RNF-01`, `RNF-04` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-003`, `DA-005`, `DA-008`, `DA-011`, `DA-013`, `DA-015` (`docs/sdd/DECISIONS.md`)
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#pessoas-e-documentos`
- **UX Guidelines:** `docs/sdd/05-ux.md`
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 2 — Implementar Pessoa com identificador interno, foto opcional e criptografia de CPF; Auditar alterações em dados/documentos)

## Description
Implement the shared `Person` (including optional identification photo capture/upload and encrypted CPF with blind indexing) and `PersonContact` persistence models in the `registry` schema, `PersonService` public contract (`create`, `getById`, `update`, `uploadPhoto`, `getPhotoStream`, `removePhoto`, `manageContacts`), and UI views for creating/editing a person with webcam/upload photo support, explicit cross-module shared data notices, and atomic audit logging.

## Acceptance Criteria
- [ ] Create `registry.persons` (including `cpf_encrypted`, `cpf_blind_index`, and optional photo metadata `photo_storage_key`, `photo_mime_type`, `photo_size_bytes`, `photo_checksum_sha256`, `photo_updated_at`) and `registry.person_contacts` tables using `UUIDv7` primary keys (`DA-011`, `DA-013`, `DA-015`), without redundant module flags (`is_active_assistance`, etc.).
- [ ] Implement protected local photo storage in `./storage/photos/` with image validation, compression/resize (`WebP`/`JPEG` up to 500 KB), `AES-256-GCM` encryption at rest, and authenticated streaming endpoint (`GET /api/v1/persons/:personId/photo`, `PUT /api/v1/persons/:personId/photo`, `DELETE /api/v1/persons/:personId/photo`).
- [ ] Define Zod input/output DTO schemas in `src/modules/registry/schemas/`.
- [ ] Implement `PersonService` enforcing `PermissionGuard` (`registry:person:read`, `registry:person:write`) and executing mutations (including photo updates) inside `withAuditedTransaction`, recording `source_module`, `changed_fields`, `previous_values`, and `new_values` (`DA-008`).
- [ ] Build UI forms/views for viewing and editing `Person` (including webcam capture or image upload with preview) and `PersonContact`, displaying a clear notice that changes to shared `Person` data and photo immediately reflect across all modules (`05-ux.md`).
- [ ] Write unit and PostgreSQL integration tests verifying creation, CPF encryption + blind index lookup, photo upload/authorization, shared update reflection, RBAC enforcement, and atomic `AuditEvent` generation.

## Definition of Done
- `PersonService` is exported via `src/modules/registry/index.ts`.
- Integration tests confirm shared updates are immediately visible and audited with `source_module`.

