import { Pool } from "pg";

let  connectionString
switch (process.env.NODE_ENV) {
  case "production":
    connectionString = process.env.DB_CONNECTION_STRING
    break
  case "test":
    connectionString = process.env.TEST_CONNECTION_STRING
    break
  default:
    connectionString = process.env.TEST_CONNECTION_STRING
}

console.log(process.env.NODE_ENV)

const db = new Pool({ connectionString })

export default db