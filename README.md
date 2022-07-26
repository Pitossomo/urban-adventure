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
------
2. Criando o projeto
- Iniciamos o projeto criando o diretório e, dentro dele, executando o comando `npm init`
- Com o *package.json* criado para manter nossos metadados, podemos criar nosso *index.js* contendo apenas a instrução `console.log("Hello world)`]
- Para iniciar o projeto, criamos no package.json o script `"start": "node ./index.js"`
- Instalamos e configuramos o typescript no projeto com os comandos:
  - `npm install -g typescript` - instala o pacote do Typescript globalmente
  - `npm install --save-dev typescript`  - instala o pacote do Typescript localmente como 
  - `npm install --save-dev @types/node` - instala os tipos do nodeJS
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
- Alteramos o *package.json* para configurar:
  - o arquivo a ser executado
  - o script `build` para transpilação:
    ```json
    {
      "name": "ms-authentication",
      "version": "1.0.0",
      "description": "Microservice para autenticação criando no Bootcamp DIO Impulso JS 2022",
      "main": "./dist/index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node ./",
        "build": "tsc -p ./"
      },
      "author": "Pitossomo",
      "license": "ISC",
      "devDependencies": {
        "@types/node": "^18.6.1",
        "typescript": "^4.7.4"
      }
    }
    ```
------
3. Instalando o jest para testes automatizados
- Instalar as dependências para os testes
  - `npm install --save-dev jest`
  - `npm install --save-dev @types/jest`
  - `npx jest --init`
  - `npm install --save-dev ts-node-dev` 
  - `npm install --save-dev ts-jest`
- Configurar o *jest.config.js*
  ```js
  module.exports = {
    coverageProvider: "v8",
    preset: 'ts-jest',
  };
  ```
------
## Iniciando o servidor e as rotas
4. Criando um server com express
- O express é um gerenciador de rotas sob o protocolo *HTTP*
  - Instalamos o express `npm install express`
  - Instalamos os tipos do express `npm install --save-dev @types/express`
  - Desenvolvemos o código inicial no *index.ts*;
  ```ts
  import express, {Request, Response, NextFunction} from 'express'

  const app = express()

  app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ foo: 'bar' })
  })

  app.listen(3000, () => {
    console.log('Aplicação executando na porta 3000')
  })
  ```
-----  
5. Automatizando o servidor de desenvolvimento para detectar alterações no código
- Instalamos o ts-node-dev `npm install --save-dev ts-node-dev`
- Criamos o script no *package.json* :
  - `"dev": "ts-node-dev --respawn --transpile-only --ignore-watch node_modules --no-notify src/index.ts"`
-----
6. Rotas apartadas
- Criaremos um diretório *src/routes* no qual colocaremos nossas rotas, apartando-as do *index.ts*
- Criaremos dois arquivos:
  -*status.route.ts*:
    ```ts
    import { Router, Request, Response, NextFunction } from "express"

    const statusRoute = Router()

    statusRoute.get('/status', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).send({ foo: 'bar' })
    })

    export default statusRoute
    ```
  -*users.route.ts*:
    ```ts
    import { Router, Request, Response, NextFunction } from "express"

    const usersRoute = Router()

    usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
      const users: [] = []
      res.status(200).send(users)
    })

    export default usersRoute
    ```
7. CRUD para usuários
- Como lidaremos com métodos POST e requisições em JSON, precisamos configurar o express para isso no *index.ts*:
  ```ts
  ...
  const app = express()
  app.use(express.json())
  app.use(usersRoute)
  app.use(statusRoute)
  ...
  ```
- Criaremos os endpoints para os métodos CRUD dos usuários no arquivo */src/routes/users.routes.ts*:
  ```ts
  import { Router, Request, Response, NextFunction } from "express"
  import User from "../@types/User"

  const usersDB: User[] = []
  const usersRoute = Router()

  usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(usersDB)
  })

  usersRoute.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    res.status(200).send({ uuid: uuid })
  })

  usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
    const username: string = req.body.username 
    if (!username || username==='') return res.status(400)

    const newUser = {
      uuid: usersDB.length+1, 
      username: req.body.username 
    }

    usersDB.push(newUser)
    res.status(201).send(newUser)
  })

  usersRoute.put('/users/:uuid', (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    const username: string = req.body.username 
    if (!username || username==='') return res.status(400)
    // TODO PUT method
    res.status(200)
  })

  usersRoute.delete('/users/:uuid', (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    // TODO DELETE method
    res.status(200)
  })

  export default usersRoute
  ```
-----
## Integrando o bando de dados
8. Configurando o postgres
- Instalaremos o node-postgres e seus tipos
  - `npm install pg`
  - `npm install --save-dev @types/pg`
- Criaremos um arquivo *src/db.ts* para conectar nosso banco de dados
- Instanciaremos um Pool para lidar com as frequentes requisições ao banco de dados, conforme orienta a [documentação da biblioteca](https://node-postgres.com/features/pooling):
  ```ts
  import { Pool } from "pg";

  const db = new Pool({connectionString: process.env.DB_CONNECTION_STRING})

  export default db
  ```
- Criaremos uma database gratuita no (ElephantSQL)[https://www.elephantsql.com/]
- Criaremos uma pasta *src/sql* para guardar os scripts SQL que usaremos, sendo um em cada arquivo:
  - init.sql
    ```sql
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; /* enables uuid creation */
    CREATE EXTENSION IF NOT EXISTS "pgcrypto"; /* enables crypt */

    CREATE TABLE IF NOT EXISTS app_user(
      uuid uuid DEFAULT uuid_generate_v4(),   /* creates an unique, non-incremental id for each user */
      username VARCHAR NOT NULL,
      password VARCHAR NOT NULL,
      PRIMARY KEY (uuid)
    );

    /* The values of MY-NAME, MY-PASSWORD & MY-SALT* shall be redefined */
    INSERT INTO app_user(username, password) VALUES ('MY-NAME', crypt('MY-PASSWORD', 'MY-SALT'));
    ```
- Executados o arquivo de inicialização acima no site do database, criando a tabela de usuários e um usuário inicial
  - importante usar um nome da tabela de usuários diferente de *users*, que é o padrão que alguns databases já utilizam - no nosso caso, colocamos *app_users*

