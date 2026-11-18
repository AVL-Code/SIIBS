# SIIBS — Multi-Agent System & Orchestrator Rules (`AGENTS.md`)

> **Primary Rule:** The main conversational agent interacting with the user MUST always act as the **Orchestrator Agent** ([`docs/agents/orchestrator.md`](./docs/agents/orchestrator.md)). The user interacts exclusively with the Orchestrator.

---

## 1. Project Context & SDD Source of Truth

**SIIBS** is a modular management platform starting with the **Social Assistance MVP (`assistance`)** and architected to expand cleanly to **Course & Education Management (`education`)**, sharing a canonical **Person & Document Registry (`registry`)**, **Identity & Access Management (`iam`)**, and an **Append-Only Audit Trail (`audit`)**.

Before taking any decision or spawning specialist agents, consult the Spec-Driven Development (SDD) source of truth:
- **Architectural Decisions (`DA-001` to `DA-015`):** [`docs/sdd/DECISIONS.md`](./docs/sdd/DECISIONS.md)
- **Technical Specification & Conventions (100% English Code/Git):** [`docs/sdd/11-tech-spec.md`](./docs/sdd/11-tech-spec.md)
- **Security & Layered Encryption (`AES-256-GCM` + `HMAC-SHA256` Blind Index):** [`docs/sdd/SECURITY.md`](./docs/sdd/SECURITY.md)
- **Audit Trail Rules:** [`docs/sdd/AUDIT.md`](./docs/sdd/AUDIT.md)
- **Open Questions:** [`docs/sdd/OPEN-QUESTIONS.md`](./docs/sdd/OPEN-QUESTIONS.md)
- **Backlog & Tasks (`#1` to `#24`):** [`docs/backlog/README.md`](./docs/backlog/README.md)

---

## 2. Multi-Agent Roster & Playbooks (`DA-014`)

Every agent has a detailed operational playbook in [`docs/agents/`](./docs/agents/README.md). When the Orchestrator spawns or delegates to a specialist agent (`invoke_subagent` or `swarm`), the specialist MUST read and follow its designated playbook:

1. **Orchestrator Agent (User Point of Contact):** [`docs/agents/orchestrator.md`](./docs/agents/orchestrator.md)
2. **Spec & Architecture Agent:** [`docs/agents/spec-architect.md`](./docs/agents/spec-architect.md)
3. **Backend NestJS Agent (`backend/`):** [`docs/agents/backend.md`](./docs/agents/backend.md) + [`backend/AGENTS.md`](./backend/AGENTS.md)
4. **Frontend React Agent (`frontend/`):** [`docs/agents/frontend.md`](./docs/agents/frontend.md) + [`frontend/AGENTS.md`](./frontend/AGENTS.md)
5. **QA & Security Agent:** [`docs/agents/qa-security.md`](./docs/agents/qa-security.md)

---

## 3. Mandatory Multi-Agent Protocols

### 3.1 Single Point of User Contact & Zero-Guessing Escalation Chain
- **User ↔ Orchestrator Only:** Specialist agents never assume unstated business rules.
- **Specialist → Orchestrator:** If a specialist agent has any ambiguity or missing requirement, it pauses and asks the **Orchestrator**.
- **Orchestrator → SDD Docs → User:** The Orchestrator first checks `docs/sdd/` and `docs/backlog/`. If the answer is documented, the Orchestrator answers the specialist immediately. **If it is not documented or listed in `OPEN-QUESTIONS.md`, the Orchestrator MUST NOT guess or invent rules — it must ask the User via `ask_question` (or direct question), record the user's decision in `docs/sdd/DECISIONS.md`, and then unblock the specialists.**

### 3.2 Mandatory Skill Discovery per Module
Skills are distributed across three tiers and registered in [`.agents/skills.json`](./.agents/skills.json):
- **Root / General Skills (`.agents/skills/`):** Shared across all agents (especially **QA & Security**, **Spec & Architecture**, and **Orchestrator**).
- **Backend Development Skills (`backend/.agents/skills/`):** Mandatory for the **Backend NestJS Agent** (and **QA** when testing backend).
- **Frontend Design & UI Skills (`frontend/.agents/skills/`):** Mandatory for the **Frontend React Agent** (and **QA** when testing frontend).

Every agent MUST inspect its respective `skills/` directory at the beginning of a task and read the `SKILL.md` of any applicable skill before writing code.

### 3.3 Contract-First Handshake (Backend ↔ Frontend Alignment Before Coding)
Before writing implementation code for any feature that spans API and UI, the **Backend Agent** and **Frontend Agent** MUST align on an **Integration Contract** (validated by the Orchestrator / Spec Agent):
1. **REST Endpoints & HTTP Methods** (`/api/v1/...`)
2. **Zod Request/Response DTOs** (exact field names, types, pagination, and explicit filtering so no `assistance` data leaks into `registry`)
3. **RBAC Permissions & Error States** (`PermissionGuard` keys, HTTP status codes `401/403/404/409/422`, and how the UI handles unauthorized buttons/views)
4. **UI Actions, Buttons & `data-testid` Hooks** (every interactive button, form submit, webcam/photo trigger, and download link mapped to its exact API call)

Only after this handshake is agreed upon do Backend, Frontend, and QA code in parallel inside isolated **Git Worktrees** (`<type>/<issue-#>-<module>-<short-description>`).

### 3.4 Token Efficiency & Dynamic Model Routing (Tiering)
The Orchestrator selects the model tier for each subagent/step to maximize token efficiency and reduce cost:
- **`flash_lite`:** Quick file lookups, status checks, simple grep/formatting validations, boilerplate scaffolding.
- **`flash`:** Standard CRUD implementation, routine React components/forms, unit tests, and straightforward documentation updates where the contract is already locked.
- **`pro` (or `inherit` when running on top-tier model):** Complex domain logic, SDD architecture definitions, RBAC/privacy boundaries, `AES-256-GCM` encryption & `HMAC-SHA256` blind indexing, atomic PostgreSQL transactions with `AuditEvent`, and cross-module debugging.
