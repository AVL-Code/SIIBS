---
id: stage-1-foundations
title: "Stage 1 - Foundations"
github_milestone: 1
status: todo
---

# Milestone 1: Stage 1 - Foundations

## Scope & Objectives
Establish the project engineering foundations, repository conventions, branch security, CI/CD automation, local PostgreSQL 16+ multi-schema setup, Identity & Access Management (`iam`), transversal append-only Audit logging (`audit`), and automated backup/restore scripts.

## SDD References
- `docs/sdd/10-tasks.md` (Etapa 1 — Fundamentos)
- `docs/sdd/11-tech-spec.md` (Stack, Architecture, Conventions, Local Ops)
- `docs/sdd/06-architecture.md` (Modular Monolith)
- `docs/sdd/SECURITY.md` & `docs/sdd/AUDIT.md`

## Tasks
- `task-01`: Configure repository structure, TypeScript strict tooling, and Git hooks
- `task-02`: Configure GitHub branch protection rules and repository security settings
- `task-03`: Set up CI/CD pipeline with GitHub Actions
- `task-04`: Set up local PostgreSQL 16 environment, multi-schema configuration, and Zod env validation
- `task-05`: Define initial RBAC roles, permissions matrix, and security policies
- `task-06`: Implement IAM module: authentication, session management, and backend PermissionGuard
- `task-07`: Implement transversal append-only Audit module and transactional logging helper
- `task-08`: Implement automated PostgreSQL + document storage backup and restore scripts

