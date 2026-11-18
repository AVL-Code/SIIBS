# 09 — Critérios de aceite

## Pessoas e documentos
- Usuário autorizado cadastra e localiza Pessoa (por nome ou por busca exata de documento via *blind index* `HMAC-SHA256`).
- É possível anexar, visualizar, substituir ou remover a foto opcional de identificação da Pessoa (captura via webcam ou upload), comprimida (`WebP`/`JPEG` até 500 KB), armazenada fora de diretórios públicos e visível nos módulos autorizados (`DA-015`).
- A busca encontra Pessoa existente (exibindo sua foto, quando houver) e permite reutilizá-la sem duplicar dados básicos.
- Documentos gerais são associados à Pessoa, armazenados criptografados e consultados conforme permissão.
- CPF não é chave técnica; quando informado, é criptografado (`AES-256-GCM`) e indexado via *blind index* (`HMAC-SHA256`).
- Alteração autorizada em dado compartilhado (incluindo foto e documentos) aparece nas consultas seguintes de todos os módulos que usam a mesma Pessoa.
- A alteração é registrada na auditoria.

## Social
- Usuário cria entidade familiar, designa responsável e vincula integrantes.
- O sistema sinaliza vínculo familiar existente conforme regras definidas.
- É possível registrar atendimento, avaliação, decisão e histórico.
- Dados socioeconômicos, programas, benefícios e projetos podem ser registrados.
- Relatórios básicos respeitam permissões.

## Segurança e operação
- Não é possível contornar permissões apenas chamando endpoints diretamente (incluindo rotas de download de documentos e fotos).
- Dados sensíveis do Social não são exibidos a usuários sem autorização.
- Colunas ultrassensíveis (CPF, números de documentos sensíveis, avaliações sociais) e arquivos em `./storage/` encontram-se criptografados em repouso (`AES-256-GCM`), não sendo legíveis em texto claro diretamente em dumps brutos do banco ou no disco (`DA-013`).
- Auditoria inclui ator, data/hora, ação, módulo e entidade afetada, sem vazar chaves ou dados ultrassensíveis em texto claro nos logs.
- Backup/restauração são criptografados com chave dedicada (`BACKUP_ENCRYPTION_KEY`), documentados e há teste real de restauração registrado.
- O sistema executa no ambiente local previsto.

## Cursos — critérios futuros
Serão especificados no planejamento de Cursos: matrículas/turmas, professores, chamadas, relatórios, lista de espera automática e portal de responsáveis.
