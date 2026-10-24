# SIIBS Project Backlog

This backlog follows the **Backlog.md** convention and is synchronized 1:1 with **GitHub Project [#2 — SIIBS - Product & Engineering Backlog](https://github.com/orgs/AVL-Code/projects/2)** and **GitHub Issues & Milestones** in [`AVL-Code/SIIBS`](https://github.com/AVL-Code/SIIBS/issues), adhering to the Spec-Driven Development (SDD) standards defined in [`docs/sdd/11-tech-spec.md`](../sdd/11-tech-spec.md).

## Milestones Overview

| # | Milestone | Local File | Scope |
| :-: | :--- | :--- | :--- |
| **1** | [Stage 1 - Foundations](https://github.com/AVL-Code/SIIBS/milestone/1) | [`01-stage-1-foundations.md`](./milestones/01-stage-1-foundations.md) | Repo conventions, branch protection, CI/CD, PostgreSQL 16 multi-schema, IAM, append-only Audit, backup/restore scripts |
| **2** | [Stage 2 - Registry Core](https://github.com/AVL-Code/SIIBS/milestone/2) | [`02-stage-2-registry-core.md`](./milestones/02-stage-2-registry-core.md) | Shared `Person` (`UUIDv7`), `PersonContact`, `PersonDocument` with protected storage, search & record reuse |
| **3** | [Stage 3 - Assistance MVP](https://github.com/AVL-Code/SIIBS/milestone/3) | [`03-stage-3-assistance-mvp.md`](./milestones/03-stage-3-assistance-mvp.md) | `Household`, single active `HEAD` rule, socioeconomic/incomes, benefits, social attendances, baskets, projects, reports |
| **4** | [Stage 4 - Quality & Operations](https://github.com/AVL-Code/SIIBS/milestone/4) | [`04-stage-4-quality-operations.md`](./milestones/04-stage-4-quality-operations.md) | Domain integrity, RBAC/privacy isolation & audit tests, verified real backup restoration test, operations runbook |

---

## Tasks & GitHub Issues Index

### Stage 1 — Foundations
| ID | GitHub Issue | Title | Labels | Dependencies | Status |
| :--- | :---: | :--- | :--- | :--- | :---: |
| [`task-01`](./tasks/task-01-repo-structure-and-tooling.md) | [#1](https://github.com/AVL-Code/SIIBS/issues/1) | [Chore] Configure repository structure, TypeScript strict tooling, and Git hooks | `module:shared`, `type:chore` | — | `todo` |
| [`task-02`](./tasks/task-02-branch-security-and-repo-protection.md) | [#2](https://github.com/AVL-Code/SIIBS/issues/2) | [Chore] Configure GitHub branch protection rules and repository security settings | `module:shared`, `type:chore` | `#1` | `todo` |
| [`task-03`](./tasks/task-03-ci-cd-github-actions.md) | [#3](https://github.com/AVL-Code/SIIBS/issues/3) | [Chore] Set up CI/CD pipeline with GitHub Actions | `module:shared`, `type:chore` | `#1` | `todo` |
| [`task-04`](./tasks/task-04-postgres-multischema-and-env.md) | [#4](https://github.com/AVL-Code/SIIBS/issues/4) | [Chore] Set up local PostgreSQL 16 environment, multi-schema configuration, and Zod env validation | `module:shared`, `type:chore` | `#1` | `todo` |
| [`task-05`](./tasks/task-05-spec-rbac-roles-and-permissions.md) | [#5](https://github.com/AVL-Code/SIIBS/issues/5) | [Spec] Define initial RBAC roles, permissions matrix, and security policies | `module:iam`, `type:spec`, `spec:open-question` | — | `todo` |
| [`task-06`](./tasks/task-06-iam-authentication-and-rbac.md) | [#6](https://github.com/AVL-Code/SIIBS/issues/6) | [Feat] Implement IAM module: authentication, session management, and backend PermissionGuard | `module:iam`, `type:feat` | `#4`, `#5` | `todo` |
| [`task-07`](./tasks/task-07-transversal-audit-module.md) | [#7](https://github.com/AVL-Code/SIIBS/issues/7) | [Feat] Implement transversal append-only Audit module and transactional logging helper | `module:audit`, `type:feat` | `#4`, `#6` | `todo` |
| [`task-08`](./tasks/task-08-backup-and-restore-scripts.md) | [#8](https://github.com/AVL-Code/SIIBS/issues/8) | [Chore] Implement automated PostgreSQL + document storage backup and restore scripts | `module:shared`, `type:chore` | `#4` | `todo` |

### Stage 2 — Registry Core
| ID | GitHub Issue | Title | Labels | Dependencies | Status |
| :--- | :---: | :--- | :--- | :--- | :---: |
| [`task-09`](./tasks/task-09-spec-person-attributes-and-documents.md) | [#9](https://github.com/AVL-Code/SIIBS/issues/9) | [Spec] Define Person core attributes, CPF/document uniqueness rules, and duplicate detection criteria | `module:registry`, `type:spec`, `spec:open-question` | — | `todo` |
| [`task-10`](./tasks/task-10-person-crud-and-contacts.md) | [#10](https://github.com/AVL-Code/SIIBS/issues/10) | [Feat] Implement Person entity, contacts, and PersonService CRUD with atomic audit logging | `module:registry`, `type:feat` | `#6`, `#7`, `#9` | `todo` |
| [`task-11`](./tasks/task-11-person-documents-and-storage.md) | [#11](https://github.com/AVL-Code/SIIBS/issues/11) | [Feat] Implement PersonDocumentService and protected local file storage | `module:registry`, `type:feat` | `#10` | `todo` |
| [`task-12`](./tasks/task-12-person-search-and-reuse.md) | [#12](https://github.com/AVL-Code/SIIBS/issues/12) | [Feat] Implement Person search, similarity detection, and record reuse flow | `module:registry`, `type:feat` | `#10`, `#11` | `todo` |

### Stage 3 — Assistance MVP
| ID | GitHub Issue | Title | Labels | Dependencies | Status |
| :--- | :---: | :--- | :--- | :--- | :---: |
| [`task-13`](./tasks/task-13-spec-assistance-household-and-social-rules.md) | [#13](https://github.com/AVL-Code/SIIBS/issues/13) | [Spec] Define Household membership history, head transition, and social benefit/attendance business rules | `module:assistance`, `type:spec`, `spec:open-question` | — | `todo` |
| [`task-14`](./tasks/task-14-household-and-members-management.md) | [#14](https://github.com/AVL-Code/SIIBS/issues/14) | [Feat] Implement Household and HouseholdMember management with single active Head invariant | `module:assistance`, `type:feat` | `#10`, `#12`, `#13` | `todo` |
| [`task-15`](./tasks/task-15-socioeconomic-and-income-management.md) | [#15](https://github.com/AVL-Code/SIIBS/issues/15) | [Feat] Implement socioeconomic profile and HouseholdIncome management | `module:assistance`, `type:feat` | `#14` | `todo` |
| [`task-16`](./tasks/task-16-programs-and-benefits.md) | [#16](https://github.com/AVL-Code/SIIBS/issues/16) | [Feat] Implement social Programs and Benefits tracking | `module:assistance`, `type:feat` | `#14` | `todo` |
| [`task-17`](./tasks/task-17-social-attendances-and-history.md) | [#17](https://github.com/AVL-Code/SIIBS/issues/17) | [Feat] Implement Social Attendance, evaluation, referrals, and historical timeline | `module:assistance`, `type:feat` | `#14` | `todo` |
| [`task-18`](./tasks/task-18-emergency-baskets-and-projects.md) | [#18](https://github.com/AVL-Code/SIIBS/issues/18) | [Feat] Implement Emergency Baskets and Project Participation tracking | `module:assistance`, `type:feat` | `#14`, `#17` | `todo` |
| [`task-19`](./tasks/task-19-assistance-reports-and-indicators.md) | [#19](https://github.com/AVL-Code/SIIBS/issues/19) | [Feat] Implement Assistance basic reports and indicators with RBAC enforcement | `module:assistance`, `type:feat` | `#15`, `#16`, `#17`, `#18` | `todo` |

### Stage 4 — Quality & Operations
| ID | GitHub Issue | Title | Labels | Dependencies | Status |
| :--- | :---: | :--- | :--- | :--- | :---: |
| [`task-20`](./tasks/task-20-tests-domain-integrity-and-duplication.md) | [#20](https://github.com/AVL-Code/SIIBS/issues/20) | [Test] Implement unit and PostgreSQL integration tests for domain invariants and duplicate prevention | `module:shared`, `type:test` | `#12`, `#14`, `#19` | `todo` |
| [`task-21`](./tasks/task-21-tests-authorization-and-privacy.md) | [#21](https://github.com/AVL-Code/SIIBS/issues/21) | [Test] Implement authorization, privacy isolation, and endpoint security tests | `module:iam`, `type:test` | `#6`, `#11`, `#19` | `todo` |
| [`task-22`](./tasks/task-22-tests-audit-trail.md) | [#22](https://github.com/AVL-Code/SIIBS/issues/22) | [Test] Implement transactional Audit trail and append-only protection tests | `module:audit`, `type:test` | `#7`, `#10`, `#14`, `#17` | `todo` |
| [`task-23`](./tasks/task-23-test-real-backup-restoration.md) | [#23](https://github.com/AVL-Code/SIIBS/issues/23) | [Test] Execute and document real database & document storage restoration verification test | `module:shared`, `type:test` | `#8`, `#11`, `#19` | `todo` |
| [`task-24`](./tasks/task-24-docs-installation-and-operations.md) | [#24](https://github.com/AVL-Code/SIIBS/issues/24) | [Docs] Write local installation, operations, backup, and incident response documentation | `module:shared`, `type:docs` | `#8`, `#23` | `todo` |

