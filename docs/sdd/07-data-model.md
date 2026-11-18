# 07 — Modelo conceitual de dados

Este modelo é conceitual, não um esquema SQL definitivo.

## Núcleo compartilhado

### Pessoa
- `id` — identificador interno estável (`UUIDv7`), chave primária (`DA-011`).
- nome e demais dados cadastrais básicos (nome mantido pesquisável para buscas parciais/fonéticas).
- data de nascimento e contatos, conforme necessidade.
- `cpf_encrypted` (`AES-256-GCM`) e `cpf_blind_index` (`HMAC-SHA256`) quando CPF for informado no registro principal, permitindo unicidade e busca exata sem armazenar CPF em texto claro (`DA-013`).
- foto de identificação opcional (`photo_storage_key`, `photo_mime_type`, `photo_size_bytes`, `photo_checksum_sha256`, `photo_updated_at`), referenciando arquivo comprimido (`WebP`/`JPEG` até 500 KB) e criptografado em `./storage/photos/` (`DA-015`).
- timestamps de criação/atualização.

CPF não está confirmado como obrigatório; não usar como chave primária.

### DocumentoPessoa
- `id`, `pessoa_id`, tipo de documento.
- número/identificador criptografado (`number_encrypted` via `AES-256-GCM`) e `number_blind_index` (`HMAC-SHA256`) para busca exata e verificação de unicidade quando aplicável (`DA-013`).
- emissor, datas de emissão/validade e metadados pertinentes.
- referência segura ao arquivo digital criptografado em `./storage/documents/`, se houver.
- timestamps e estado do documento.

Unicidade deve ser definida por tipo e regra confirmada. Comprovante de endereço pode ser renovado e manter histórico, conforme regra futura.

### ContatoPessoa
Se for necessário múltiplos telefones/e-mails com tipo, preferência e validade, representar contatos em entidade própria em vez de manter apenas campos fixos.

## Domínio Social
- **EntidadeFamiliar:** identificação, status e timestamps.
- **MembroEntidadeFamiliar:** `entidade_familiar_id`, `pessoa_id`, papel, datas do vínculo e estado.
- **AtendimentoSocial:** pessoa e/ou família atendida, usuário responsável, data/hora, avaliação/observações sociais criptografadas (`notes_encrypted` via `AES-256-GCM`, `DA-013`), encaminhamentos e decisão.
- **Renda**, **Programa/Benefício**, **ParticipaçãoProjeto** e **CestaBeneficio:** entidades próprias do Social.

O responsável familiar pode ser representado pelo papel no vínculo ou por referência explícita. Deve existir exatamente um responsável vigente conforme regra atual e a implementação deve preservar histórico de mudanças.

## Domínio Cursos (futuro)
- `Aluno`: registro educacional associado a `Pessoa`.
- `Curso`, `Turma`, `Matricula`.
- `ResponsavelMatricula`: vínculo entre matrícula/aluno e Pessoa responsável principal.
- `ContatoEmergenciaAluno`: vínculo de contato de emergência com uma Pessoa.
- `Professor`: cadastro específico de Cursos.
- `ProfessorTurma`: associação de professor à turma.
- `Frequencia`/`Chamada`, `RelatorioAula`.
- `ListaEspera`/`InscricaoListaEspera`, com ordenação automática conforme regras futuras.
- `ContaResponsavel` ou mecanismo equivalente para o portal, se aprovado.

## Usuários e auditoria
- `Usuario`: conta interna, separada de Pessoa até decisão explícita de vinculá-las.
- `Papel`/`Permissao`: controle de acesso.
- `EventoAuditoria`: ator, data/hora, ação, módulo, entidade afetada, resultado e dados de alteração minimizados.

## Regras
- Uma Pessoa canônica é reutilizada entre módulos.
- Documentos gerais pertencem à Pessoa, não a cópias específicas de Social/Cursos.
- Membro familiar, aluno, responsável por matrícula e contato de emergência são papéis/vínculos diferentes.
- Dados sensíveis do Social permanecem segregados por autorização.
- Estados de participação ficam no vínculo de domínio, não em flags redundantes na Pessoa.
