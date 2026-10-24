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
