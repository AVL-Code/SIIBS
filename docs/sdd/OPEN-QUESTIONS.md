# Questões em aberto

## Pessoas e documentos

- Quais campos básicos estarão em Pessoa?
- CPF será obrigatório? Como lidar com pessoas sem CPF?
- Quais documentos serão aceitos além de RG e comprovante de endereço?
- Quais tipos de documento exigem número único, validade ou histórico?
- Como detectar duplicidade quando não houver CPF/documento válido?
- Contatos serão campos simples ou múltiplos registros com histórico?
- Quais documentos serão arquivos digitais e quais serão apenas metadados?

## Social

- Uma pessoa pode pertencer a mais de uma entidade familiar ao longo do tempo? Como preservar histórico?
- Como tratar mudança de responsável familiar?
- Quais regras finais para atendimentos, rendas, benefícios, cestas e projetos?
- Quais regras de validade do cadastro e documentos?

## Segurança e operação

- [x] Quais perfis/permissões serão necessários? _(Resolvido em `DA-012` — `DECISIONS.md` e `SECURITY.md`: perfis `SYSTEM_ADMIN`, `SOCIAL_OPERATOR` e `EDUCATION_OPERATOR`, matriz de permissões granulares e regras de visibilidade entre módulos)._
- Onde ficará o equipamento e quem terá acesso físico?
- Qual frequência de backup, retenção e local separado?
- Quais prazos de retenção e procedimentos de privacidade serão definidos?

## Cursos — futuro

- Modelo de cursos, turmas, inscrições e matrículas.
- Relação entre cadastro de professor e conta de usuário.
- Restrições por perfil para alteração dos dados compartilhados.
- Responsável principal e múltiplos responsáveis/contatos por matrícula.
- Regras automáticas de lista de espera, prioridade e desempate.
- Autenticação do portal e dados que responsáveis poderão consultar.
- Se Cursos permanecerá no monólito modular ou será separado por API, conforme necessidade real.
