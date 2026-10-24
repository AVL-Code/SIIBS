---
id: task-05
github_issue: 5
title: "[Spec] Define initial RBAC roles, permissions matrix, and security policies"
status: todo
assignee: ""
milestone: stage-1-foundations
labels:
  - module:iam
  - type:spec
  - spec:open-question
dependencies: []
---

## Context & SDD References
- **Requirements:** `RF-14`, `RNF-01`, `RNF-02` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-007`, `DA-008` (`docs/sdd/DECISIONS.md`)
- **Open Questions:** `docs/sdd/OPEN-QUESTIONS.md` (Segurança e operação — "Quais perfis/permissões serão necessários?")
- **Security Spec:** `docs/sdd/SECURITY.md`

## Description
Resolve the open question regarding user roles and granular permissions for the MVP, defining the authorization matrix across `registry`, `assistance`, `audit`, and `iam` modules and recording the architectural decision in `docs/sdd/DECISIONS.md`.

## Acceptance Criteria
- [ ] Define the initial internal user roles (e.g., `SYSTEM_ADMIN`, `SOCIAL_COORDINATOR`, `SOCIAL_WORKER`, `REGISTRY_OPERATOR`, and future `EDUCATION_OPERATOR` boundary).
- [ ] Define granular permissions per module (`registry:person:read`, `registry:person:write`, `registry:document:read`, `registry:document:write`, `assistance:household:read`, `assistance:household:write`, `assistance:attendance:read`, `assistance:attendance:write`, `assistance:income:read`, `assistance:benefit:write`, `assistance:report:read`, `audit:event:read`, `iam:user:manage`).
- [ ] Explicitly document data visibility rules ensuring roles without `assistance:*` permissions cannot read socioeconomic, income, benefit, or attendance data (`RNF-02`, `DA-007`).
- [ ] Update `docs/sdd/DECISIONS.md` and `docs/sdd/OPEN-QUESTIONS.md` reflecting the approved RBAC specification.

## Definition of Done
- PR updating `docs/sdd/DECISIONS.md` and `docs/sdd/OPEN-QUESTIONS.md` is reviewed and merged.

