# Trilha de auditoria

## Objetivo
Rastrear operações relevantes, apoiar investigação de erros e preservar responsabilidade sobre alterações.

## Eventos mínimos
- criação, atualização, inativação e associação de registros;
- alteração de dados gerais de Pessoa;
- inclusão, substituição ou alteração de documentos;
- mudança de responsável ou composição familiar;
- registros/alterações em atendimentos, benefícios e projetos;
- alterações de permissões e contas;
- operações administrativas relevantes.

## Campos recomendados
- identificador do evento;
- data/hora consistente;
- usuário/ator;
- módulo de origem (Pessoas, Social ou Cursos);
- ação;
- tipo e ID da entidade afetada;
- resultado;
- campos alterados;
- valores anteriores/novos quando necessário e permitido;
- justificativa, se exigida.

## Proteção
- Usuários comuns não podem editar/apagar eventos de auditoria.
- Limitar acesso a perfis autorizados.
- Não registrar segredos nem conteúdo sensível desnecessário.
- Definir retenção e backup.
- Considerar trilha append-only ou controles equivalentes.

## Alterações de Pessoa
Quando usuário de Social ou Cursos corrigir dado compartilhado, registrar usuário, módulo de origem, pessoa afetada, campo e valores anterior/novo quando apropriado. A alteração deve aparecer nos demais módulos que consultam a mesma Pessoa.
