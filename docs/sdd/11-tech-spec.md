# 11 — Especificação Técnica, Arquitetura de Código e Convenções (SDD)

Este documento define a stack tecnológica, a arquitetura do monólito modular, o mapeamento entre os termos de domínio da especificação e o código (100% em inglês), os padrões de banco de dados (PostgreSQL), testes, fluxo Git (branches, commits e PRs em inglês), convenções de GitHub Issues + Milestones e operação local.

---

## 1. Stack Tecnológica

A escolha prioriza **execução local de baixo custo (`RNF-05`, `RNF-09`)**, **integridade relacional forte (`RNF-04`)**, **tipagem estática ponta a ponta** (essencial para Spec-Driven Development — SDD) e **confiabilidade em backups e restauração (`RNF-06`, `RNF-10`)**.

### 1.1 Application Core & Repository Topology

- **Repository Structure (`DA-002`):**
  - **Root Repository (`AVL-Code/SIIBS`):** Especificações SDD (`docs/sdd/`), Backlog (`docs/backlog/`), Documentação Operacional (`docs/operations/`), orquestração local (`docker-compose.yml`) e referência aos submódulos Git.
  - **Backend Submodule (`backend/` → `AVL-Code/SIIBS_Back`):** API HTTP REST construída como um **Monólito Modular em NestJS**, concentrando todos os contextos de negócio (`iam`, `audit`, `registry`, `assistance`, `education`) em um único processo Node.js.
  - **Frontend Submodule (`frontend/` → `AVL-Code/SIIBS_Front`):** Single-Page Application (SPA) em **React + Vite + TypeScript**, consumindo a API REST interna do `SIIBS_Back`.
- **Language:** TypeScript 5+ (`strict: true`, `noImplicitAny: true`, `noUncheckedIndexedAccess: true`)
- **Runtime:** Node.js 22 LTS
- **Backend Framework (`SIIBS_Back`):** **NestJS** (módulos nativos por Bounded Context, Guards de RBAC, Interceptors e Injeção de Dependência entre serviços de domínio).
- **Frontend Build & Framework (`SIIBS_Front`):** **React 18/19 + Vite + TypeScript** + React Router / TanStack Query.
- **Schema & Contract Validation:** Zod (`nestjs-zod` no backend e `@hookform/resolvers/zod` no frontend).

### 1.2 Database & Local Persistence

- **Database:** **PostgreSQL 16+** (executado localmente via Docker Compose ou serviço nativo local).
  - **Isolamento por Schemas do PostgreSQL (Bounded Contexts):** Um único banco de dados dividido em schemas lógicos no singular por contexto de negócio:
    - `iam` — Identidade e Acesso
    - `audit` — Trilha de Auditoria
    - `registry` — Núcleo Compartilhado de Pessoas e Documentos
    - `assistance` — Assistência Social (escopo do MVP)
    - `education` — Gestão de Cursos, Turmas e Matrículas (reservado para expansão futura)
  - **Recursos Nativos Utilizados:**
    - `UUID` nativo para chaves primárias e estrangeiras (`DA-011`).
    - `TIMESTAMPTZ` para datas/horas consistentes em UTC (`AUDIT.md`).
    - `JSONB` para metadados controlados e diffs da trilha de auditoria (`changed_fields`, `previous_values`, `new_values`).
- **ORM & Migrations:** Prisma ORM (com `multiSchema`) ou Drizzle ORM, com migrações SQL versionadas no repositório.
- **File Storage (`PersonDocument` & `Person` Photo):** Sistema de arquivos local fora da pasta pública (`./storage/documents/` para documentos e `./storage/photos/` para fotos de identificação de `Person`, comprimidas em `WebP`/`JPEG` até 500 KB — `DA-015`), criptografado em repouso (`AES-256-GCM`) e servido exclusivamente via rotas autenticadas e autorizadas no backend (`SECURITY.md`).

### 1.3 Security, Authentication & Layered Encryption (`DA-013`)

