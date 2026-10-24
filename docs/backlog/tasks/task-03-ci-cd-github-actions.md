---
id: task-03
github_issue: 3
title: '[Chore] Set up CI/CD pipeline with GitHub Actions'
status: in_progress
assignee: ''
milestone: stage-1-foundations
labels:
  - module:shared
  - type:chore
dependencies:
  - task-01
---

## Context & SDD References

- **Requirements:** `RNF-04`, `RNF-07`, `RNF-09` (`docs/sdd/02-requirements.md`)
- **Tech Spec:** `docs/sdd/11-tech-spec.md` (§1.5 Tooling, Linting & Testing, §5.2 Testing Strategy, §6.6 PR Checklist)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 1 — Configurar repositório, ambientes e convenções)

## Description

Create automated GitHub Actions workflows across the backend (`SIIBS_Back`), frontend (`SIIBS_Front`), and root (`SIIBS`) repositories to:

1. Validate Pull Requests and pushes (`dev`, `hml`, `main`) with linting, TypeScript strict type-checking, unit tests, and PostgreSQL 16 integration tests.
2. Automatically move cards on **GitHub Project #2 (`SIIBS - Product & Engineering Backlog`)** based on branch creation (`<type>/<issue-#>-*`), commits (`(#<issue-#>)`), and PR merges into `dev`/`hml`/`main`.

## Acceptance Criteria

- [x] Create GitHub Actions CI workflows (`.github/workflows/ci.yml`) triggered on `pull_request` and `push` to `dev`, `hml`, and `main` for `SIIBS_Back` (NestJS), `SIIBS_Front` (React + Vite), and `SIIBS`.
- [x] Add job/step for branch name, commit message, and PR title validation against SDD conventions (`<type>/<issue-#>-<module>-<slug>` and `<type>(<scope>): <summary> [spec-ref] (#<issue-#>)`).
- [x] Add job/step for linter (`npm run lint`) and strict TypeScript check (`npm run typecheck`) in both `backend` and `frontend`.
- [x] Add job/step in `SIIBS_Back` for unit and PostgreSQL integration tests (`npm test`) using a `postgres:16-alpine` service container and running database migrations before test execution.
- [x] Add production build verification step (`npm run build`) for NestJS backend and Vite frontend.
- [x] Create GitHub Project Board Automation workflow (`.github/workflows/project-board-sync.yml`) in `SIIBS`, `SIIBS_Back`, and `SIIBS_Front`:
  - On branch creation (`create`) or `push` matching `<type>/<issue-#>-*` (or commit referencing `#<issue-#>`), automatically update the corresponding Issue's status on **GitHub Project #2** to **`In Progress`**.
  - On Pull Request merged into `dev` (or `hml`/`main`), automatically update the linked Issue's status on **GitHub Project #2** to **`Done`** and close the issue when appropriate.

## Definition of Done

- Workflow runs automatically on PRs and reports status checks required by `main` branch protection.
- Pipeline completes reliably using free GitHub Actions runners (`RNF-09`).
