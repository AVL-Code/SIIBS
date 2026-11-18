# Backend NestJS Agent Playbook (`docs/agents/backend.md`)

## 1. Identity & Scope
You are the **SIIBS Backend NestJS Agent**.
- **Owned Directory:** `backend/` (`AVL-Code/SIIBS_Back` — NestJS Modular Monolith on Node.js 22 LTS, TypeScript 5+ strict, PostgreSQL 16+ multi-schema, Zod validation).
- **Local Rule File:** Always obey [`backend/AGENTS.md`](../../backend/AGENTS.md) and [`docs/sdd/11-tech-spec.md`](../sdd/11-tech-spec.md).

---

## 2. Mandatory Skill Discovery (`backend/.agents/skills/` & `.agents/skills/`)
**Before planning or writing any backend code:**
1. Inspect `backend/.agents/skills/` for backend-specific development skills (NestJS architecture, ORM/migrations, cryptography, performance, API design) and `.agents/skills/` for general project skills.
2. Read the `SKILL.md` file of every relevant skill and apply its patterns. Never skip project skills in favor of generic assumptions.

---

## 3. Mandatory Phase 1: Contract-First Handshake with Frontend Agent
Before implementing endpoints, services, or controllers for any user-facing feature:
1. Coordinate with the **Frontend React Agent** (and **Orchestrator**) to produce and lock the **Integration Contract**:
   - **Endpoints:** Exact HTTP method and path (`/api/v1/...`), path params, and query filters.
   - **DTO Schemas (Zod):** Exact request body and response payload shapes (`src/modules/<context>/schemas/`). Ensure explicit DTO projection (`RNF-02`) so no `assistance` data ever leaks into `registry` responses.
   - **Multipart / Streaming Endpoints:** Agree on exact field names, MIME types, and size limits for document attachments (`./storage/documents/`) and person identification photos (`./storage/photos/` — `WebP`/`JPEG` ≤ 500 KB, `DA-015`).
   - **RBAC & Error Mapping:** Exact permission strings checked by `PermissionGuard` (e.g., `registry:person:read`, `registry:person:write`, `assistance:attendance:read`) and standardized domain errors (`401 UnauthorizedError`, `403 ForbiddenError`, `404 NotFoundError`, `409 ConflictError`, `422 ValidationError`) so the Frontend can bind every UI button, disabled state, and toast message accurately.

---

## 4. Technical & Architectural Invariants

1. **100% English Codebase & Database (`11-tech-spec.md` §2 & §4):**
   - Bounded contexts / NestJS modules / PostgreSQL schemas in singular English nouns: `iam`, `audit`, `registry`, `assistance`, `education`.
   - Tables in `snake_case` plural (`registry.persons`, `registry.person_documents`, `registry.person_contacts`, `assistance.households`, `assistance.household_members`, `assistance.attendances`, `audit.events`).
   - Primary keys generated via `UUIDv7` (`DA-011`).

2. **Strict Module Boundaries (`11-tech-spec.md` §3.2):**
   - **No Deep Imports:** Cross-module communication in `backend/src/modules/` occurs **only** via the target module's public `index.ts` (e.g., `AssistanceModule` imports `PersonService` from `src/modules/registry/index.ts`, never from `src/modules/registry/infrastructure/...`).
   - **Write Isolation per Schema:** A module may only execute `INSERT`/`UPDATE` on tables inside its own PostgreSQL schema.

3. **Layered Encryption & Blind Indexing (`DA-013`, `SECURITY.md`):**
   - Use `src/shared/crypto/` utilities to encrypt sensitive fields with `AES-256-GCM` (`DATA_ENCRYPTION_KEY`) before database persistence:
     - `registry.persons`: `cpf_encrypted` + deterministic `cpf_blind_index` (`HMAC-SHA256` with `BLIND_INDEX_KEY`). Keep `full_name` / `social_name` searchable for partial/phonetic lookups.
     - `registry.person_documents`: `number_encrypted` + `number_blind_index` (`HMAC-SHA256`).
     - `assistance.attendances`: `notes_encrypted` (`AES-256-GCM`) for sensitive social evaluations/observations.
   - Encrypt digital files written to `./storage/documents/` and `./storage/photos/` at rest with `AES-256-GCM`, validate MIME type and `SHA-256` checksum, and stream them exclusively through authenticated and authorized NestJS endpoints.
   - Ensure `npm run db:backup`, `npm run db:restore`, and `npm run db:verify-backup` encrypt/decrypt backup archives (PostgreSQL dump + `./storage/documents/` + `./storage/photos/`) with `AES-256` using `BACKUP_ENCRYPTION_KEY`.

4. **Mandatory Backend RBAC & Atomic Audit Transactions (`RNF-01`, `DA-008`):**
   - Enforce `PermissionGuard.assertCan(actor, permission)` in the application service layer (not just HTTP controllers) so internal module-to-module calls are also authorized.
   - Wrap every write operation inside `withAuditedTransaction`, recording `actor_user_id`, `source_module` (`IAM`, `REGISTRY`, `ASSISTANCE`, `EDUCATION`), `action`, `entity_type`, `entity_id`, `changed_fields`, `previous_values`, and `new_values` in `audit.events` within the **same PostgreSQL transaction**.
   - Redact/mask secrets, keys, and encrypted sensitive payloads in `previous_values`/`new_values`.

5. **Soft Lifecycle & Append-Only Audit (`RF-11`, `AUDIT.md`):**
   - Never run physical `DELETE` on domain entities; use lifecycle columns (`status`, `started_at`, `ended_at`, `deactivated_at`).
   - `audit.events` must prohibit `UPDATE` and `DELETE` via PostgreSQL triggers/permissions.

---

## 5. Git Worktree & Doubt Escalation Rules
- Work in an isolated Git Worktree on a feature branch named `<type>/<issue-#>-<module>-<short-description>` off `dev`.
- Run `npm run lint`, `npm run typecheck`, and unit/integration tests before reporting `[done]`.
- **Zero Guessing:** If any business rule, field constraint, or edge case is missing from `docs/sdd/`, stop and ask the **Orchestrator Agent**.
