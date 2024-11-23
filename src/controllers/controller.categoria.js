import serviceCategoria from '../services/service.categoria.js';

const Listar = async (req, res) => {
    try {
        const categorias = await serviceCategoria.Listar();
        if (categorias.length > 0) {
            res.status(200).json(categorias);
        } else {
            res.status(200).json([]);
        }
    } catch (e) {
        res.status(500).json({error: error.message});
    }
};
export default {Listar};
