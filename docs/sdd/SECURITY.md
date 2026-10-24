# Segurança e privacidade

## Princípios
- Menor privilégio e necessidade de conhecer.
- Validar autorização no backend em toda operação.
- Contas individuais e credenciais não compartilhadas.
- Proteger senhas com algoritmo apropriado de hash.
- Proteger sessões, segredos, arquivos e backups.
- Não registrar senhas, tokens ou conteúdo sensível desnecessário.
- Coletar/expor apenas dados necessários à finalidade.

## Dados compartilhados
Usuários autorizados de Social e Cursos poderão corrigir dados gerais de Pessoa e documentos comuns. A alteração será refletida nos dois módulos porque o registro é centralizado. O sistema deve indicar o contexto da alteração e registrar quem mudou o quê e quando.

Compartilhar cadastro não significa compartilhar todos os dados. Atendimentos, composição socioeconômica, rendas, benefícios e avaliações sociais exigem autorização própria e não são acessíveis automaticamente por Cursos.

## Documentos
- Definir tipos, campos, validade e acesso.
- Armazenar arquivos em local protegido, sem caminhos públicos.
- Aplicar controles de acesso e avaliar criptografia para arquivos/backups conforme risco.
- Registrar consulta/alteração quando relevante.
- Evitar cópias duplicadas em cada módulo.

## Infraestrutura local
- Controlar acesso físico.
- Manter sistema operacional e dependências atualizados.
- Limitar portas e acesso de rede.
- Separar backups do equipamento principal e restringir restauração.
- Testar restauração periodicamente.
- Documentar resposta a incidentes e perda de equipamento.

## LGPD
Definir finalidade, base legal, transparência, minimização, retenção, atendimento a titulares e procedimentos para incidentes com a instituição e apoio jurídico quando necessário. Esta documentação técnica não substitui avaliação jurídica.
