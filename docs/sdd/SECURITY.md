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

## Perfis de Acesso (RBAC) e Matriz de Permissões (`DA-012`)

O controle de acesso é aplicado obrigatoriamente no backend via `PermissionGuard` (`RF-14`, `RNF-01`, `RNF-02`), utilizando 3 perfis internos com suporte a múltiplos perfis por usuário (`iam.user_roles`):

1. **`SYSTEM_ADMIN`:** acesso administrativo completo (`iam:user:manage`, `audit:event:read` irrestrito em todos os módulos, `registry:*`, `assistance:*`).
2. **`SOCIAL_OPERATOR`:** acesso completo ao núcleo compartilhado `registry` (`registry:person:read/write`, `registry:document:read/write` para documentos gerais), ao módulo `assistance` (`assistance:household:read/write`, `assistance:attendance:read/write`, `assistance:income:read/write`, `assistance:benefit:read/write`, `assistance:report:read` e documentos específicos do Social) e à consulta da trilha de auditoria (`audit:event:read`, restrita aos módulos autorizados: `registry` e `assistance`), sem permissão para gerenciar contas (`iam:user:manage`) nem acesso aos módulos `iam` ou `education`.
3. **`EDUCATION_OPERATOR` (fronteira reservada para expansão futura):** acesso completo ao núcleo compartilhado `registry` (`registry:person:read/write`, `registry:document:read/write` para documentos gerais), consulta da trilha de auditoria (`audit:event:read`, restrita aos módulos autorizados: `registry` e `education`) e futuras permissões `education:*` (incluindo documentos específicos de Cursos), sem qualquer permissão `assistance:*` ou `iam:user:manage`.

### Regras de Visibilidade e Isolamento (`RNF-02`, `DA-004`, `DA-007`)

- **Isolamento do módulo `assistance`:** Perfis sem permissões `assistance:*` (como `EDUCATION_OPERATOR`) são bloqueados pelo `PermissionGuard` em qualquer operação do módulo `assistance` e nunca recebem dados socioeconômicos, rendas, benefícios, composição familiar ou histórico de atendimentos em DTOs de `registry` ou `audit`.
- **Documentos Gerais vs. Documentos Específicos de Módulo:** Documentos gerais da pessoa (`registry.person_documents`, como RG, CPF e comprovante de endereço — `DA-004`) pertencem ao `registry` (`registry:document:*`) e são compartilhados entre os 3 perfis. Já documentos específicos da Assistência Social pertencem ao módulo `assistance` (visíveis apenas com permissão `assistance:*`), e documentos específicos de Cursos pertencerão ao módulo `education` (`education:*`), sem compartilhamento cruzado automático (`DA-007`).
- **Trilha de Auditoria por Escopo (`audit:event:read`):** `SOCIAL_OPERATOR` consulta apenas eventos de `registry` e `assistance`; `EDUCATION_OPERATOR` consulta apenas eventos de `registry` e `education`; `SYSTEM_ADMIN` consulta eventos de todos os módulos.
- **Detecção de Vínculo Familiar (`RF-06`):** Em buscas de `Person`, informações sobre vínculo ativo com `Household` só são expostas quando o requisitante possui `assistance:household:read`.

## Documentos

- Definir tipos, campos, validade e acesso (separando documentos gerais do `registry` de documentos específicos de `assistance` e `education`).
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
