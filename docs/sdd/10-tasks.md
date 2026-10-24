# 10 — Plano inicial de trabalho

> **Rastreabilidade:** Todas as tarefas abaixo estão detalhadas em [`docs/backlog/`](../backlog/README.md) e sincronizadas com as **Issues `#1` a `#24`** e **Milestones `1` a `4`** no GitHub (`AVL-Code/SIIBS`).

## Etapa 1 — Fundamentos (`Stage 1 - Foundations`)
- [ ] Confirmar stack e ambiente local ([#1](https://github.com/AVL-Code/SIIBS/issues/1), [#4](https://github.com/AVL-Code/SIIBS/issues/4)).
- [ ] Configurar repositório, ambientes, CI/CD, segurança das branches e convenções ([#1](https://github.com/AVL-Code/SIIBS/issues/1), [#2](https://github.com/AVL-Code/SIIBS/issues/2), [#3](https://github.com/AVL-Code/SIIBS/issues/3)).
- [ ] Definir esquema e migrações ([#4](https://github.com/AVL-Code/SIIBS/issues/4)).
- [ ] Implementar autenticação e autorização ([#5](https://github.com/AVL-Code/SIIBS/issues/5), [#6](https://github.com/AVL-Code/SIIBS/issues/6)).
- [ ] Implementar auditoria transversal ([#7](https://github.com/AVL-Code/SIIBS/issues/7)).
- [ ] Documentar e automatizar backup/restauração ([#8](https://github.com/AVL-Code/SIIBS/issues/8)).

## Etapa 2 — Núcleo Pessoas (`Stage 2 - Registry Core`)
- [ ] Definir campos básicos, regras de CPF/documentos e validação de duplicidades ([#9](https://github.com/AVL-Code/SIIBS/issues/9)).
- [ ] Implementar Pessoa com identificador interno (`UUIDv7`) e contatos ([#10](https://github.com/AVL-Code/SIIBS/issues/10)).
- [ ] Implementar documentos gerais vinculados à Pessoa e armazenamento local protegido ([#11](https://github.com/AVL-Code/SIIBS/issues/11)).
- [ ] Implementar busca, detecção de similaridade e reaproveitamento ([#12](https://github.com/AVL-Code/SIIBS/issues/12)).
- [ ] Auditar alterações em dados/documentos ([#10](https://github.com/AVL-Code/SIIBS/issues/10), [#11](https://github.com/AVL-Code/SIIBS/issues/11)).

## Etapa 3 — Social (`Stage 3 - Assistance MVP`)
- [ ] Especificar regras de histórico familiar, transição de responsável, benefícios e atendimentos ([#13](https://github.com/AVL-Code/SIIBS/issues/13)).
- [ ] Implementar entidade familiar, integrantes e regra de único responsável ativo ([#14](https://github.com/AVL-Code/SIIBS/issues/14)).
- [ ] Implementar dados socioeconômicos e rendas ([#15](https://github.com/AVL-Code/SIIBS/issues/15)).
- [ ] Implementar programas/benefícios ([#16](https://github.com/AVL-Code/SIIBS/issues/16)).
- [ ] Implementar atendimentos, avaliações e histórico ([#17](https://github.com/AVL-Code/SIIBS/issues/17)).
- [ ] Implementar cestas e participação em projetos ([#18](https://github.com/AVL-Code/SIIBS/issues/18)).
- [ ] Implementar relatórios/indicadores básicos ([#19](https://github.com/AVL-Code/SIIBS/issues/19)).

## Etapa 4 — Qualidade e implantação (`Stage 4 - Quality & Operations`)
- [ ] Testes unitários, de integração, integridade e duplicidade ([#20](https://github.com/AVL-Code/SIIBS/issues/20)).
- [ ] Testes de autorização e privacidade ([#21](https://github.com/AVL-Code/SIIBS/issues/21)).
- [ ] Testes de auditoria ([#22](https://github.com/AVL-Code/SIIBS/issues/22)).
- [ ] Teste real de restauração ([#23](https://github.com/AVL-Code/SIIBS/issues/23)).
- [ ] Documentar instalação e operação ([#24](https://github.com/AVL-Code/SIIBS/issues/24)).

## Futuro — Cursos (não iniciar agora)
- [ ] Levantar regras de cursos, turmas, matrículas e elegibilidade.
- [ ] Definir professor e associação a usuário.
- [ ] Definir responsável principal e contatos de emergência.
- [ ] Especificar chamadas, frequência e relatórios.
- [ ] Especificar regras da lista de espera automática.
- [ ] Definir autenticação/permissões do portal.
- [ ] Definir dados de Pessoa/documentos consultáveis e editáveis por Cursos.
