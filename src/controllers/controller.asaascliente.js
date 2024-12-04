import {config} from 'dotenv';
import {api} from '../instance-axios.js';

config();

const Add = (req, res) => {
    try {
        const cliente = {...req.body};


        const response = api.post('/customers', cliente, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'access_token': process.env.ACCESS_TOKEN
            }
        });

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({error: error});
    }
};

export default {Add};

