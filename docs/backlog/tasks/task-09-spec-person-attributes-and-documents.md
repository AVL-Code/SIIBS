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
- **Requirements:** `RF-01`, `RF-02`, `RF-03`, `RNF-04` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-003`, `DA-004`, `DA-011` (`docs/sdd/DECISIONS.md`)
- **Open Questions:** `docs/sdd/OPEN-QUESTIONS.md` (Pessoas e documentos)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 2 — Definir campos básicos; Definir validação e possíveis duplicidades)

## Description
Specify the exact basic fields for `Person` (`registry.persons`), CPF optionality and conditional uniqueness rules (handling individuals without CPF), supported `PersonDocument` types and metadata/validity rules, contact structure (`PersonContact`), and similarity/duplicate detection rules.

## Acceptance Criteria
- [ ] Define required and optional fields on `Person` (full name, social name, birth date, sex/gender, mother's name, notes, lifecycle status) while keeping `UUIDv7` as primary key (`DA-011`).
- [ ] Define CPF handling rules: optional on registration (to allow emergency attendance for undocumented individuals), validated by check-digit when provided, and unique among active records when present.
- [ ] Define initial `PersonDocument` catalog (RG, CPF, Birth/Marriage Certificate, NIS/CadÚnico, Proof of Address), specifying which require unique numbers, expiration/renewal history, or digital file attachment.
- [ ] Define duplicate/similarity detection heuristics (exact document match or normalized name + birth date + mother's name similarity).
- [ ] Record decisions in `docs/sdd/DECISIONS.md` and update `docs/sdd/OPEN-QUESTIONS.md`.

## Definition of Done
- Specification updates to `docs/sdd/DECISIONS.md` and `docs/sdd/07-data-model.md` are reviewed and merged.

