# 08 — Contratos e integração

## MVP
A comunicação divide-se em dois níveis claros:
1. **Entre Frontend (`SIIBS_Front`) e Backend (`SIIBS_Back`):** API HTTP REST interna (`/api/v1/...`) protegida por sessão `HttpOnly` e guards de permissão no NestJS.
2. **Entre Módulos de Domínio dentro do Backend (`SIIBS_Back`):** chamadas internas em memória via injeção de dependência de serviços exportados pelos módulos do NestJS (`RegistryModule`, `AssistanceModule`, `AuditModule`, `IamModule`). Não criar microserviços separados nem chamadas HTTP entre módulos de domínio no MVP.

## Contratos lógicos iniciais
- `PessoaService`: buscar, criar, consultar dados básicos e atualizar Pessoa.
- `DocumentoPessoaService`: listar e manter documentos gerais conforme permissões.
- `SocialService`: criar entidade familiar, associar membro, registrar atendimento e consultar histórico.
- `AuditService`: registrar operações e alterações relevantes.

Os nomes são ilustrativos, sem obrigação de linguagem ou framework.

## Regras
- Social não altera dados específicos de Cursos.
- Cursos não altera dados específicos do Social.
- Ambos podem atualizar dados gerais de Pessoa/documentos compartilhados se o usuário tiver permissão.
- Validar autorização no backend e registrar auditoria.
- Coordenar alteração e auditoria de modo consistente; evitar mudanças sem trilha.
- Retornar apenas os campos necessários e autorizados.
- Não retornar dados sensíveis do Social em consultas de Cursos.

## API futura
Se os módulos forem separados, definir API autenticada e versionada para Pessoa/documentos e políticas de erro, indisponibilidade, concorrência e auditoria. Não criar essa infraestrutura sem necessidade comprovada.
