import { config } from "dotenv"
import pkg from "pg"
const { Pool } = pkg

config()

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

export default pool
