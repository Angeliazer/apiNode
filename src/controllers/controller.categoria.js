import serviceCategoria from '../services/service.categoria.js';

async function Listar (req, res) {
    try {

        console.log('1');

        const categorias = await serviceCategoria.Listar();

        console.log('2');

        if (categorias.length > 0) {
            res.status(200).json(categorias);
        } else
            res.status(500).json({error: 'Erro na requisição ao Banco de Dados...'});
    } catch (error) {
        res.status(500).json({status: error.message});
    }
}

async function Listars (req, res) {
    try {

        console.log('1');

        const categorias = await serviceCategoria.Listar();

        console.log('2');

        if (categorias.length > 0) {
            res.status(200).json(categorias);
        } else
            res.status(500).json({error: 'Erro na requisição ao Banco de Dados...'});
    } catch (error) {
        res.status(500).json({status: error.message});
    }
}

export default {Listar, Listars};

