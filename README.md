# Monitor API Bancária Backend

## Visão Geral

O **Monitor API Bancária Backend** é uma aplicação Node.js desenvolvida para monitorar, registrar e consultar operações bancárias automatizadas, como registros e consultas de boletos, integrando múltiplos bancos. O sistema centraliza logs de requisições, permitindo análise de desempenho, status de respostas e rastreabilidade de operações financeiras.

## Funcionalidades Principais

- **Registro de Operações Bancárias:** Armazena informações detalhadas de cada requisição feita para APIs bancárias, incluindo tempo de resposta, status, payload e detalhamento.
- **Consulta de Registros:** Permite buscar registros filtrando por banco, tipo de operação, status e intervalo de datas.
- **Validação de Dados:** Utiliza validação robusta para garantir integridade dos dados recebidos e enviados.
- **Documentação Interativa:** Disponibiliza documentação Swagger para facilitar a integração e testes das rotas.
- **Seed e Migrations:** Automatiza a criação e popularização do banco de dados com bancos suportados.
- **Rate Limiting:** Protege a API contra excesso de requisições.
- **Tratamento Centralizado de Erros:** Garante respostas padronizadas e seguras para falhas esperadas e inesperadas.
- **Cobertura de Testes:** Inclui testes unitários e de integração para garantir a confiabilidade do sistema.

## Tecnologias Utilizadas

- **Node.js** & **Express**: Plataforma e framework para construção da API.
- **TypeScript**: Tipagem estática para maior robustez e produtividade.
- **PostgreSQL** & **TypeORM**: Banco de dados relacional e ORM para modelagem e persistência.
- **Docker**: Containerização do banco de dados para facilitar o setup e deploy.
- **Yup**: Validação de dados.
- **Swagger**: Documentação automática e interativa da API.
- **Jest** & **Supertest**: Testes automatizados.
- **ESLint** & **Prettier**: Padronização e formatação de código.
- **Rate Limiter Flexible**: Controle de requisições para evitar abusos.

## Boas Práticas Adotadas

- **Injeção de Dependências:** Uso do `tsyringe` para facilitar testes e desacoplamento.
- **Separação de Camadas:** Domínio, infraestrutura, validações e utilitários bem organizados.
- **Validação Estruturada:** Middleware de validação para todas as rotas críticas.
- **Tratamento de Erros Centralizado:** Todas as exceções são capturadas e respondidas de forma padronizada.
- **Cobertura de Testes:** Testes unitários e de integração para garantir estabilidade.
- **Documentação Atualizada:** Swagger sempre alinhado com as rotas e contratos da API.
- **Padronização de Código:** ESLint e Prettier integrados ao fluxo de desenvolvimento.
- **Uso de Variáveis de Ambiente:** Configurações sensíveis e de ambiente isoladas do código-fonte.

## Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Projetos-Unicv/Monitor-api-bancaria-backend/
   cd Monitor-api-bancaria-backend
   ```

2. **Configure o arquivo `.env`** com base no `env_file.txt`.

3. **Suba o banco de dados com Docker:**
   ```bash
   yarn up
   ```

4. **Instale as dependências:**
   ```bash
   yarn
   ```

5. **Execute as migrations e seeds:**
   ```bash
   yarn migration:run
   yarn seed:run
   ```

6. **Inicie a aplicação:**
   ```bash
   yarn dev
   ```

7. **Acesse a documentação:**  
   [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

> Para mais detalhes sobre endpoints, exemplos de uso e estrutura dos dados, consulte a documentação Swagger integrada.
