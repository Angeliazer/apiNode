import serviceCategoria from '../services/service.categoria.js';

async function Listar(req, res) {
    try {
        const categorias = await serviceCategoria.Listar();

        if (categorias.length > 0) res.status(200).json(categorias);
        else
            res.status(500).json({error: 'Erro na requisição ao Banco de Dados...'});
    } catch (error) {
        res.status(500).json({status: error});
    }
}

export default Listar;