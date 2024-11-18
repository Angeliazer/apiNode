import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {config} from 'dotenv';

config();   // Busca informações no .env

const secretKey = process.env.JWT_SECRET_KEY;

function CreateToken(idUsuario) {

    return jwt.sign({idUsuario}, secretKey, {
        expiresIn: 9999999
    });
}

function ValidateToken(req, res, next) {

    const authtoken = req.headers.authorization;

    if (!authtoken) {
        return res.status(401).send({error: 'Token não informado...'});
    }

    //const [aux, token] = authtoken.split(' ');
    const token = authtoken.replace('Bearer ', '');

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error)
            return res.status(401).send({error: 'Token inválido...'});

        req.body.idUsuario = decoded.idUsuario;

        next();
    });
}

function VerificaIdToken(req, res, next) {

    const idUsuario = req.params;

    const authtoken = req.headers.authorization;

    if (!authtoken) {
        return res.status(401).send({error: 'Token não informado...'});
    }

    const [aux, token] = authtoken.split(' ');
    //const token = authtoken.replace('Bearer ', '');

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error)
            return res.status(401).send({error: 'Token inválido...'});

        const idToken = decoded.idUsuario;

        if (idToken !== idUsuario.id)
            return res.status(401).send({error: 'Id Usuario informado, diferente do Id Token...'});
        next();
    });
}

async function EncryptaPassword(password) {

    return await bcrypt.hash(password, 10);
}

async function VerifyPassword(password, hash) {
    try {
        const match = await bcrypt.compare(password, hash);
        return !!match;
    } catch (error) {
        return false;
    }
}

export default {CreateToken, ValidateToken, EncryptaPassword, VerifyPassword, VerificaIdToken};