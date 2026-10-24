# 04 — MVP

## Incluído
1. Autenticação de usuários internos.
2. Cadastro e consulta de pessoas com identificador interno estável.
3. Dados básicos e documentos iniciais da pessoa.
4. Busca e reaproveitamento de cadastro existente.
5. Entidade familiar, responsável e integrantes.
6. Dados socioeconômicos e fontes de renda.
7. Programas e benefícios.
8. Atendimentos, avaliações, decisões e histórico.
9. Cestas emergenciais e participação em projetos.
10. Relatórios/indicadores básicos.
11. Autorização por perfil/permissão.
12. Auditoria de alterações relevantes.
13. Backup e restauração documentados.
14. Persistência local e baixo custo operacional.

## Fora do MVP
- Gestão de cursos, turmas e matrículas.
- Cadastro e gestão de professores.
- Chamada, frequência e relatórios de aula.
- Lista de espera de cursos.
- Portal externo de responsáveis.
- Integrações governamentais.
- Decisões automáticas de elegibilidade social.
- BI avançado, automações complexas e notificações externas.
- API pública ou arquitetura distribuída obrigatória.

## Preparação arquitetural
- Núcleo compartilhado de Pessoas.
- Documentos gerais associados à Pessoa.
- Separação entre Social e futuro domínio Cursos.
- Auditoria que registre módulo de origem.
- Contratos internos claros para possível API futura, se houver necessidade real.
