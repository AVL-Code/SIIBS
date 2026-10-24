# 09 — Critérios de aceite

## Pessoas e documentos
- Usuário autorizado cadastra e localiza Pessoa.
- A busca encontra Pessoa existente e permite reutilizá-la sem duplicar dados básicos.
- Documentos gerais são associados à Pessoa e consultados conforme permissão.
- CPF não é chave técnica; obrigatoriedade/unicidade ficam pendentes até decisão.
- Alteração autorizada em dado compartilhado aparece nas consultas seguintes de todos os módulos que usam a mesma Pessoa.
- A alteração é registrada na auditoria.

## Social
- Usuário cria entidade familiar, designa responsável e vincula integrantes.
- O sistema sinaliza vínculo familiar existente conforme regras definidas.
- É possível registrar atendimento, avaliação, decisão e histórico.
- Dados socioeconômicos, programas, benefícios e projetos podem ser registrados.
- Relatórios básicos respeitam permissões.

## Segurança e operação
- Não é possível contornar permissões apenas chamando endpoints diretamente.
- Dados sensíveis do Social não são exibidos a usuários sem autorização.
- Auditoria inclui ator, data/hora, ação, módulo e entidade afetada.
- Backup/restauração são documentados e há teste de restauração registrado.
- O sistema executa no ambiente local previsto.

## Cursos — critérios futuros
Serão especificados no planejamento de Cursos: matrículas/turmas, professores, chamadas, relatórios, lista de espera automática e portal de responsáveis.
