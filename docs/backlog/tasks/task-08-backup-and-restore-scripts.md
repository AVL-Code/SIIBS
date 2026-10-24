---
id: task-08
github_issue: 8
title: "[Chore] Implement automated PostgreSQL + document storage backup and restore scripts"
status: todo
assignee: ""
milestone: stage-1-foundations
labels:
  - module:shared
  - type:chore
dependencies:
  - task-04
---

## Context & SDD References
- **Requirements:** `RNF-05`, `RNF-06`, `RNF-10` (`docs/sdd/02-requirements.md`)
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#segurança-e-operação`
- **Tech Spec:** `docs/sdd/11-tech-spec.md` (§7 Local Operations, Backup and Restore)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 1 — Documentar backup/restauração)

## Description
Create automated scripts for backing up and restoring both the PostgreSQL multi-schema database and the protected local document storage (`./storage/documents/`), including `SHA-256` integrity manifests and verification in a temporary database.

## Acceptance Criteria
- [ ] Implement `npm run db:backup` executing `pg_dump --format=custom --no-owner --no-acl` across all schemas (`iam`, `audit`, `registry`, `assistance`), bundling `./storage/documents/`, generating a `SHA-256` checksum manifest, and saving to `BACKUP_TARGET_DIR`.
- [ ] Implement `npm run db:restore` validating the `SHA-256` checksum before restoring the PostgreSQL dump via `pg_restore` and extracting document files.
- [ ] Implement `npm run db:verify-backup` restoring the latest backup archive into an isolated verification database (`sdd_verify_restore`), checking table counts and foreign key integrity, and outputting a verification report.
- [ ] Document initial backup/restore usage and operational retention recommendations (`OPEN-QUESTIONS.md`).

## Definition of Done
- Backup, restore, and verification scripts run end-to-end against local PostgreSQL 16 and produce a verifiable report.

