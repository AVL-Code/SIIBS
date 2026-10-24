# SDD — Plataforma de Gestão Social e Cursos

**Versão:** 0.3  
**Status:** documentação inicial para orientar a implementação do módulo Social.

## Visão geral
A plataforma será desenvolvida por etapas. A primeira entrega contempla o módulo de Assistência Social. Futuramente, poderá incorporar gestão de cursos, alunos, matrículas, turmas, professores, frequência, relatórios de aula, lista de espera e portal de responsáveis.

A arquitetura prevê um núcleo compartilhado de pessoas, evitando cadastros duplicados e permitindo reutilizar dados básicos. A implementação de Cursos não faz parte do MVP atual.

## Documentos
- `01-product.md` — visão, objetivos e escopo.
- `02-requirements.md` — requisitos funcionais e não funcionais.
- `03-domain.md` — conceitos e regras de domínio.
- `04-mvp.md` — limites do MVP Social.
- `05-ux.md` — diretrizes de experiência.
- `06-architecture.md` — arquitetura modular.
- `07-data-model.md` — modelo conceitual de dados.
- `08-api.md` — contratos e integração.
- `09-acceptance.md` — critérios de aceite.
- `10-tasks.md` — plano inicial de trabalho.
- `11-tech-spec.md` — especificação técnica, arquitetura de código, PostgreSQL e convenções (código, branches e commits em inglês).
- `SECURITY.md` — segurança e privacidade.
- `AUDIT.md` — trilha de auditoria.
- `DECISIONS.md` — decisões arquiteturais.
- `OPEN-QUESTIONS.md` — questões pendentes.

## Princípios
1. Implementar primeiro o Social.
2. Manter responsabilidades de domínio separadas.
3. Centralizar dados cadastrais comuns em `Pessoa`.
4. Compartilhar documentos gerais vinculados à pessoa.
5. Registrar alterações relevantes com autor, data/hora e entidade afetada.
6. Aplicar permissões por função e necessidade de acesso.
7. Priorizar baixo custo, execução local, backup e restauração.
8. Não presumir que CPF será obrigatório ou único até confirmação.
