import { Router } from "express"

import controllerUsuario from "./controllers/controller.usuario.js"
import controllerCliente from "./controllers/controller.cliente.js"
import controllerOrcamento from "./controllers/controller.orcamento.js"
import controllerServico from "./controllers/controller.servico.js"
import controllerCategoria from "./controllers/controller.categoria.js"
import jwt from "./token.js"

const router = Router()

// Rotas de Usuários
router.post("/usuarios/login", controllerUsuario.Login)
router.post("/usuarios", controllerUsuario.AddUsuario)
router.get("/usuarios", jwt.ValidateToken, controllerUsuario.Listar)
router.get("/usuarios/perfil", jwt.ValidateToken, controllerUsuario.Perfil)

// Rotas de Clientes
router.post("/clientes/add", jwt.ValidateToken, controllerCliente.AddCliente)
router.get("/clientes", jwt.ValidateToken, controllerCliente.ListarById)
router.delete(
  "/clientes/:idCliente",
  jwt.ValidateToken,
  controllerCliente.DeleteById
)
router.get("/clientes/nome", jwt.ValidateToken, controllerCliente.ListaByNome)

// Rotas de Orcamentos
router.post(
  "/orcamento/add",
  jwt.ValidateToken,
  controllerOrcamento.AddOrcamento
)
router.put(
  "/orcamentos/update",
  jwt.ValidateToken,
  controllerOrcamento.UpdateOrcamento
)
router.get("/orcamentos", jwt.ValidateToken, controllerOrcamento.ListaOrcamento)
router.get(
  "/orcamentos/clientes/:idCliente",
  jwt.ValidateToken,
  controllerOrcamento.ListaOrcCliente
)
router.get(
  "/orcamentos/datas",
  jwt.ValidateToken,
  controllerOrcamento.ListaOrcamentoData
)
router.delete(
  "/orcamentos/delete",
  jwt.ValidateToken,
  controllerOrcamento.DelOrcamento
)
router.get(
  "/orcamentos/items",
  jwt.ValidateToken,
  controllerOrcamento.ListaItemsOrcamento
)

// Rotas de Servicos
router.post("/servicos/add", jwt.ValidateToken, controllerServico.AddServico)
router.get(
  "/servicos/clientes",
  jwt.ValidateToken,
  controllerServico.ListaServicoClientes
)
router.post("/orcamentos/pdf", jwt.ValidateToken, controllerOrcamento.GerarPDF)

// Rotas de Categorias
router.get("/categorias", jwt.ValidateToken, controllerCategoria.Listar)

export default router
