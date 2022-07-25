# DIO Authenticator
## Preparando o projeto
1. Objetivos
- Desenvolveremos um microserviço de autenticação, que pdoerá ser usado futuramente em outros projetos próprios
- A aplicação cliente fará uma requisição ao noso microserviço, que responderá com um token JWT de autenticação
- Posteriormente, este token deverá ser verificado, com uma requisição passado por alguma aplicação ao nosso microserviço, que retornará dizendo se o token apresentado é válido ou não
- Nosso Microserviço contará com os seguinte endpoints
  - CRUD de Usuários
    - GET /users
    - GET /users/:uuid
    - POST /users
    - PUT /users/:uuid
    - DELETE /users/:uuid
  - Autenticação
    - POST /token
    - POST /token/validate

2. Criando o projeto
- Iniciamos o projeto criando o diretório e, dentro dele, executando o comando `npm init`
- Com o *package.json* criado para manter nossos metadados, podemos criar nosso *index.js* contendo apenas a instrução `console.log("Hello world)`]
- Para iniciar o projeto, criamos no package.json o script `"start": "node ./index.js"`
- Instalamos e configuramos o typescript no projeto com os comandos:
  - `npm install typescript`  - instala o pacote do Typescript
  - `tsc --init`  - cria o arquivo tsconfig.json
- Alteramos o arquivo `tsconfig.json` para as configurações a serem usadas no nosso projeto:
  ```json
  /* Visit https://aka.ms/tsconfig to read more about this file */
  {
    "compilerOptions": {
      "target": "es2019",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
      "module": "commonjs",                                /* Specify what module code is generated. */
      "moduleResolution": "node",
      "rootDir": "src",
      "typeRoots": [
        "./src/@types",
        "./node_modules/@types"
      ],
      "outDir": "./dist",
      "removeComments": true,
      "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
      "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
      "strict": true,                                      /* Enable all strict type-checking options. */
      "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
    }
  }
  ```
- A estrutura do nosso projeto terá:
  - a pasta `dist` para o código transpilado em javascript 
  - a pasta `src` para o código desenvolvido em typescript
  - a pasta `src/@types` com a definição dos tipos e interfaces criados para o projeto