- **Authentication:** Sessão baseada em cookie `HttpOnly`, `SameSite=Lax`, assinada/criptografada.
- **Password Hashing:** `Argon2id` (`SECURITY.md`).
- **Primary Identifiers (`DA-011`):** `UUIDv7` (identificador interno estável, ordenável temporalmente e otimizado para índices B-Tree no PostgreSQL, nunca utilizando CPF como chave primária).
- **Layered Encryption & Blind Indexing (`DA-013`):**
  1. **OS/Volume Encryption:** Disco/volume local protegido via LUKS (Linux) ou BitLocker (Windows).
  2. **Application-Level Field & File Encryption (`AES-256-GCM`):** Colunas ultrassensíveis — CPF (`cpf_encrypted`), números de documentos sensíveis (`number_encrypted` em `registry.person_documents`) e avaliações/observações sociais (`notes_encrypted` em `assistance.attendances`) — além dos arquivos em `./storage/documents/` e `./storage/photos/` são criptografados na camada de aplicação com `AES-256-GCM` (IV aleatório de 96 bits + Auth Tag de 128 bits) usando `DATA_ENCRYPTION_KEY`.
  3. **Blind Indexing (`HMAC-SHA256`):** Para permitir busca exata e constraint de unicidade em campos cifrados (`RF-03`) sem descriptografar a tabela inteira, a aplicação calcula um *blind index* determinístico (`HMAC-SHA256` do valor normalizado usando `BLIND_INDEX_KEY`) e persiste em colunas indexadas (`cpf_blind_index`, `number_blind_index`). O nome de `Person` permanece pesquisável para suportar buscas parciais/fonéticas.
  4. **Key Separation & Backup Encryption:** As chaves `DATA_ENCRYPTION_KEY` e `BLIND_INDEX_KEY` são injetadas via ambiente/cofre do SO no boot e nunca persistidas junto aos backups. Os pacotes de backup são criptografados com `AES-256` utilizando uma chave independente (`BACKUP_ENCRYPTION_KEY`).

### 1.4 User Interface (UI)

- **Styling & Components:** Tailwind CSS + shadcn/ui (Radix UI) — componentes acessíveis, leves e diretos (`05-ux.md`).
- **Forms:** React Hook Form + `@hookform/resolvers/zod`.
- **UI Language:** Textos visíveis ao usuário final em Português (`pt-BR`), mantendo todo o código-fonte em Inglês (`en-US`).

### 1.5 Tooling, Linting & Testing

- **Linter & Formatter:** Biome (ou ESLint + Prettier) + Husky + lint-staged + commitlint.
- **Unit & Integration Testing:** Vitest (testes de integração executados contra banco PostgreSQL de teste isolado).
- **End-to-End Testing (Acceptance):** Playwright.

---

## 2. Padronização de Idioma e Mapeamento de Domínio (100% Inglês)

**Regra Geral:** Todo artefato técnico — nomes de pastas, arquivos, módulos, classes, interfaces, funções, variáveis, constantes, schemas/tabelas/colunas do banco, testes, comentários de código, branches, commits e Pull Requests — deve ser escrito **exclusivamente em inglês**.

Os módulos e schemas seguem o padrão DDD de **Bounded Contexts em substantivos no singular** (`iam`, `audit`, `registry`, `assistance`, `education`), evitando ambiguidades (como `social` parecer rede social) e redundâncias de tabelas (como `courses.courses` ou `social.social_attendances`).

Para manter rastreabilidade total com os documentos de especificação (`01-product.md` a `10-tasks.md`), utiliza-se o mapeamento oficial abaixo:

