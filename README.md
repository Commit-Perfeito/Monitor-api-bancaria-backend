<h1 align="center">Monitor Web Backend</h1>

# Sobre

O "monitor-web" é uma aplicação desenvolvida para facilitar ...

O sistema foi projetado para ser de fácil utilização e tem como propósito oferecer ...

# Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)
- [Typeorm](https://typeorm.io/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Yup](https://www.npmjs.com/package/yup)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Cors](https://www.npmjs.com/package/cors))
- [Swagger](https://swagger.io/)

### Dependências de Desenvolvimento:

- [@eslint/js](https://www.npmjs.com/package/@eslint/js)
- [@types/axios](https://www.npmjs.com/package/@types/axios)
- [@types/cors](https://www.npmjs.com/package/@types/cors)
- [@types/express](https://www.npmjs.com/package/@types/express)
- [@types/node](https://www.npmjs.com/package/@types/node)
- [eslint](https://eslint.org/)
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)
- [globals](https://www.npmjs.com/package/globals)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [typescript](https://www.typescriptlang.org/)
- [typescript-eslint](https://www.npmjs.com/package/typescript-eslint)

# Executando a aplicação

Para executar esta aplicação, siga os seguintes passos:

- Clone o repositório:

  ```bash
  git clone https://github.com/Projetos-Unicv/Monitor-api-bancaria-backend/

  ```

- Com o repositório clonado, acesse o diretório raiz do projeto e digite code . para abrir o projeto no VS Code.

- Crie um arquivo .env utilizando como base o modelo fornecido no arquivo env_file.

- Crie a imagem do projeto e em seguida os containers, de acordo com as configurações fornecidas no arquivo docker-compose.yml, executando o seguinte comando:

  ```bash
  # Criar a imagem, containers e subir
  yarn up
  ```

- Instale as dependências do projeto:

  ```bash
  # Baixar dependências
  yarn

  ```

- Execute comando o migration para criar as tabelas do banco:
  ```bash
  # Gerar tabelas
  yarn migration:run
  ```
- Execute comando o seed para popular os bancos:
  ```bash
  # Gerar dados dos bancos
  yarn seed:run
  ```
- Após a conclusão da instalação das dependências, execute a aplicação com o seguinte comando:

  ```bash
  # Executar a aplicação
  yarn dev
  ```

Com estes passos concluídos, a aplicação estará em execução e pronta para ser utilizada.
