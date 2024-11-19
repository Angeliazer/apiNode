import { config } from "dotenv"
import pkg from "pg"
const { Pool } = pkg

config()

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.PORT,
// })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { require : true}
})

export default pool
