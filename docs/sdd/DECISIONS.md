# Decisões arquiteturais

## DA-001 — Entrega por etapas

Desenvolver primeiro Social. Cursos é expansão futura, fora do MVP.

## DA-002 — Monólito modular inicial com submódulos Front/Back

Manter o projeto estruturado no repositório raiz (`SIIBS`) com dois submódulos Git: `backend/` (`SIIBS_Back` em NestJS) e `frontend/` (`SIIBS_Front` em React + Vite). No backend, todos os domínios (`iam`, `audit`, `registry`, `assistance` e futuramente `education`) coexistem em um único monólito modular conectado a um banco PostgreSQL local, evitando microserviços distribuídos até necessidade comprovada.

## DA-003 — Núcleo compartilhado de Pessoas

Manter registro canônico de Pessoa para dados cadastrais comuns, reutilizado por Social e futuramente Cursos. Alterações autorizadas refletem-se nos dois módulos, sem cópias independentes.

## DA-004 — Documentos gerais em Pessoa

Documentos comuns, inicialmente RG e comprovante de endereço, serão modelados no núcleo Pessoas. Lista completa e regras de validade/acesso pendentes. Não presumir unicidade para todos os tipos.

## DA-005 — Papéis de domínio são distintos

Pessoa, membro familiar, aluno, responsável por matrícula e contato de emergência são conceitos/vínculos diferentes. Uma pessoa pode assumir papéis diferentes sem duplicar identidade.

## DA-006 — Professor como cadastro específico de Cursos

Professor será cadastro do domínio Cursos, não automaticamente parte do núcleo Pessoas. Relação com contas de acesso será decidida futuramente.

## DA-007 — Dados específicos segregados

Dados socioeconômicos, benefícios e atendimentos do Social não serão compartilhados automaticamente com Cursos.

## DA-008 — Alterações compartilhadas auditadas

Usuários autorizados de qualquer módulo poderão alterar dados comuns de Pessoa/documentos. Cada alteração relevante deverá ser auditada e a autorização validada no backend.

## DA-009 — Lista de espera automática

A lista de espera futura terá ordenação automática. Regras de prioridade/desempate serão definidas no desenvolvimento do módulo.

## DA-010 — Portal de responsáveis futuro

Prever portal com acesso próprio, mas deixar método de autenticação, dados disponíveis e regras completas para definição futura.

## DA-011 — Identificador técnico

Usar identificador interno estável para Pessoa. CPF não será chave primária; obrigatoriedade/unicidade de CPF/documentos ainda precisam ser definidas.

## DA-012 — Perfis de acesso (RBAC), matriz de permissões e isolamento de dados por módulo

Adotar controle de acesso baseado em papéis e permissões granulares (`iam.roles`, `iam.permissions`, `iam.user_roles`, `iam.role_permissions`) validado obrigatoriamente no backend via `PermissionGuard` (`RF-14`, `RNF-01`, `RNF-02`).

### 1. Perfis de Usuário (`iam.roles`)

O sistema define **3 perfis internos** (sem perfis artificiais como coordenador exclusivo ou operador dedicado apenas ao cadastro geral), permitindo que uma conta de usuário possua um ou mais perfis (`iam.user_roles` com união aditiva de permissões):

- **`SYSTEM_ADMIN` (Administrador do Sistema):** acesso administrativo completo a todos os módulos (`iam`, `audit`, `registry` e `assistance`), sendo o único perfil autorizado a gerenciar contas e atribuições de perfis (`iam:user:manage`).
- **`SOCIAL_OPERATOR` (Operador(a) / Assistente Social):** opera integralmente o módulo compartilhado `registry` (pessoas e documentos) e o módulo `assistance` (entidades familiares, membros, atendimentos, rendas, benefícios/cestas e relatórios), além de consultar a trilha de auditoria (`audit:event:read`). Não possui permissão para gerenciar usuários (`iam:user:manage`).
- **`EDUCATION_OPERATOR` (Operador(a) de Cursos — fronteira reservada para expansão futura):** opera integralmente o módulo compartilhado `registry` (pessoas e documentos), consulta a trilha de auditoria (`audit:event:read`) e operará futuramente o módulo `education` (`education:*`), sem qualquer acesso aos dados do módulo `assistance` nem gerenciamento de usuários (`iam:user:manage`).

