---
id: task-11
github_issue: 11
title: "[Feat] Implement PersonDocumentService and protected local file storage"
status: todo
assignee: ""
milestone: stage-2-registry-core
labels:
  - module:registry
  - type:feat
dependencies:
  - task-10
---

## Context & SDD References
- **Requirements:** `RF-02`, `RF-13`, `RNF-01`, `RNF-02` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-004`, `DA-008` (`docs/sdd/DECISIONS.md`)
- **Security Spec:** `docs/sdd/SECURITY.md#documentos`
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#pessoas-e-documentos`
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 2 — Implementar documentos gerais vinculados à Pessoa; Auditar alterações em dados/documentos)

## Description
Implement `registry.person_documents` and `PersonDocumentService` supporting metadata and optional digital file attachments stored in a protected local directory (`./storage/documents/`) outside public web paths, served exclusively through an authenticated and authorized backend route.

## Acceptance Criteria
- [ ] Create `registry.person_documents` table supporting document type (initially RG, proof of address, CPF, etc.), number, issuer, issue/expiration dates, lifecycle status (supporting renewal history for proof of address), and safe storage reference.
- [ ] Implement protected local file storage adapter writing files outside `public/` (`./storage/documents/`) with randomized UUID filenames, MIME/size validation, and `SHA-256` checksum.
- [ ] Implement `PersonDocumentService` (`attachDocument`, `updateDocument`, `listByPerson`, `downloadDocument`) enforcing `PermissionGuard` (`registry:document:read`, `registry:document:write`) and atomic `AuditEvent` logging (`DA-008`).
- [ ] Create authenticated NestJS controller endpoint (`GET /api/v1/persons/:personId/documents/:documentId/file` in `PersonDocumentsController`) that verifies backend authorization before streaming any file.
- [ ] Write integration tests verifying unauthorized users cannot access document metadata or download files directly via URL (`09-acceptance.md`).

## Definition of Done
- General documents are attached to `Person` without duplication across modules, stored securely outside public directories, and audited on every change.

