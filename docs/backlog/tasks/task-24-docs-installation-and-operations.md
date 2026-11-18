---
id: task-24
github_issue: 24
title: "[Docs] Write local installation, operations, backup, and incident response documentation"
status: todo
assignee: ""
milestone: stage-4-quality-operations
labels:
  - module:shared
  - type:docs
dependencies:
  - task-08
  - task-23
---

## Context & SDD References
- **Requirements:** `RNF-05`, `RNF-06`, `RNF-09`, `RNF-10` (`docs/sdd/02-requirements.md`)
- **Security Spec:** `docs/sdd/SECURITY.md#infraestrutura-local` & `#lgpd`
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#segurança-e-operação`
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 4 — Documentar instalação e operação)

## Description
Produce the operational runbook and installation guide for running the SIIBS Modular Monolith in the institution's local environment, covering hardware/OS hardening, deployment, routine backups to off-device storage, restoration steps, and incident/equipment-loss response.

## Acceptance Criteria
- [ ] Write `docs/operations/installation-and-setup.md` covering local hardware requirements (`RNF-05`), OS disk/volume encryption setup (LUKS/BitLocker — `DA-013`), Node.js 22 + PostgreSQL 16 setup, `.env` and separated encryption keys configuration (`DATA_ENCRYPTION_KEY`, `BLIND_INDEX_KEY`, `BACKUP_ENCRYPTION_KEY`), database migrations, and initial admin seeding.
- [ ] Write `docs/operations/backup-and-restore-runbook.md` detailing encrypted backup schedule, off-device storage separation, separate custody of `BACKUP_ENCRYPTION_KEY`, retention policy, and step-by-step disaster recovery restoration (`RNF-06`, `RNF-10`, `DA-013`).
- [ ] Write `docs/operations/security-and-incident-response.md` covering physical access controls, OS/dependency updates, network port restrictions, key rotation/compromise procedures, LGPD data handling guidelines, and action plan in case of equipment theft/failure (`SECURITY.md`).

## Definition of Done
- Complete operational documentation is reviewed and published in `docs/operations/` and linked from the root `README.md`.

