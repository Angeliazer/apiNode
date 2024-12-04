import {api} from '../instance-axios.js';

const Add = (req, res) =>
{
    try {
        const cliente = {...req.body};

        const response = api.post('/customers', cliente);

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

export default {Add}

