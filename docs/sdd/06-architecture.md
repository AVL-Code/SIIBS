# 06 — Arquitetura

## Direção recomendada
Adotar inicialmente um **monólito modular** dividido em dois submódulos Git sob o repositório principal (`SIIBS`):
- **Backend (`backend/` — `SIIBS_Back`):** uma única aplicação **NestJS** com limites de domínio explícitos (`IamModule`, `AuditModule`, `RegistryModule`, `AssistanceModule` e futuramente `EducationModule`), evitando microserviços, múltiplos bancos e chamadas de rede entre domínios nesta fase.
- **Frontend (`frontend/` — `SIIBS_Front`):** uma SPA leve em **React + Vite + TypeScript** que consome a API REST interna do `SIIBS_Back`.

## Módulos lógicos
- **Núcleo Pessoas:** dados gerais, documentos comuns e busca/identificação.
- **Social:** entidade familiar, vínculos, situação socioeconômica, atendimentos, benefícios, projetos e relatórios.
- **Identidade e acesso:** contas internas, autenticação e autorização.
- **Auditoria:** trilha de ações e alterações.
- **Cursos (futuro):** cursos, turmas, alunos, matrículas, professores, frequência, relatórios, lista de espera e portal de responsáveis.

Professor será cadastro específico de Cursos, não automaticamente parte do núcleo Pessoas. A relação com contas de usuário será decidida ao desenhar o módulo.

## Banco de dados
- Banco local conforme requisitos de infraestrutura.
- Um registro canônico de Pessoa compartilhado entre módulos.
- Documentos gerais vinculados à Pessoa.
- Tabelas de domínio separadas para Social e, futuramente, Cursos.
- Chaves estrangeiras e transações para manter integridade.
- Não copiar campos compartilhados para tabelas específicas de cada módulo.
- Evitar flags redundantes em Pessoa para estado de participação em cada módulo.
- Aplicar autorização no backend e controles de banco quando viáveis.

## Dados compartilhados
Usuários autorizados dos dois módulos poderão corrigir dados gerais de Pessoa e documentos comuns. Alterações serão refletidas imediatamente nas consultas porque não há cópias independentes, e gerarão auditoria com usuário, data/hora, módulo de origem e campos alterados.

Documentos gerais, inicialmente RG e comprovante de endereço, serão candidatos a compartilhamento pelo núcleo Pessoas. Lista final, validade, acesso e armazenamento serão definidos depois.

## Autorização e privacidade
Compartilhar cadastro básico não implica acesso irrestrito. Cursos não terá acesso automático a atendimentos, renda, benefícios ou avaliações sociais.

## Possível separação futura
Se escala, autonomia de implantação, segurança ou operação justificarem, Cursos poderá ser extraído com API explícita. Para reduzir acoplamento: manter limites de módulo, evitar acesso direto às tabelas internas de outro domínio, concentrar regras no domínio responsável e documentar contratos.

## Infraestrutura
Priorizar execução local, baixo consumo, ferramentas gratuitas/open source, backup e restauração testados. Proteger fisicamente o equipamento e manter backups separados.