| Conceito na Spec (PT-BR)    | Bounded Context / Módulo (EN) | Entidade no Código (EN)              | Schema.Tabela no PostgreSQL (EN)                                       |
| :-------------------------- | :---------------------------- | :----------------------------------- | :--------------------------------------------------------------------- |
| Identidade e Acesso         | `iam`                         | `User`, `Role`, `Permission`         | `iam.users`, `iam.roles`, `iam.permissions`                            |
| Auditoria                   | `audit`                       | `AuditEvent`                         | `audit.events`                                                         |
| Núcleo Pessoas              | `registry`                    | —                                    | schema `registry`                                                      |
| Pessoa                      | `registry`                    | `Person`                             | `registry.persons`                                                     |
| DocumentoPessoa             | `registry`                    | `PersonDocument`                     | `registry.person_documents`                                            |
| ContatoPessoa               | `registry`                    | `PersonContact`                      | `registry.person_contacts`                                             |
| Domínio Social              | `assistance`                  | —                                    | schema `assistance`                                                    |
| EntidadeFamiliar            | `assistance`                  | `Household`                          | `assistance.households`                                                |
| MembroEntidadeFamiliar      | `assistance`                  | `HouseholdMember`                    | `assistance.household_members`                                         |
| Responsável Familiar        | `assistance`                  | `HouseholdHead` (`HEAD` role)        | `role = 'HEAD'`                                                        |
| AtendimentoSocial           | `assistance`                  | `Attendance`                         | `assistance.attendances`                                               |
| Renda                       | `assistance`                  | `HouseholdIncome`                    | `assistance.household_incomes`                                         |
| Programa / Benefício        | `assistance`                  | `Benefit`                            | `assistance.benefits`                                                  |
| CestaBeneficio              | `assistance`                  | `EmergencyBasket`                    | `assistance.emergency_baskets`                                         |
| ParticipaçãoProjeto         | `assistance`                  | `ProjectParticipation`               | `assistance.project_participations`                                    |
| Domínio Cursos (Futuro)     | `education`                   | —                                    | schema `education` (fora do MVP)                                       |
| Curso / Turma / Matrícula   | `education`                   | `Course`, `ClassGroup`, `Enrollment` | `education.courses`, `education.class_groups`, `education.enrollments` |
| Aluno / Professor           | `education`                   | `Student`, `Teacher`                 | `education.students`, `education.teachers`                             |
| Chamada / Relatório de Aula | `education`                   | `ClassAttendance`, `ClassReport`     | `education.class_attendances`, `education.class_reports`               |
| ListaEspera                 | `education`                   | `WaitingListEntry`                   | `education.waiting_list_entries`                                       |

### 2.1 Contratos Lógicos de Serviço (`08-api.md`)

- `PessoaService` → `PersonService` (exportado por `modules/registry`)
- `DocumentoPessoaService` → `PersonDocumentService` (exportado por `modules/registry`)
- `SocialService` → `AssistanceService` / `HouseholdService` / `AttendanceService` (exportados por `modules/assistance`)
- `AuditService` → `AuditService` (exportado por `modules/audit`)

---

## 3. Arquitetura de Código (Modular Monolith + Submódulos)

Conforme `06-architecture.md` e `08-api.md`, o repositório principal orquestra dois submódulos (`backend/` e `frontend/`), e o backend NestJS é organizado por **módulos de domínio**, refletindo exatamente os schemas do PostgreSQL.

### 3.1 Estrutura de Diretórios

