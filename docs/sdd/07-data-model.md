# 07 — Modelo conceitual de dados

Este modelo é conceitual, não um esquema SQL definitivo.

## Núcleo compartilhado

### Pessoa
- `id` — identificador interno estável, chave primária.
- nome e demais dados cadastrais básicos.
- data de nascimento e contatos, conforme necessidade.
- timestamps de criação/atualização.

CPF não está confirmado como obrigatório ou único; não usar como chave primária.

### DocumentoPessoa
- `id`, `pessoa_id`, tipo de documento.
- número/identificador, quando aplicável.
- emissor, datas de emissão/validade e metadados pertinentes.
- referência segura ao arquivo digital, se houver.
- timestamps e estado do documento.

Unicidade deve ser definida por tipo e regra confirmada. Comprovante de endereço pode ser renovado e manter histórico, conforme regra futura.

### ContatoPessoa
Se for necessário múltiplos telefones/e-mails com tipo, preferência e validade, representar contatos em entidade própria em vez de manter apenas campos fixos.

## Domínio Social
- **EntidadeFamiliar:** identificação, status e timestamps.
- **MembroEntidadeFamiliar:** `entidade_familiar_id`, `pessoa_id`, papel, datas do vínculo e estado.
- **AtendimentoSocial:** pessoa e/ou família atendida, usuário responsável, data/hora, avaliação, encaminhamentos e decisão.
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