### 2. Matriz de Permissões Granulares (`iam.permissions`)

| Permissão                     | Módulo       | Descrição                                                                            | `SYSTEM_ADMIN` | `SOCIAL_OPERATOR` | `EDUCATION_OPERATOR` (Futuro) |
| :---------------------------- | :----------- | :----------------------------------------------------------------------------------- | :------------: | :---------------: | :---------------------------: |
| `registry:person:read`        | `registry`   | Consultar e buscar cadastro geral de `Person` e contatos                             |      Sim       |        Sim        |              Sim              |
| `registry:person:write`       | `registry`   | Criar e atualizar dados cadastrais básicos de `Person` e contatos                    |      Sim       |        Sim        |              Sim              |
| `registry:document:read`      | `registry`   | Consultar metadados e baixar arquivos de `PersonDocument`                            |      Sim       |        Sim        |              Sim              |
| `registry:document:write`     | `registry`   | Registrar, atualizar e anexar arquivos em `PersonDocument`                           |      Sim       |        Sim        |              Sim              |
| `assistance:household:read`   | `assistance` | Consultar entidades familiares, composição e responsável vigente (`RF-04` a `RF-06`) |      Sim       |        Sim        |              Não              |
| `assistance:household:write`  | `assistance` | Criar/atualizar entidades familiares, vínculos de membros e responsável              |      Sim       |        Sim        |              Não              |
| `assistance:attendance:read`  | `assistance` | Consultar prontuários e histórico de atendimentos sociais (`RF-09`, `RF-11`)         |      Sim       |        Sim        |              Não              |
| `assistance:attendance:write` | `assistance` | Registrar e atualizar atendimentos, avaliações e encaminhamentos sociais             |      Sim       |        Sim        |              Não              |
| `assistance:income:read`      | `assistance` | Consultar fontes de renda e cálculos socioeconômicos (`RF-07`)                       |      Sim       |        Sim        |              Não              |
| `assistance:income:write`     | `assistance` | Registrar e atualizar rendas familiares (`RF-07`)                                    |      Sim       |        Sim        |              Não              |
| `assistance:benefit:read`     | `assistance` | Consultar programas, benefícios, cestas emergenciais e projetos (`RF-08`, `RF-10`)   |      Sim       |        Sim        |              Não              |
| `assistance:benefit:write`    | `assistance` | Registrar concessão/participação em benefícios, cestas e projetos (`RF-08`, `RF-10`) |      Sim       |        Sim        |              Não              |
| `assistance:report:read`      | `assistance` | Consultar indicadores e relatórios gerenciais da Assistência Social (`RF-12`)        |      Sim       |        Sim        |              Não              |
| `audit:event:read`            | `audit`      | Consultar trilha de auditoria (`RF-13`, `DA-008`) respeitando visibilidade do módulo |      Sim       |        Sim        |    Sim (escopo autorizado)    |
| `iam:user:manage`             | `iam`        | Criar, ativar/inativar usuários, redefinir credenciais e atribuir perfis (`RF-14`)   |      Sim       |        Não        |              Não              |

### 3. Regras de Visibilidade e Isolamento de Dados (`RNF-01`, `RNF-02`, `DA-007`, `DA-008`)

1. **Segregação estrita do módulo `assistance`:** Usuários sem as respectivas permissões `assistance:*` (como `EDUCATION_OPERATOR`) não podem consultar, filtrar nem receber em DTOs do `registry` dados socioeconômicos, composição familiar (`households`), rendas (`household_incomes`), programas/benefícios/cestas (`benefits`, `emergency_baskets`, `project_participations`) ou histórico e avaliações de atendimentos (`attendances`).
2. **Detecção de vínculo familiar (`RF-06`):** Nas buscas de `Person` pelo módulo `registry`, a informação sobre vínculo ativo com `Household` e os detalhes da entidade familiar só são retornados quando o `ActorContext` possui `assistance:household:read`.
3. **Visibilidade na Trilha de Auditoria (`audit:event:read`):** Todos os 3 perfis podem consultar o log de auditoria (`audit.events`), porém usuários sem permissões `assistance:*` (como `EDUCATION_OPERATOR`) visualizam apenas os eventos de módulos aos quais têm acesso de leitura (ex.: `registry` e `education`), nunca recebendo payloads (`previous_values` / `new_values`) de entidades do schema `assistance`.
