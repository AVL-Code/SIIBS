---
id: task-20
github_issue: 20
title: "[Test] Implement unit and PostgreSQL integration tests for domain invariants and duplicate prevention"
status: todo
assignee: ""
milestone: stage-4-quality-operations
labels:
  - module:shared
  - type:test
dependencies:
  - task-12
  - task-14
  - task-19
---

## Context & SDD References
- **Requirements:** `RF-03`, `RF-04`, `RF-05`, `RNF-04`, `RNF-07` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-003`, `DA-005`, `DA-011` (`docs/sdd/DECISIONS.md`)
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#pessoas-e-documentos` & `#social`
- **Tech Spec:** `docs/sdd/11-tech-spec.md` (§5.2 Testing Strategy)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 4 — Testes unitários e de integração; Testes de integridade e duplicidade)

## Description
Create a comprehensive suite of unit and PostgreSQL integration tests verifying cross-module `Person` reuse, duplicate prevention, immediate propagation of shared `Person` updates, Household single-head invariants, and non-destructive lifecycle history.

## Acceptance Criteria
- [ ] Write PostgreSQL integration tests verifying that searching and reusing an existing `Person` in `assistance` links to the canonical `registry.persons(id)` without duplicating basic data (`RF-03`).
- [ ] Write integration tests proving an authorized update to shared `Person` data or `PersonDocument` immediately reflects in subsequent `registry` and `assistance` queries (`DA-003`, `09-acceptance.md`).
- [ ] Write unit and integration tests for duplicate/similarity detection (with and without CPF) (`DA-011`).
- [ ] Write integration tests verifying the single active Household Head invariant (`HEAD`), head transition history, and existing family link detection (`RF-04`, `RF-05`, `RF-06`).
- [ ] Verify all tests execute cleanly in CI against the isolated PostgreSQL test container.

## Definition of Done
- Automated test suite passes 100% locally and in GitHub Actions CI covering all domain integrity and duplication acceptance criteria.

