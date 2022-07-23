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
- Para iniciar o projeto, criamos no package.json o script `"start": "node .index/js"`