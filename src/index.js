import express from "express"
import cors from "cors"
import router from "./routes.js"

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: "http://192.168.1.10:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)
app.use(router)

app.listen(3001, () => {
  console.log("Servidor rodando na porta: 3001")
})
