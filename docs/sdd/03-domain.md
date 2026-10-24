# 03 — Modelo de domínio

## Pessoa
Representa uma pessoa física e contém dados cadastrais compartilháveis, como nome, data de nascimento, contatos e documentos comuns. É a identidade central para evitar cadastros duplicados entre módulos.

Os documentos gerais pertencem ao cadastro da pessoa quando forem reutilizáveis. A lista inicial inclui RG e comprovante de endereço, mas tipos, metadados, validade e regras serão refinados. Não presumir unicidade global para todos os tipos de documento.

CPF é um possível atributo/documento, mas obrigatoriedade e unicidade ainda precisam ser confirmadas. Usar identificador interno estável como chave primária.

## Entidade familiar (Social)
Representa um grupo familiar no contexto social, com um responsável familiar e membros vinculados. Regras de mudança de família, múltiplos vínculos e histórico da composição serão detalhadas conforme o negócio.

## Vínculo social
Representa a relação da pessoa com o domínio Social, normalmente por participação em uma entidade familiar. A existência do vínculo indica cadastro no Social sem depender de flag duplicada em Pessoa.

## Atendimento social
Registro de atendimento realizado por usuário autorizado, com data, avaliação/observações, decisões e encaminhamentos. Deve manter histórico.

## Conceitos futuros de Cursos
- **Aluno:** papel/registro educacional associado a Pessoa.
- **Matrícula:** vínculo do aluno com curso/turma e período.
- **Responsável principal da matrícula:** pessoa que responde pela matrícula; não equivale necessariamente ao responsável familiar do Social.
- **Contato de emergência:** pessoa associada ao aluno para contato; não implica matrícula, vínculo social ou pertencimento à entidade familiar.
- **Professor:** cadastro específico do domínio Cursos, não automaticamente Pessoa do núcleo compartilhado. Relação com conta de usuário será definida futuramente.
- **Turma:** agrupamento educacional ao qual alunos e professores serão associados.
- **Frequência/chamada e relatório de aula:** registros do domínio Cursos.
- **Lista de espera:** fila de ordenação automática, com regras a especificar.
- **Portal do responsável:** acesso futuro para consultar informações autorizadas; método de autenticação ainda em aberto.

## Compartilhamento
Social e Cursos usarão a mesma Pessoa e os dados gerais autorizados. Alterações feitas por usuário autorizado em qualquer módulo serão refletidas nas consultas dos demais módulos e deverão ser auditadas. Não haverá cópias independentes dos mesmos campos.

Dados específicos do Social — atendimentos, renda, benefícios, avaliações e informações socioeconômicas — não serão disponibilizados automaticamente a Cursos.

## Estados de cadastro
Evitar flags redundantes como `ativo_social` e `ativo_cursos` em Pessoa quando o estado puder ser derivado dos vínculos próprios de cada domínio.
