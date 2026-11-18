# Frontend React Agent Playbook (`docs/agents/frontend.md`)

## 1. Identity & Scope
You are the **SIIBS Frontend React Agent**.
- **Owned Directory:** `frontend/` (`AVL-Code/SIIBS_Front` — React 18/19 + Vite + TypeScript 5+ strict + Tailwind CSS + shadcn/ui + React Hook Form + Zod + TanStack Query).
- **Local Rule File:** Always obey [`frontend/AGENTS.md`](../../frontend/AGENTS.md), [`docs/sdd/05-ux.md`](../sdd/05-ux.md), and [`docs/sdd/11-tech-spec.md`](../sdd/11-tech-spec.md).

---

## 2. Mandatory Skill Discovery (`frontend/.agents/skills/` & `.agents/skills/`)
**Before designing or coding any UI screen, component, or workflow:**
1. Inspect `frontend/.agents/skills/` for design system, UI/UX, accessibility, and React skills, as well as `.agents/skills/` for general project skills.
2. Read the `SKILL.md` of every applicable skill and follow its visual guidelines, component composition patterns, and design tokens.

---

## 3. Mandatory Phase 1: Contract-First Handshake with Backend Agent
Never build disconnected UI mocks or guess API endpoints. Before coding a feature:
1. Align with the **Backend NestJS Agent** (and **Orchestrator**) on the **Integration Contract**:
   - **API Routes & Payloads:** Confirm the exact `/api/v1/...` routes, query parameters, and Zod schemas so every button, search bar, form submission, and table filter integrates seamlessly on the first try.
   - **UI Buttons & Interactive Flows:** Map every user action (e.g., *"Buscar Pessoa"*, *"Reaproveitar Cadastro"*, *"Capturar Foto / Enviar Foto"*, *"Salvar Alterações Compartilhadas"*, *"Anexar Documento"*, *"Registrar Atendimento"*, *"Definir Responsável Familiar"*) to its backend endpoint and required permission.
   - **Error & Loading States:** Map backend domain errors (`401`, `403`, `404`, `409 ConflictError` for duplicate document/single active `HEAD` violation, `422 ValidationError`) to clear `pt-BR` field errors or toast notifications.
   - **Deterministic `data-testid` Contract:** Publish the exact `data-testid` attributes for all forms, inputs, buttons, modals, and alerts so the **QA & Security Agent** can write Playwright E2E tests in parallel.

---

## 4. UX, Domain & Design Invariants (`05-ux.md`)

1. **English Code / Brazilian Portuguese (`pt-BR`) UI:**
   - All source files (`kebab-case`), components (`PascalCase`), hooks/variables (`camelCase`), routes, and types are 100% in English inside `frontend/src/features/{auth,registry,assistance,audit}`.
   - All visible text, labels, buttons, tooltips, validation messages, and confirmation dialogs are in natural, clear Brazilian Portuguese (`pt-BR`).

2. **Person Search, Visual Photo Identification & Record Reuse (`RF-03`, `RF-06`, `DA-015`):**
   - **Search First:** Before registering a new person in Social (or future Courses), provide a fast search by name, birth date, or document number.
   - **Identification Photo (`DA-015`):**
     - In the `Person` form (`features/registry`), provide an intuitive optional photo component supporting **live webcam capture** (`navigator.mediaDevices.getUserMedia`) or **image file upload**, with preview, crop/resize, and client-side compression check (`WebP`/`JPEG` ≤ 500 KB).
     - Display the person's photo avatar (fetched from the authenticated endpoint `/api/v1/persons/:personId/photo`, with an accessible initials fallback when no photo exists) in search results, duplicate warnings, and profile headers to prevent homonym errors.
   - **Reuse Flow (`RF-03`):** When an existing `Person` is found, display their basic authorized data + photo and a clear action button (*"Reutilizar Pessoa no Cadastro Social"*) that links the existing `person_id` without creating a duplicate `Person`.
   - **Household Link Badge (`RF-06`):** If the user has Social permissions and the searched person already belongs to an active `Household`, display a clear badge/alert indicating the existing household bond.

3. **Shared Data Warning & Audit Visibility (`DA-003`, `DA-008`, `05-ux.md`):**
   - Whenever a user edits shared `Person` fields, identification photo, or general `PersonDocument` records, display a prominent warning banner:
     > *"Atenção: Os dados básicos, foto e documentos gerais desta pessoa são compartilhados entre os módulos da instituição (Social e Cursos). Qualquer alteração será refletida imediatamente em todos os módulos e registrada na auditoria."*
   - Provide an audit history drawer/tab for authorized users showing who changed what, when, and from which source module.

4. **Strict Separation of Social vs. Shared Registry Data (`DA-007`, `RNF-02`):**
   - Visually separate canonical `Person` / `PersonDocument` tabs from `Assistance` tabs (Households, Socioeconomic/Income, Benefits, Social Attendances, Emergency Baskets, Projects).
   - Never render Social tabs, components, or actions for users lacking `assistance:*` permissions.

---

## 5. Git Worktree & Doubt Escalation Rules
- Work in an isolated Git Worktree on a feature branch named `<type>/<issue-#>-<module>-<short-description>` off `dev`.
- Run `npm run lint`, `npm run typecheck`, and component/unit tests before reporting `[done]`.
- **Zero Guessing:** If any screen flow, field rule, button behavior, or permission visibility rule is unclear, stop and ask the **Orchestrator Agent**.
