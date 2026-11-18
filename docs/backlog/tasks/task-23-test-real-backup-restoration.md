---
id: task-23
github_issue: 23
title: "[Test] Execute and document real database & document storage restoration verification test"
status: todo
assignee: ""
milestone: stage-4-quality-operations
labels:
  - module:shared
  - type:test
dependencies:
  - task-08
  - task-11
  - task-19
---

## Context & SDD References
- **Requirements:** `RNF-06`, `RNF-10` (`docs/sdd/02-requirements.md`)
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#segurança-e-operação` ("Backup/restauração são documentados e há teste de restauração registrado")
- **Tech Spec:** `docs/sdd/11-tech-spec.md` (§7 Automated Restore & Verification)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 4 — Teste real de restauração)

## Description
Execute a full encrypted backup and restoration rehearsal containing realistic seeded data across all schemas (`iam`, `audit`, `registry`, `assistance`) and attached encrypted files in `./storage/documents/` and `./storage/photos/`, restoring into a clean PostgreSQL instance using `BACKUP_ENCRYPTION_KEY` and recording formal verification evidence (`DA-013`, `DA-015`).

## Acceptance Criteria
- [ ] Populate a staging/local environment with representative records across `iam`, `registry` (including encrypted digital files in `./storage/documents/` and identification photos in `./storage/photos/`), `assistance`, and `audit`.
- [ ] Run `npm run db:backup` to generate the `AES-256` encrypted backup package and `SHA-256` manifest.
- [ ] Run `npm run db:verify-backup` / `npm run db:restore` into a clean target environment and verify identical row counts, foreign key integrity, application-level field decryption (`AES-256-GCM`), audit trail continuity, and document/photo file checksums.
- [ ] Record the formal restoration test report (date, commands executed, duration, checksums, verification outcome) in `docs/operations/restore-verification-report.md`.

## Definition of Done
- Restoration verification passes with zero data or file loss, and the evidence report is committed to the repository (`09-acceptance.md`).