```text
SIIBS/                                # Root Repository (AVL-Code/SIIBS)
├── AGENTS.md                         # Always-on root multi-agent & Orchestrator rule file
├── .agents/
│   ├── skills.json                   # Unified skill discovery across root, backend, and frontend
│   └── skills/                       # General, cross-cutting, testing & security skills
├── docs/
│   ├── agents/                       # Multi-agent operational playbooks (orchestrator, spec-architect, backend, frontend, qa-security)
│   ├── sdd/                          # Spec-Driven Development specifications
│   ├── backlog/                      # Backlog.md tasks & milestones
│   └── operations/                   # Installation, backup & restore runbooks
├── docker-compose.yml                # Local PostgreSQL 16+ & environment orchestration
│
├── backend/                          # Submodule: AVL-Code/SIIBS_Back (NestJS Modular Monolith)
│   ├── AGENTS.md                     # Always-on Backend NestJS Agent rule file
│   ├── .agents/
│   │   └── skills/                   # Backend-specific development skills
│   ├── src/
│   │   ├── modules/
│   │   │   ├── iam/                  # NestJS IamModule | PostgreSQL schema: iam
│   │   │   │   ├── domain/           # Entities, value objects, RBAC policies
│   │   │   │   ├── application/      # AuthService, PermissionGuard
│   │   │   │   ├── infrastructure/   # UserRepository, session adapters
│   │   │   │   ├── presentation/     # AuthController, UsersController (/api/v1/auth, /api/v1/users)
│   │   │   │   ├── schemas/          # Zod DTO validation schemas
│   │   │   │   ├── iam.module.ts     # Exports AuthService & PermissionGuard
│   │   │   │   └── index.ts          # Public module contract (barrel export)
│   │   │   │
│   │   │   ├── audit/                # NestJS AuditModule | PostgreSQL schema: audit (append-only)
│   │   │   │   ├── domain/           # AuditEvent entity & types
│   │   │   │   ├── application/      # AuditService
│   │   │   │   ├── infrastructure/   # AuditRepository (insert & query only)
│   │   │   │   ├── presentation/     # AuditController (/api/v1/audit)
│   │   │   │   ├── schemas/
│   │   │   │   ├── audit.module.ts   # Exports AuditService
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── registry/             # NestJS RegistryModule | PostgreSQL schema: registry (DA-003, DA-004, DA-015)
│   │   │   │   ├── domain/           # Person (incl. optional photo metadata), PersonDocument, PersonContact
│   │   │   │   ├── application/      # PersonService (CRUD, search, photo upload/stream), PersonDocumentService
│   │   │   │   ├── infrastructure/   # Repositories & encrypted local storage (./storage/photos/, ./storage/documents/)
│   │   │   │   ├── presentation/     # PersonsController (/api/v1/persons, /:id/photo), PersonDocumentsController
│   │   │   │   ├── schemas/          # Input/Output DTO Zod schemas
│   │   │   │   ├── registry.module.ts# Exports PersonService & PersonDocumentService
│   │   │   │   └── index.ts          # Only allowed entry point for other backend modules
│   │   │   │
│   │   │   ├── assistance/           # NestJS AssistanceModule | PostgreSQL schema: assistance (MVP)
│   │   │   │   ├── domain/           # Household, HouseholdMember, Attendance, HouseholdIncome, Benefit
│   │   │   │   ├── application/      # HouseholdService, AttendanceService, AssistanceReportService
│   │   │   │   ├── infrastructure/   # Repositories & queries
│   │   │   │   ├── presentation/     # HouseholdsController, AttendancesController, ReportsController
│   │   │   │   ├── schemas/
│   │   │   │   ├── assistance.module.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── education/            # NestJS EducationModule | PostgreSQL schema: education (Reserved)
│   │   │       └── README.md         # Architectural placeholder for future expansion
│   │   │
│   │   ├── shared/                   # Domain-agnostic utilities (UUIDv7, AES-256-GCM crypto, HMAC blind index, env validation, base errors)
│   │   ├── db/                       # PostgreSQL client, multi-schema configuration, migrations, seeds
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── scripts/                      # Backup, restore, and verification scripts
│
└── frontend/                         # Submodule: AVL-Code/SIIBS_Front (React + Vite + TypeScript)
    ├── AGENTS.md                     # Always-on Frontend React Agent rule file
    ├── .agents/
    │   └── skills/                   # Frontend-specific design & UI/UX skills
    └── src/
        ├── features/
        │   ├── auth/                 # Login & session handling
        │   ├── registry/             # Person search, reuse, profile & documents UI
        │   ├── assistance/           # Households, members, attendances, incomes, benefits, reports UI
        │   └── audit/                # Audit trail consultation UI
        ├── components/               # Shared shadcn/ui + Tailwind components
        ├── lib/                      # HTTP API client, query client, formatters
        ├── routes/                   # Application routing & route guards
        └── main.tsx
```

### 3.2 Regras de Fronteira entre Módulos (`08-api.md`)

1. **No Deep Imports:** Um módulo nunca importa arquivos internos (`domain/`, `infrastructure/`) de outro módulo. Toda comunicação entre módulos ocorre exclusivamente pelo `index.ts` do módulo alvo (contratos públicos).
2. **Write Isolation per Schema:** O módulo `assistance` referencia `registry.persons(id)` via Foreign Key, mas qualquer criação ou atualização de dados cadastrais gerais ou documentos de `Person` deve passar obrigatoriamente por `PersonService` ou `PersonDocumentService` (no módulo `registry`).
3. **Atomic Business + Audit Transactions (`DA-008`):** Toda operação de escrita recebe um `ActorContext` (`userId`, `roles`, `sourceModule`) e executa a mutação de negócio + a inserção em `audit.events` **dentro da mesma transação do PostgreSQL**. Se o registro de auditoria falhar, toda a transação sofre _rollback_.
4. **Backend Authorization Enforcement (`RNF-01`, `09-acceptance.md`):** Nenhuma verificação de permissão pode existir apenas no frontend. Todo método de serviço valida `PermissionGuard.assertCan(actor, permission)` antes de ler ou modificar dados.

---

## 4. Convenções de Código e Banco de Dados

### 4.1 Nomenclatura de Código

