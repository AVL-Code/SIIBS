---
id: task-06
github_issue: 6
title: '[Feat] Implement IAM module: authentication, session management, and backend PermissionGuard'
status: in_progress
assignee: ''
milestone: stage-1-foundations
labels:
  - module:iam
  - type:feat
dependencies:
  - task-04
  - task-05
---

## Context & SDD References

- **Requirements:** `RF-14`, `RNF-01`, `RNF-02` (`docs/sdd/02-requirements.md`)
- **Decisions:** `DA-007`, `DA-008`, `DA-012` (`docs/sdd/DECISIONS.md`)
- **Acceptance Criteria:** `docs/sdd/09-acceptance.md#segurança-e-operação`
- **Tech Spec:** `docs/sdd/11-tech-spec.md` (§1.3 Security & Authentication, §2 Domain Mapping, §3.2 Module Boundary Rules)
- **Work Plan:** `docs/sdd/10-tasks.md` (Etapa 1 — Implementar autenticação e autorização)

## Description

Implement the `iam` module (`iam.users`, `iam.roles`, `iam.permissions`), individual account authentication with `Argon2id` password hashing, signed/encrypted `HttpOnly` (`SameSite=Lax`) sessions, `ActorContext` resolution, and the backend `PermissionGuard` utility.

## Acceptance Criteria

- [x] Create PostgreSQL tables and migrations in schema `iam` (`iam.users`, `iam.roles`, `iam.permissions`, `iam.user_roles`, `iam.role_permissions`).
- [x] Implement password hashing and verification using `Argon2id` (`SECURITY.md`), ensuring credentials/tokens are never logged.
- [x] Implement login/logout endpoints (`/api/v1/auth/login`, `/api/v1/auth/logout`, `/api/v1/auth/me`) in NestJS with `HttpOnly`, `SameSite=Lax` session management, plus the login UI screen in `frontend/src/features/auth`.
- [x] Implement `ActorContext` (`userId`, `roles`, `permissions`, `sourceModule`) and `PermissionGuard.assertCan(actor, permission)` throwing `ForbiddenError` / `UnauthorizedError` when unauthorized.
- [x] Create seed script for initial administrative user and default RBAC roles/permissions.
- [x] Write unit and integration tests for authentication, inactive user rejection, and `PermissionGuard` enforcement.

## Definition of Done

- Backend service calls without required permission reliably throw `ForbiddenError`.
- All unit and PostgreSQL integration tests for `iam` pass.
