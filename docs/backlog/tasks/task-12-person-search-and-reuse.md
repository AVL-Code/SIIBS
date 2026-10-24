---
id: task-12
github_issue: 12
title: "[Feat] Implement Person search, similarity detection, and record reuse flow"
status: todo
assignee: ""
milestone: stage-2-registry-core
labels:
  - module:registry
  - type:feat
dependencies:
  - task-10
  - task-11
---

## Context & SDD References
- **Requirements:** `RF-03`, `RF-06`, `RF-15`, `RNF-02`, `RNF-04` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-003`, `DA-011` (`docs/sdd/DECISIONS.md`)
- **UX Guidelines:** `docs/sdd/05-ux.md`
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#pessoas-e-documentos`
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 2 — Implementar busca e reaproveitamento; Definir validação e possíveis duplicidades)

## Description
Implement person search by name, birth date, and document numbers, duplicate/similarity warnings during registration, and the UX workflow to reuse an existing `Person` record when starting a Social registration without duplicating basic data.

## Acceptance Criteria
- [ ] Implement `PersonService.search` supporting normalized name/phonetic matching, birth date, and document number lookup.
- [ ] Implement pre-registration duplicate detection warning when an operator enters a person with matching document or high name + birth date similarity.
- [ ] Implement reuse workflow in the UI (`05-ux.md`): when an existing `Person` is found, display authorized basic data and allow continuing into Social registration reusing the canonical `person_id`.
- [ ] Include permission-aware household link indicator (`RF-06`): inform authorized Social users if the searched person is already linked to an active `Household`.
- [ ] Ensure responses strictly use explicit DTOs that never leak sensitive `assistance` data to users lacking Social permissions (`RNF-02`).
- [ ] Write integration tests validating search accuracy, duplicate prevention, and record reuse.

## Definition of Done
- Operators can locate an existing `Person` and reuse the record without creating duplicate rows in `registry.persons`.

