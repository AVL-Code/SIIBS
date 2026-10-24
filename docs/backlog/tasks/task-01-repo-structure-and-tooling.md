---
id: task-01
github_issue: 1
title: "[Chore] Configure repository structure, TypeScript strict tooling, and Git hooks"
status: done
assignee: ""
milestone: stage-1-foundations
labels:
  - module:shared
  - type:chore
dependencies: []
---

## Context & SDD References

- **Requirements:** `RNF-07` (`docs/sdd/02-requirements.md`), `DA-002` (`docs/sdd/DECISIONS.md`)
- **Tech Spec:** `docs/sdd/11-tech-spec.md` (§1.1 Application Core, §1.5 Tooling, §3.1 Directory Structure, §6 Git Conventions)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 1 — Confirmar stack e ambiente local; Configurar repositório, ambientes e convenções)

## Description

Set up the project structure across the root repository (`SIIBS`) and its two Git submodules — `backend/` (`SIIBS_Back`: NestJS Modular Monolith API on Node.js 22 LTS + TypeScript 5+ strict mode) and `frontend/` (`SIIBS_Front`: React + Vite + TypeScript SPA) — aligned with the bounded context architecture (`iam`, `audit`, `registry`, `assistance`, `education`), along with automated code quality checks, commit message validation, and GitHub Issue/Pull Request templates.

## Acceptance Criteria

- [x] Initialize `backend/` (`SIIBS_Back`) with NestJS + TypeScript 5+ (`strict: true`, `noImplicitAny: true`, `noUncheckedIndexedAccess: true`) structured under `src/modules/{iam,audit,registry,assistance,education}`, `src/shared`, and `src/db` (`11-tech-spec.md` §3.1).
- [x] Initialize `frontend/` (`SIIBS_Front`) with React + Vite + TypeScript 5+ (`strict: true`), Tailwind CSS + shadcn/ui base setup, and `src/features/{auth,registry,assistance,audit}`.
- [x] Configure linter and formatter (Biome or ESLint + Prettier) in both submodules, enforcing no deep imports across backend module boundaries (`11-tech-spec.md` §3.2).
- [x] Configure Husky + `lint-staged` + `commitlint` enforcing the SDD commit convention: `<type>(<scope>): <imperative summary> [spec-ref] (#<issue-#>)`.
- [x] Add `.github/PULL_REQUEST_TEMPLATE.md` and `.github/ISSUE_TEMPLATE/` matching `11-tech-spec.md` §6.3 and §6.6.

## Definition of Done

- `npm run lint` and `npm run typecheck` execute cleanly.
- Invalid commit messages are rejected by the local `commit-msg` hook.
- Module boundary import rules are enforced automatically.
