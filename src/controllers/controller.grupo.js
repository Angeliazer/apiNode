import serviceGrupo from '../services/service.grupo.js';
import Grupo from '../models/model.grupo.js';

const Listar = async (req, res) => {
    try {
        const grupos = await serviceGrupo.Listar();
        if (grupos.length > 0) {
            res.status(200).json(grupos);
        } else {
            res.status(200).json([]);
        }
    } catch (e) {
        res.status(500).json({error: error.message});
    }
};

const Add = async (req, res) => {
    try {

        const group = new Grupo({...req.body});

        const grupo = await serviceUsuario.Add(group);

        if (grupo.idgrupo) {
            group.idgrupo = grupo.idgrupo;
            res.status(201).json(group);
        } else
            res.status(500).json({error: 'Erro na requisição ao Banco de Dados...'});
    } catch (error) {
        res.status(401).json({error: error});
    }
};
export default {Listar, Add};
