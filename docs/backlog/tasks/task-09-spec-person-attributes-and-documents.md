---
id: task-09
github_issue: 9
title: "[Spec] Define Person core attributes, CPF/document uniqueness rules, and duplicate detection criteria"
status: todo
assignee: ""
milestone: stage-2-registry-core
labels:
  - module:registry
  - type:spec
  - spec:open-question
dependencies: []
---

## Context & SDD References
- **Requirements:** `RF-01`, `RF-02`, `RF-03`, `RNF-01`, `RNF-04` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-003`, `DA-004`, `DA-011`, `DA-013`, `DA-015` (`docs/sdd/DECISIONS.md`)
- **Open Questions:** `docs/sdd/OPEN-QUESTIONS.md` (Pessoas e documentos)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 2 — Definir campos básicos; Definir validação e possíveis duplicidades)

## Description
Specify the exact basic fields for `Person` (`registry.persons`), including optional identification photo rules (`DA-015`), CPF optionality, `AES-256-GCM` encryption and `HMAC-SHA256` blind indexing rules (`DA-013`), supported `PersonDocument` types and metadata/validity rules, contact structure (`PersonContact`), and similarity/duplicate detection rules.

## Acceptance Criteria
- [ ] Define required and optional fields on `Person` (full name, social name, birth date, sex/gender, mother's name, optional identification photo metadata, notes, lifecycle status) while keeping `UUIDv7` as primary key (`DA-011`, `DA-015`).
- [ ] Define CPF handling and encryption rules: optional on registration (to allow emergency attendance for undocumented individuals), validated by check-digit when provided, stored encrypted (`cpf_encrypted` via `AES-256-GCM`) alongside a deterministic `cpf_blind_index` (`HMAC-SHA256`) for uniqueness among active records and exact lookup (`DA-013`).
- [ ] Define `Person` identification photo specification: optional capture via webcam or file upload, max 500 KB after `WebP`/`JPEG` compression, stored encrypted in `./storage/photos/`, and shared across authorized modules (`DA-015`).
- [ ] Define initial `PersonDocument` catalog (RG, CPF, Birth/Marriage Certificate, NIS/CadÚnico, Proof of Address), specifying which require encrypted numbers + blind index (`number_encrypted`, `number_blind_index`), expiration/renewal history, or encrypted digital file attachment.
- [ ] Define duplicate/similarity detection heuristics (exact document blind-index match or normalized name + birth date + mother's name similarity, assisted by visual photo comparison).
- [ ] Record decisions in `docs/sdd/DECISIONS.md` and update `docs/sdd/OPEN-QUESTIONS.md`.

## Definition of Done
- Specification updates to `docs/sdd/DECISIONS.md` and `docs/sdd/07-data-model.md` are reviewed and merged.

