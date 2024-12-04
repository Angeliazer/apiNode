import {api} from '../instance-axios.js';

const Add = async (req, res) => {

    try {
        const cliente = {...req.body};

        console.log(cliente);

        const response = await api.post('/customers', cliente, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'access_token': process.env.ACCESS_TOKEN
            }
        });

        res.status(200).json(response.data.id);

    } catch (error) {
        res.status(500).json({error: error});
    }
};

export default {Add};

