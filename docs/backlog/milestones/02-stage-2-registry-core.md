---
id: stage-2-registry-core
title: "Stage 2 - Registry Core"
github_milestone: 2
status: todo
---

# Milestone 2: Stage 2 - Registry Core

## Scope & Objectives
Implement the shared `registry` bounded context (`Person`, `PersonContact`, `PersonDocument`) with stable `UUIDv7` identifiers, protected local document storage, similarity search & record reuse to prevent duplicate registrations, and atomic audit trail integration.

## SDD References
- `docs/sdd/10-tasks.md` (Etapa 2 — Núcleo Pessoas)
- `docs/sdd/02-requirements.md` (`RF-01`, `RF-02`, `RF-03`, `RF-13`, `RF-15`)
- `docs/sdd/03-domain.md` & `docs/sdd/07-data-model.md`
- `docs/sdd/DECISIONS.md` (`DA-003`, `DA-004`, `DA-008`, `DA-011`)

## Tasks
- `task-09`: Define Person core attributes, CPF/document uniqueness rules, and duplicate detection criteria
- `task-10`: Implement Person entity, contacts, and PersonService CRUD with atomic audit logging
- `task-11`: Implement PersonDocumentService and protected local file storage
- `task-12`: Implement Person search, similarity detection, and record reuse flow

