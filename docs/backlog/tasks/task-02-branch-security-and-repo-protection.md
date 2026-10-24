---
id: task-02
github_issue: 2
title: '[Chore] Configure GitHub branch protection rules and repository security settings'
status: done
assignee: ''
milestone: stage-1-foundations
labels:
  - module:shared
  - type:chore
dependencies:
  - task-01
---

## Context & SDD References

- **Requirements:** `RNF-01`, `RNF-07` (`docs/sdd/02-requirements.md`)
- **Security Spec:** `docs/sdd/SECURITY.md`
- **Tech Spec:** `docs/sdd/11-tech-spec.md` (§6.4 Branching Strategy, §6.6 PR Checklist)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 1 — Configurar repositório, ambientes e convenções)

## Description

Create the permanent environment branches (`dev`, `hml`, `main`) and configure GitHub repository security policies, branch protection rulesets, code ownership, and secret/dependency scanning across the root repository (`AVL-Code/SIIBS`) and both submodules (`AVL-Code/SIIBS_Back` and `AVL-Code/SIIBS_Front`).

## Acceptance Criteria

- [x] Create and push the permanent environment branches (`dev` and `hml`, alongside `main`) in `AVL-Code/SIIBS`, `AVL-Code/SIIBS_Back`, and `AVL-Code/SIIBS_Front` (`11-tech-spec.md` §6.4):
  - Feature/task branches merge into `dev` during the Milestone.
  - At the end of each Milestone, `dev` is promoted via PR to `hml` for homologation testing, and then to `main`.
- [x] Configure branch protection rulesets on `main`, `hml`, and `dev` across all three repositories:
  - Require a Pull Request before merging.
  - Require status checks to pass before merging (CI lint, typecheck, tests) and require branches to be up to date.
  - Require conversation resolution before merging.
  - Block force pushes and branch deletions on `main`, `hml`, and `dev`.
- [x] Add `.github/CODEOWNERS` defining review ownership for domain modules and SDD specifications (`docs/sdd/`).
- [x] Enable Dependabot alerts / security updates and secret scanning on all three repositories.
- [x] Verify `.gitignore` across root and submodules prevents committing `.env`, local databases, backups, and `./storage/documents/`.

## Definition of Done

- Direct pushes and force-pushes to `main` are blocked according to policy, and PR status checks are required.
- Repository security settings and `CODEOWNERS` are active and documented.
