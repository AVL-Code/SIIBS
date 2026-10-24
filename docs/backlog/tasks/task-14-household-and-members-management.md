---
id: task-14
github_issue: 14
title: "[Feat] Implement Household and HouseholdMember management with single active Head invariant"
status: todo
assignee: ""
milestone: stage-3-assistance-mvp
labels:
  - module:assistance
  - type:feat
dependencies:
  - task-10
  - task-12
  - task-13
---

## Context & SDD References
- **Requirements:** `RF-04`, `RF-05`, `RF-06`, `RF-11`, `RF-13` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-005`, `DA-007`, `DA-008` (`docs/sdd/DECISIONS.md`)
- **Data Model:** `docs/sdd/07-data-model.md#domínio-social`
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#social`
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 3 — Implementar entidade familiar e integrantes; Implementar designação do responsável e consistência da regra)

## Description
Implement `assistance.households` and `assistance.household_members` along with `HouseholdService` and UI views to create households, link family members (`Person`), enforce the single active Household Head (`HEAD`) invariant, alert on existing family links, and preserve full membership and head transition history.

## Acceptance Criteria
- [ ] Create `assistance.households` and `assistance.household_members` tables with foreign keys to `registry.persons(id)`, member role (`HEAD`, `SPOUSE`, `CHILD`, `DEPENDENT`, `OTHER`), lifecycle status, `started_at`, and `ended_at`.
- [ ] Enforce the domain invariant (in `HouseholdService` and via PostgreSQL partial unique index) that every active `Household` has **at most/exactly one active `HEAD`**.
- [ ] Implement atomic Household Head reassignment (`changeHouseholdHead`) that closes the previous head role (`ended_at`) and activates the new `HEAD` in a single audited transaction (`RF-11`, `RF-13`).
- [ ] Detect and alert when linking a `Person` who already belongs to an active `Household` (`RF-06`).
- [ ] Build UI screens for creating/managing a `Household`, designating its head, and managing members by reusing/creating `Person` records via `PersonService`.
- [ ] Write unit and PostgreSQL integration tests covering household creation, single active head invariant, head transition history, and atomic audit logging.

## Definition of Done
- Attempting to create or leave a household with zero or multiple active heads fails validation/constraints.
- All household and membership mutations are recorded in `audit.events` with `source_module = 'ASSISTANCE'`.

