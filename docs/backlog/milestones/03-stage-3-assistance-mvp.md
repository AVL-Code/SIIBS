---
id: stage-3-assistance-mvp
title: "Stage 3 - Assistance MVP"
github_milestone: 3
status: todo
---

# Milestone 3: Stage 3 - Assistance MVP

## Scope & Objectives
Implement the `assistance` bounded context covering Households (`EntidadeFamiliar`), Household Members (`MembroEntidadeFamiliar`), the single active Household Head (`HEAD`) rule with historical tracking, socioeconomic profiles and incomes, social programs/benefits, social attendances/evaluations, emergency baskets, project participations, and basic reports/indicators.

## SDD References
- `docs/sdd/10-tasks.md` (Etapa 3 — Social)
- `docs/sdd/04-mvp.md` (Escopo do MVP Social)
- `docs/sdd/02-requirements.md` (`RF-04` to `RF-12`)
- `docs/sdd/DECISIONS.md` (`DA-001`, `DA-005`, `DA-007`)

## Tasks
- `task-13`: Define Household membership history, head transition, and social benefit/attendance business rules
- `task-14`: Implement Household and HouseholdMember management with single active Head invariant
- `task-15`: Implement socioeconomic profile and HouseholdIncome management
- `task-16`: Implement social Programs and Benefits tracking
- `task-17`: Implement Social Attendance, evaluation, referrals, and historical timeline
- `task-18`: Implement Emergency Baskets and Project Participation tracking
- `task-19`: Implement Assistance basic reports and indicators with RBAC enforcement

