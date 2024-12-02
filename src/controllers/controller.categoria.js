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

const Add = async (req, res) => {
    try {
        const category = req.body;

        const categoria = await serviceCategoria.Add(category);

        category.idcategoria = categoria.idcategoria;

        if (categoria.idcategoria) {
            res.status(201).json({idcategoria : category.idcategoria}); }
    } catch (error) {
        res.status(500).json({error: error});
    }
};

const Update = async (req, res) => {
    try {
        const category = req.body;

        const categoria = await serviceCategoria.Update(category);

        category.idcategoria = categoria.idcategoria;

        if (categoria.idcategoria) {
            res.status(201).json({idcategoria : category.idcategoria}); }
    } catch (error) {
        res.status(500).json({error: error});
    }
};

export default {Listar, Add, Update};
