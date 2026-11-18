# SIIBS Multi-Agent System Playbooks (`docs/agents/`)

This directory defines the operational architecture, prompts, handoff protocols, skill discovery rules, and token optimization policies for the SIIBS Multi-Agent Engineering Team (`DA-014`).

---

## 1. Agent Roster

| Agent Role | Playbook File | Workspace Scope | Primary Responsibility |
| :--- | :--- | :--- | :--- |
| **1. Orchestrator Agent** | [`orchestrator.md`](./orchestrator.md) | Root (`SIIBS`) | **Sole user contact**, context keeper, model/token router (`flash_lite` / `flash` / `pro`), contract handshake gatekeeper, and escalation resolver. |
| **2. Spec & Architecture Agent** | [`spec-architect.md`](./spec-architect.md) | `docs/sdd/`, `docs/backlog/`, `index.ts` contracts | SDD governance, resolving `OPEN-QUESTIONS.md` into `DECISIONS.md` (after user confirmation via Orchestrator), defining Zod/API contracts. |
| **3. Backend NestJS Agent** | [`backend.md`](./backend.md) | `backend/` (`SIIBS_Back`) | NestJS modules (`iam`, `audit`, `registry`, `assistance`, `education`), PostgreSQL 16 multi-schema, `AES-256-GCM` + `HMAC-SHA256` blind index, RBAC guards, atomic audit transactions, encrypted backup scripts. |
| **4. Frontend React Agent** | [`frontend.md`](./frontend.md) | `frontend/` (`SIIBS_Front`) | React + Vite + TypeScript SPA, Tailwind + shadcn/ui, `pt-BR` operator UX, webcam/upload photo capture, search & record reuse flow, permission-aware UI. |
| **5. QA & Security Agent** | [`qa-security.md`](./qa-security.md) | `backend/`, `frontend/`, `docs/operations/` | Unit, PostgreSQL integration, and Playwright E2E tests, RBAC/privacy isolation tests, encryption-at-rest verification, append-only audit tests, real backup restoration verification. |

---

## 2. End-to-End Multi-Agent Workflow

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant Orch as Orchestrator Agent
    participant Spec as Spec & Architecture Agent
    participant Back as Backend NestJS Agent
    participant Front as Frontend React Agent
    participant QA as QA & Security Agent

    User->>Orch: Requests task / Issue #N
    Orch->>Orch: Consults docs/sdd/ & docs/backlog/
    alt Has unstated rule or Open Question
        Orch->>User: Clarifies via ask_question (zero guessing)
        User-->>Orch: Confirms decision
        Orch->>Spec: Record decision in DECISIONS.md & update SDD
    end
    Orch->>Back: Phase 1: Propose API & Zod DTO Contract (loads backend/.agents/skills)
    Orch->>Front: Phase 1: Propose UI Actions, Buttons & data-testid (loads frontend/.agents/skills)
    Back<<-->>Front: Contract-First Handshake (Routes, Payloads, Errors, Buttons)
    Back-->>Orch: Signed Integration Contract
    Front-->>Orch: Signed Integration Contract
    Orch->>Orch: Validates Contract against SDD & selects optimal model tier per task
    par Parallel Execution in Isolated Git Worktrees
        Orch->>Back: Phase 2: Implement Backend API, Crypto, RBAC & Audit
        Orch->>Front: Phase 2: Implement React UI, Forms, Photo UX & States
        Orch->>QA: Phase 2: Write Integration, Security, Audit & E2E Tests (loads .agents/skills)
    end
    Back-->>QA: Ready for verification
    Front-->>QA: Ready for verification
    QA-->>Orch: Verification Report (All tests & SDD criteria passing)
    Orch-->>User: Presents summary & completed Issue/PR
```

---

## 3. Distributed Skill Architecture

Skills are loaded progressively from three locations mapped in [`.agents/skills.json`](../../.agents/skills.json):
- **Root General Skills (`.agents/skills/`):** Testing, security auditing, SDD validation, Git worktree helpers, and cross-cutting workflows.
- **Backend Skills (`backend/.agents/skills/`):** NestJS development, PostgreSQL multi-schema, ORM migrations, cryptography (`AES-256-GCM`, `HMAC-SHA256`), and backend patterns.
- **Frontend Skills (`frontend/.agents/skills/`):** UI/UX design system, Tailwind CSS + shadcn/ui, accessible forms, and React patterns.
