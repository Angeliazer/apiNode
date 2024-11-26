import serviceCategoria from '../services/service.categoria.js';
import Categoria from '../models/model.categoria.js';

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

const Add = async (req, res) => {
    try {

        const category = new Categoria({...req.body});

        const categoria = await serviceCategoria.Add(category);

        if (categoria.idcategoria) {
            category.idcategoria = categoria.idcategoria;
            res.status(201).json(categoria);
        } else
            res.status(401).json({error: 'Não autorizado...!'});
    } catch (error) {
        res.status(500).json({error: error});
    }
};
export default {Listar, Add};
