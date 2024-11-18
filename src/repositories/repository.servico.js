import {connectToDatabase} from '../database/db.js';
import sql from 'mssql';

const {Transaction} = sql;

async function AddServico(servico) {
    try {
        const transf = 'S';

        const pool = await connectToDatabase();

        const transaction = new Transaction(pool);

        try {
            await transaction.begin();

            const requestServico = transaction
                .request()
                .input('idUsuario', sql.Int, servico.idUsuario)
                .input('idCliente', sql.Int, servico.idCliente)
                .input('idOrcamento', sql.Int, servico.idOrcamento)
                .input('situacao', sql.Char, servico.situacao)
                .input('total', sql.Float, servico.total)
                .input('saldo', sql.Float, servico.saldo)
                .input(
                    'dataIni',
                    sql.Date,
                    servico.dataIni ? new Date(servico.dataIni) : null
                )
                .input(
                    'dataFim',
                    sql.Date,
                    servico.dataFim ? new Date(servico.dataFim) : null
                );

            await requestServico.query(`
          INSERT INTO servico (idUsuario, idCliente, idOrcamento, dataIni, dataFim, situacao, total, saldo) 
          VALUES (@idUsuario, @idCliente, @idOrcamento, @dataIni, @dataFim, @situacao, @total, @saldo)
        `);

            const requestOrcamento = transaction
                .request()
                .input('idUsuario', sql.Int, servico.idUsuario)
                .input('idCliente', sql.Int, servico.idCliente)
                .input('idOrcamento', sql.Int, servico.idOrcamento)
                .input('servico', sql.Char, transf);

            await requestOrcamento.query(`
          Update orcamento set servico = @servico where idUsuario = @idUsuario and idOrcamento = @idOrcamento
            and idCliente = @idCliente`);

            await transaction.commit();

            return {status: 'Ok'};
        } catch (error) {
            await transaction.rollback();
            return {status: 'Erro na transação', error};
        }
    } catch (error) {
        return {status: 'Erro na conexão', error};
    }
}

async function ListaServicoClientes(idUsuario, idCliente) {
    try {
        const pool = await connectToDatabase();

        const requestServico = await pool
            .request()
            .input('idUsuario', sql.Int, idUsuario)
            .input('idCliente', sql.Int, idCliente)
            .query(
                `select * from servico where idUsuario = @idUsuario and idCliente = @idCliente order by idOrcamento desc`
            );

        if (requestServico.length === 0) return [];
        else return requestServico.recordset;

        return {status: 'Ok'};
    } catch (error) {
        return {status: 'Erro na transação', error};
    }
}

export default {AddServico, ListaServicoClientes};
