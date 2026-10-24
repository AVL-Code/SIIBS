---
id: task-13
github_issue: 13
title: "[Spec] Define Household membership history, head transition, and social benefit/attendance business rules"
status: todo
assignee: ""
milestone: stage-3-assistance-mvp
labels:
  - module:assistance
  - type:spec
  - spec:open-question
dependencies: []
---

## Context & SDD References
- **Requirements:** `RF-04` to `RF-11` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-005`, `DA-007` (`docs/sdd/DECISIONS.md`)
- **Open Questions:** `docs/sdd/OPEN-QUESTIONS.md` (Social)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 3 — Social)

## Description
Resolve the open domain questions for the Social Assistance module (`assistance`) in `docs/sdd/OPEN-QUESTIONS.md`, covering household membership transitions over time, Household Head replacement rules, socioeconomic income calculation formulas, and rules for benefits, emergency baskets, and project participations.

## Acceptance Criteria
- [ ] Define rules for a `Person` moving between households over time (e.g., at most one active household membership at a time, preserving historical links via `started_at` / `ended_at`).
- [ ] Define the atomic transition rule for changing a Household's responsible head (`HEAD` role), ensuring a household always has exactly one active head while preserving the history of previous heads.
- [ ] Define calculation rules for household socioeconomic assessment (total family income, per-capita income, income types included/excluded).
- [ ] Define catalogs and operational rules for social benefits/programs (`RF-08`), emergency baskets vs. recurring benefits (`RF-10`), and project participations.
- [ ] Record all decisions in `docs/sdd/DECISIONS.md` and update `docs/sdd/OPEN-QUESTIONS.md`.

## Definition of Done
- PR updating `docs/sdd/DECISIONS.md` and `docs/sdd/OPEN-QUESTIONS.md` is reviewed and merged.

