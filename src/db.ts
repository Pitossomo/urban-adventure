import { Pool } from "pg";

const db = new Pool({connectionString: process.env.DB_CONNECTION_STRING})

export default db