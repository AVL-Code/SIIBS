# 02 — Requisitos

## Escopo atual: Assistência Social

### Requisitos funcionais
- **RF-01 — Cadastro de pessoas:** criar, consultar e atualizar dados cadastrais básicos.
- **RF-02 — Documentos pessoais:** registrar documentos associados à pessoa, inicialmente RG e comprovante de endereço; a lista será refinada.
- **RF-03 — Busca e reaproveitamento:** localizar pessoa existente e reutilizar os dados, evitando duplicidade.
- **RF-04 — Entidade familiar:** cadastrar entidade familiar com um responsável e demais integrantes.
- **RF-05 — Vínculo familiar:** relacionar cada integrante à entidade familiar e registrar seu papel.
- **RF-06 — Detecção de vínculo existente:** ao buscar/cadastrar pessoa, informar se ela já está vinculada a uma entidade familiar, respeitando permissões.
- **RF-07 — Situação socioeconômica:** registrar fontes de renda e informações necessárias aos cálculos definidos.
- **RF-08 — Programas e benefícios:** registrar participação e datas de entrada/saída.
- **RF-09 — Atendimentos:** registrar data, usuário responsável, avaliação/observações sociais, encaminhamentos e decisões.
- **RF-10 — Cestas e projetos:** registrar cesta emergencial e participação em projetos, distinguindo modalidades emergenciais e recorrentes.
- **RF-11 — Histórico:** consultar histórico de atendimentos e mudanças relevantes.
- **RF-12 — Indicadores e relatórios:** fornecer indicadores e relatórios básicos do Social.
- **RF-13 — Auditoria:** registrar operações relevantes com usuário, data/hora, entidade afetada e detalhes para rastreabilidade.
- **RF-14 — Usuários e permissões:** autenticar usuários e limitar ações/dados conforme permissões.
- **RF-15 — Busca compartilhada futura:** preparar a arquitetura para reutilizar Pessoa no futuro módulo Cursos; Cursos não será implementado no MVP.

## Requisitos futuros — Cursos (fora do MVP)
- **RF-C01:** gestão de cursos, turmas e matrículas.
- **RF-C02:** cadastro específico de professores e associação às turmas.
- **RF-C03:** professores consultam alunos das turmas atribuídas e registram frequência e relatórios de aula conforme permissões.
- **RF-C04:** lista de espera com ordenação automática; prioridade e desempate serão definidos futuramente.
- **RF-C05:** portal de responsáveis com acesso próprio; autenticação e escopo serão definidos antes da implementação.
- **RF-C06:** consulta de informações autorizadas do aluno, potencialmente frequência e posição na lista de espera.
- **RF-C07:** cadastro de aluno e vínculos educacionais usando o núcleo compartilhado de pessoas.
- **RF-C08:** contatos de emergência associados ao aluno/matrícula, sem presumir vínculo social ou matrícula própria.

## Requisitos não funcionais
- **RNF-01 — Segurança:** autenticação individual, autorização no backend e proteção de credenciais/sessões.
- **RNF-02 — Privacidade:** limitar exposição de dados pessoais e sensíveis conforme finalidade e permissão.
- **RNF-03 — Auditoria:** alterações relevantes rastreáveis.
- **RNF-04 — Integridade:** evitar duplicação de dados comuns e manter consistência.
- **RNF-05 — Infraestrutura:** banco local e baixo consumo, conforme ambiente disponível.
- **RNF-06 — Backup:** procedimento documentado e testável de backup/restauração.
- **RNF-07 — Manutenibilidade:** separar responsabilidades por domínio, com documentação e testes.
- **RNF-08 — Evolução:** adicionar Cursos sem misturar suas regras com Social.
- **RNF-09 — Custo:** priorizar ferramentas gratuitas/open source e evitar dependências pagas obrigatórias.
- **RNF-10 — Recuperação:** documentar limitações da infraestrutura local e reduzir risco de perda de dados.