- **Files & Directories:** `kebab-case` (ex.: `person-document.service.ts`, `household-member.schema.ts`, `attendance.repository.ts`).
- **Classes, Interfaces, Types & React Components:** `PascalCase` (ex.: `PersonService`, `CreateHouseholdInput`, `HouseholdForm`).
- **Functions, Methods & Variables:** `camelCase` (ex.: `findPersonByName`, `registerAttendance`, `activeHouseholdMember`).
- **Constants & Enums:** `UPPER_SNAKE_CASE` (ex.: `SOURCE_MODULE.ASSISTANCE`, `HOUSEHOLD_ROLE.HEAD`).
- **Booleans:** prefixados com `is`, `has`, `can` ou `should` (ex.: `isActive`, `hasActiveHouseholdLink`, `canViewAssistanceData`).

### 4.2 Convenções de PostgreSQL

- **Schemas:** substantivos no singular (`iam`, `audit`, `registry`, `assistance`, `education`).
- **Tables & Columns:** `snake_case`, tabelas no plural e colunas no singular (ex.: `registry.persons`, `registry.person_documents`, `assistance.households`, `assistance.household_members`, `assistance.attendances`, `audit.events`).
- **Primary Keys:** `id UUID PRIMARY KEY` (gerado via `UUIDv7`).
- **Foreign Keys:** `<singular_entity>_id` com constraint explícita (ex.: `person_id`, `household_id`, `created_by_user_id`).
- **Timestamps:** `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.
- **No Redundant Flags in `Person` (`03-domain.md`, `07-data-model.md`):** Proibido criar colunas como `is_active_assistance` ou `is_active_education` em `registry.persons`. O vínculo ativo deve ser derivado das tabelas do respectivo domínio (`assistance.household_members`, etc.).
- **Soft Delete / Lifecycle State:** Registros de domínio (`persons`, `households`, `household_members`, `attendances`) nunca sofrem `DELETE` físico; utilizam colunas de ciclo de vida (`status`, `started_at`, `ended_at`, `deactivated_at`) para preservar histórico (`RF-11`).
- **Append-Only Audit (`AUDIT.md`):** A tabela `audit.events` e o `AuditRepository` permitem apenas `INSERT` e `SELECT`. Operações de `UPDATE` e `DELETE` são proibidas por código e por permissão/trigger de banco.

### 4.3 Tratamento de Erros e Retornos

- **Explicit DTOs (`RNF-02`):** Serviços nunca retornam entidades cruas do banco sem filtrar os atributos permitidos para o perfil do usuário requisitante. Dados do módulo `assistance` jamais são incluídos em respostas padrão do módulo `registry`.
- **Domain Errors Padronizados:** Uso de classes de erro tipadas em inglês (`NotFoundError`, `ForbiddenError`, `UnauthorizedError`, `ValidationError`, `ConflictError`), sem vazar _stack traces_ ou detalhes internos do banco para o cliente.

---

## 5. Fluxo SDD (Spec-Driven Development) e Testes

Nenhum código é implementado sem vínculo explícito com os requisitos (`02-requirements.md`), decisões (`DECISIONS.md`) e critérios de aceite (`09-acceptance.md`).

### 5.1 Ciclo de Desenvolvimento de uma Funcionalidade

1. **Spec Reference:** Identificar os requisitos (`RF-XX`, `RNF-XX`) e decisões (`DA-XXX`) atendidos pela tarefa.
2. **Contract Definition:** Definir/atualizar os schemas Zod e assinaturas de métodos no serviço correspondente (`08-api.md`).
3. **Acceptance Tests First:** Criar os testes cobrindo o fluxo principal, tentativa de acesso sem permissão (`ForbiddenError`) e geração do evento de auditoria (`AuditEvent`).
4. **Implementation:** Implementar regras de domínio, persistência PostgreSQL e interface.
5. **Spec Sync:** Se alguma questão de `OPEN-QUESTIONS.md` for respondida pela implementação, atualizar `DECISIONS.md` no mesmo Pull Request.

### 5.2 Estratégia de Testes (`10-tasks.md` — Etapa 4)

- **Unit Tests (`*.spec.ts`):** Testam regras de domínio puras isoladamente (ex.: garantia de exatamente um responsável vigente por `Household`, cálculos socioeconômicos).
- **Integration Tests (`*.int.spec.ts`):** Executados contra banco PostgreSQL de teste real, validando obrigatoriamente:
  1. Reaproveitamento de `Person` existente no `registry` sem duplicação (`RF-03`).
  2. Isolamento de dados sensíveis de `assistance` para usuários sem permissão (`RNF-02`).
  3. Atomicidade entre alteração de dados e gravação de `AuditEvent` em `audit.events` com `source_module`, `actor_user_id` e `changed_fields` (`RF-13`, `DA-008`).
- **End-to-End Tests (`e2e/*.e2e.ts`):** Validam os fluxos completos descritos em `09-acceptance.md`.

### 5.3 Arquitetura e Orquestração de Desenvolvimento Multiagêntico (`DA-014`)

Para acelerar e escalar o desenvolvimento de todo o sistema (módulos `iam`, `audit`, `registry`, `assistance` e futuramente `education`), o projeto adota um modelo de **desenvolvimento multiagêntico paralelo por papel/camada** coordenado por um **Agente Orquestrador** e isolado via **Git Worktrees** (documentado detalhadamente em [`docs/agents/`](../agents/README.md) e nas regras `AGENTS.md` da raiz, `backend/AGENTS.md` e `frontend/AGENTS.md`):

1. **Papéis de Agentes (`docs/agents/`):**
   - **Orchestrator Agent ([`docs/agents/orchestrator.md`](../agents/orchestrator.md)):** Único ponto de contato com o usuário e guardião do contexto do projeto. Seleciona dinamicamente o modelo de cada agente/etapa (`flash_lite`, `flash`, `pro`) para economia e eficiência de tokens, valida o *Contract-First Handshake* entre Backend e Frontend e responde dúvidas dos agentes consultando `docs/sdd/` (escalando ao usuário quando a regra não estiver documentada, sem jamais supor regras de negócio).
   - **Spec & Architecture Agent ([`docs/agents/spec-architect.md`](../agents/spec-architect.md)):** Mantém os documentos em `docs/sdd/`, resolve questões de `OPEN-QUESTIONS.md` em `DECISIONS.md` (após confirmação do usuário via Orquestrador) e define contratos Zod e fronteiras nos arquivos `index.ts` de cada módulo.
   - **Backend NestJS Agent ([`docs/agents/backend.md`](../agents/backend.md)):** Ativa obrigatoriamente as skills de desenvolvimento em `backend/.agents/skills/` e `.agents/skills/`, negocia o contrato de API com o Frontend e implementa entidades de domínio, serviços, criptografia (`AES-256-GCM` / `HMAC-SHA256`), repositórios PostgreSQL, migrações e controllers REST dentro de `backend/src/modules/<context>/`.
   - **Frontend React Agent ([`docs/agents/frontend.md`](../agents/frontend.md)):** Ativa obrigatoriamente as skills de design/UI em `frontend/.agents/skills/` e `.agents/skills/`, negocia o contrato de integração (rotas, botões, estados de erro e `data-testid`) com o Backend e implementa interfaces em `pt-BR`, captura de foto (webcam/upload), formulários React Hook Form + Zod e integração TanStack Query dentro de `frontend/src/features/<context>/`.
   - **QA & Security Agent ([`docs/agents/qa-security.md`](../agents/qa-security.md)):** Ativa as skills gerais e de teste em `.agents/skills/`, escreve e executa testes de aceitação, integração PostgreSQL, isolamento RBAC/privacidade, imutabilidade de auditoria, verificação de criptografia em repouso e ensaios de backup/restauração.
2. **Descoberta Distribuída de Skills (`.agents/skills.json`):**
   - O arquivo `.agents/skills.json` na raiz mapeia os três diretórios de skills: `.agents/skills/` (skills gerais e de teste na raiz), `backend/.agents/skills/` (skills focadas em desenvolvimento backend) e `frontend/.agents/skills/` (skills focadas em design e UI/UX).
3. **Handshake Contract-First (Backend ↔ Frontend antes do código):**
   - Antes que os agentes de Backend, Frontend e QA codifiquem em paralelo em uma funcionalidade, Backend e Frontend negociam e assinam um **Contrato de Integração da Task** (endpoints REST, DTOs Zod de entrada/saída, permissões RBAC/erros HTTP, botões/ações da tela e atributos `data-testid`), validado pelo Orquestrador.
4. **Isolamento Físico com Git Worktrees:**
   - Agentes trabalhando simultaneamente em Issues distintas nunca compartilham a mesma árvore de diretórios em disco. Cada Issue ativa utiliza um worktree dedicado (ex.: `git worktree add ../siibs-wt-issue-10 -b feat/10-registry-person-crud dev` nos submódulos correspondentes).
   - O paralelismo sem conflitos é garantido pelas regras da Seção 3.2: **No Deep Imports** (comunicação apenas via `index.ts`) e **Write Isolation per Schema** (cada módulo só escreve no seu próprio schema PostgreSQL).
5. **Delegação Operacional e Posse Exclusiva de Merge de PR:**
   - Tarefas operacionais básicas (como `git commit`/`push`, abertura de Pull Requests, verificação de CI e edições rotineiras) são sempre delegadas pelo Orquestrador a subagentes de modelos mais leves (`flash_lite`/`flash`), sendo os merges finais de PR realizados exclusivamente pelo **Usuário** após a aprovação do QA.

---

## 6. Padronização de GitHub Issues, Milestones, Branches e Commits (100% Inglês)

Todas as tarefas são rastreadas nativamente no GitHub Issues e organizadas em um **GitHub Projects (v2)**, garantindo conexão bidirecional entre especificações SDD, código, commits e PRs.

### 6.1 Milestones do GitHub (Mapeamento do `10-tasks.md`)

O repositório adota exatamente 4 Milestones correspondentes às etapas de desenvolvimento:

- **Milestone 1:** `Stage 1 - Foundations` (Ambiente, Schemas, IAM, Auditoria, Backup/Restore)
- **Milestone 2:** `Stage 2 - Registry Core` (Núcleo Person, Documentos, Busca e Reaproveitamento)
- **Milestone 3:** `Stage 3 - Assistance MVP` (Entidade Familiar, Responsável, Atendimentos, Benefícios, Relatórios)
- **Milestone 4:** `Stage 4 - Quality & Operations` (Testes de integração, segurança, teste real de restauração e operação)

### 6.2 Taxonomia de Labels do GitHub

Toda Issue deve conter no mínimo uma label de módulo e uma de tipo:

- **Modules:** `module:iam`, `module:audit`, `module:registry`, `module:assistance`, `module:shared`
- **Types:** `type:feat`, `type:fix`, `type:docs`, `type:test`, `type:chore`, `type:spec`
- **Spec / Status:** `spec:open-question` (para itens do `OPEN-QUESTIONS.md`), `status:blocked`

### 6.3 Estrutura de uma Issue no GitHub

Toda Issue de funcionalidade deve referenciar o SDD e conter:

```markdown
## Context & SDD References

- Requirements: RF-01, RF-03 (02-requirements.md)
- Decisions: DA-003, DA-011 (DECISIONS.md)
- Acceptance Criteria: 09-acceptance.md#pessoas-e-documentos

## Description

Brief summary of what needs to be implemented.

## Acceptance Checklist

- [ ] Contract/Zod schema defined
- [ ] Unit & integration tests created
- [ ] Implementation completed
- [ ] AuditEvent registered atomically
```

### 6.4 Branching Strategy & Environment Promotion (`dev` → `hml` → `main`)

O ciclo de vida de branches segue promoção por ambiente e por conclusão de Milestone:

- **Branches Permanentes (em `SIIBS`, `SIIBS_Back` e `SIIBS_Front`):**
  - `dev` — Branch de integração contínua durante o desenvolvimento das tasks da Milestone atual (com testes locais e CI).
  - `hml` — Branch de homologação: recebe o pacote completo da `dev` via Pull Request ao **finalizar uma Milestone** (ex.: ao concluir a `Stage 1 - Foundations`) para bateria de testes integrados e validação.
  - `main` — Branch de produção/release estável: recebe código exclusivamente via promoção aprovada a partir de `hml`.
- **Branches de Trabalho (Features/Chores/Fixes):**
  - Criadas a partir de `dev` e mergeadas de volta em `dev` via Pull Request.
  - Formato obrigatório com o número da Issue: `<type>/<issue-#>-<module>-<short-description>`
  - Exemplos:
    - `feat/12-registry-person-search`
    - `feat/18-assistance-household-head`
    - `fix/23-assistance-single-head-validation`
    - `docs/5-tech-spec-update`
    - `chore/8-postgres-backup-script`

### 6.5 Commit Message Convention com Rastreabilidade

Formato obrigatório em inglês:

```text
<type>(<scope>): <imperative summary in english> [spec-ref] (#<issue-#>)
```

- **Allowed Types:** `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- **Allowed Scopes:** `registry`, `assistance`, `iam`, `audit`, `education`, `db`, `backup`, `ui`, `spec`, `shared`
- **Exemplos Válidos:**
  - `feat(registry): implement person search and record reuse [RF-01, RF-03] (#12)`
  - `feat(audit): enforce transactional audit logging on person updates [RF-13, DA-008] (#14)`
  - `feat(assistance): enforce single active head per household [RF-04, RF-05] (#18)`
  - `test(assistance): add integration tests for role-based data isolation [RNF-01, RNF-02] (#21)`
  - `chore(backup): add automated pg_dump and restore verification scripts [RNF-06] (#8)`

### 6.6 Pull Request Checklist & Automação do Board no GitHub Projects

Como o padrão de branches (`<type>/<issue-#>-...`) e de commits (`... (#<issue-#>)`) carrega sempre o ID da Issue, o CI/CD automatiza a movimentação dos cards no **GitHub Project #2**:

1. **Branch criada ou primeiro commit enviado (`create` / `push` em `<type>/<issue-#>-*`):** GitHub Actions identifica `#<issue-#>` e move automaticamente o card para **`In Progress`** no GitHub Project.
2. **Pull Request mergeado na `dev`:** O card da task é movido para **`Done`** (ou concluído no escopo de desenvolvimento da Milestone) e vinculado ao PR.
3. **Fechamento de Milestone (`dev` → `hml` → `main`):** Ao concluir todas as tasks da Milestone na `dev`, promove-se `dev` para `hml` para homologação integrada e, após aprovação, para `main`.

Todo PR deve referenciar a Issue (`Refs #<issue-#>` ou `Closes #<issue-#>`):

```markdown
Closes #12

## Summary of Changes

- Implemented Person search by name/document with similarity scoring.
- Added reuse prompt to prevent duplicate entries (RF-03).
- Added audit logging with source module on every mutation (DA-008).

## Definition of Done Checklist

- [ ] Linked to SDD requirements and Issue (#12).
- [ ] Backend authorization enforced in service layer (`PermissionGuard`).
- [ ] Atomic PostgreSQL transaction for domain change + `AuditEvent`.
- [ ] No sensitive `assistance` data leaked into `registry` contracts.
- [ ] Unit & PostgreSQL integration tests passing (`npm test`).
- [ ] Linter and TypeScript strict typecheck passing.
```

---

## 7. Operação Local, Backup Criptografado e Restauração (`RNF-05`, `RNF-06`, `RNF-10`, `DA-013`)

- **Environment & Key Management Configuration:** Variáveis de ambiente centralizadas em `.env` e validadas no boot via Zod (`src/shared/env.ts`), incluindo `DATABASE_URL`, `SESSION_SECRET`, `STORAGE_DIR`, `BACKUP_TARGET_DIR`, `DATA_ENCRYPTION_KEY` (chave de 256 bits para `AES-256-GCM` de colunas e arquivos), `BLIND_INDEX_KEY` (chave de 256 bits para `HMAC-SHA256`) e `BACKUP_ENCRYPTION_KEY` (chave exclusiva para criptografia de pacotes de backup). O `.env.example` é versionado sem segredos no Git, e as chaves nunca são armazenadas dentro dos pacotes de backup.
- **Automated Encrypted Backup Script (`npm run db:backup`):**
  1. Executa `pg_dump --format=custom --no-owner --no-acl` gerando um dump transacionalmente consistente de todos os schemas (`iam`, `audit`, `registry`, `assistance`) do PostgreSQL.
  2. Empacota o dump junto com os diretórios protegidos `./storage/documents/` e `./storage/photos/` em um arquivo datado.
  3. Criptografa o pacote completo com `AES-256` utilizando `BACKUP_ENCRYPTION_KEY`, gera manifesto com checksum `SHA-256` e copia o pacote cifrado para o diretório externo configurado (`BACKUP_TARGET_DIR`).
- **Automated Restore & Verification (`npm run db:restore` / `npm run db:verify-backup`):**
  - Valida o checksum `SHA-256`, descriptografa o pacote com `BACKUP_ENCRYPTION_KEY`, restaura o dump via `pg_restore` em um banco PostgreSQL temporário de verificação (`sdd_verify_restore`), executa checagens de contagem, integridade referencial e integridade dos arquivos (`./storage/documents/` e `./storage/photos/`), e registra a evidência do teste de restauração exigida nos critérios de aceite (`09-acceptance.md`).
