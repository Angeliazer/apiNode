import serviceCategoria from "../services/service.categoria.js"

const Listar = async (req, res) => {
  try {
    console.log("1")

    const categorias = await serviceCategoria.Listar()

    // const categorias = [
    //   { idcategoria: 1, descricao: "calças" },
    //   { idcategoria: 2, descricao: "camisas" },
    // ]

    console.log("2")

    if (categorias.length > 0) {
      res.status(200).json(categorias)
    } else {
      res.status(200).json([])
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default { Listar }
