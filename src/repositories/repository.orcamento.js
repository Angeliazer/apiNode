import { connectToDatabase } from "../database/db.js"
import sql from "mssql"
const { Transaction } = sql

async function AddOrcamento(orcamento) {
  try {
    const pool = await connectToDatabase()

    const transaction = new Transaction(pool)

    try {
      await transaction.begin()

      const resultOrc = transaction
        .request()
        .input("idCliente", sql.Int, orcamento.idCliente)
        .input("idUsuario", sql.Int, orcamento.idUsuario)
        .input("data", sql.Date, orcamento.data)
        .input("vlrTotal", sql.Float, orcamento.vlrTotal)
        .input("servico", sql.Char, orcamento.servico)

      const ok =
        await resultOrc.query(`INSERT INTO orcamento (idCliente, idUsuario, data, vlrTotal, servico) 
                    OUTPUT INSERTED.idOrcamento
                    VALUES (@idCliente, @idUsuario, @data, @vlrTotal, @servico)`)

      for (let x in orcamento.items) {
        try {
          const itemOrcamento = transaction
            .request()
            .input("idOrcamento", sql.Int, ok.recordset[0].idOrcamento)
            .input("item", sql.Int, orcamento.items[x].item)
            .input("descricao", sql.VarChar, orcamento.items[x].descricao)
            .input("quantidade", sql.Int, orcamento.items[x].quantidade)
            .input("total", sql.Float, orcamento.items[x].total)
            .input("tipo", sql.VarChar, orcamento.items[x].tipo)
            .input("valor", sql.Float, orcamento.items[x].valor)

          await itemOrcamento.query(`INSERT INTO itemOrcamento (idOrcamento, item, descricao, quantidade, total,
                    tipo, valor) 
                VALUES (@idOrcamento, @item, @descricao, @quantidade, @total, @tipo, @valor)`)
        } catch (error) {
          throw (error = "Ocorreu um erro...")
        }
      }
      await transaction.commit()
      return { idOrcamento: ok.recordset[0].idOrcamento }
    } catch (error) {
      await transaction.rollback()
      return { error }
    } finally {
      await (pool && pool.close())
    }
  } catch (error) {
    return { error }
  }
}

async function UpdateOrcamento(orcamento) {
  try {
    const pool = await connectToDatabase()

    const transaction = new Transaction(pool)

    try {
      await transaction.begin()

      const resultOrc = transaction
        .request()
        .input("idOrcamento", sql.Int, orcamento.idOrcamento)
        .input("vlrTotal", sql.Float, orcamento.vlrTotal)

      await resultOrc.query(
        `update orcamento set vlrTotal = @vlrTotal where idOrcamento = @idOrcamento`
      )

      const resultItem = transaction
        .request()
        .input("idOrcamento", sql.Int, orcamento.idOrcamento)

      await resultItem.query(
        `delete from itemorcamento where idOrcamento = @idOrcamento`
      ) // Deleta todos os Itens do Orçamento

      for (let x in orcamento.items) {
        try {
          const itemOrcamento = transaction
            .request()
            .input("idOrcamento", sql.Int, orcamento.idOrcamento)
            .input("item", sql.Int, orcamento.items[x].item)
            .input("descricao", sql.VarChar, orcamento.items[x].descricao)
            .input("quantidade", sql.Int, orcamento.items[x].quantidade)
            .input("total", sql.Float, orcamento.items[x].total)
            .input("tipo", sql.VarChar, orcamento.items[x].tipo)
            .input("valor", sql.Float, orcamento.items[x].valor)

          await itemOrcamento.query(`INSERT INTO itemOrcamento (idOrcamento, item, descricao, quantidade, total, tipo, valor) 
            OUTPUT INSERTED.idOrcamento
                    VALUES (@idOrcamento, @item, @descricao, @quantidade, @total, @tipo, @valor)`)
        } catch (error) {
          throw (error = "Ocorreu um erro...")
        }
      }

      await transaction.commit()
      return { status: 1 }
    } catch (error) {
      await transaction.rollback()
      return { status: 0 }
    } finally {
      await (pool && pool.close())
    }
  } catch (error) {
    return { error }
  }
}

async function ListaOrcamento(id) {
  try {
    const pool = await connectToDatabase()

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(
        `select o.*, c.nome, c.idCliente, i.* from orcamento o 
            inner JOIN cliente c ON c.idCliente = o.idCliente 
            inner JOIN itemOrcamento i ON i.idOrcamento = o.idOrcamento
            where o.idUsuario = @id order by o.idOrcamento desc`
      )

    const orcamentos = {}

    result.recordset.forEach((item) => {
      const idOrcamento = item.idOrcamento[(0, 0)]
      // Reorganiza os itens para devolver para o Aplicativo
      if (!orcamentos[idOrcamento]) {
        orcamentos[idOrcamento] = {
          idOrcamento: idOrcamento,
          idCliente: item.idCliente[0],
          idUsuario: item.idUsuario,
          vlrTotal: item.vlrTotal,
          data: item.data,
          nome: item.nome,
          itens: [],
        }
      }

      // Cria o item do orçamento
      const itemOrcamento = {
        item: item.item,
        descricao: item.descricao,
        quant: item.quantidade,
        valor: item.valor,
        tipo: item.tipo,
        total: item.total,
      }

      // Adiciona o item ao orçamento
      orcamentos[idOrcamento].itens.push(itemOrcamento)
    })

    const objOrcamento = Object.values(orcamentos)

    return objOrcamento
  } catch (error) {
    return []
  }
}

async function ListaOrcamentoData(dataInicial, dataFinal, idUsuario) {
  try {
    const pool = await connectToDatabase()

    const request = pool.request().input("idUsuario", sql.Int, idUsuario)

    if (dataInicial !== "") {
      request.input("dataInicial", sql.Date, new Date(dataInicial))
    }

    if (dataFinal !== "") {
      request.input("dataFinal", sql.Date, new Date(dataFinal))
    }

    const result =
      await request.query(`select o.*, c.nome, c.idCliente, i.* from orcamento o 
    inner JOIN cliente c ON c.idCliente = o.idCliente 
    inner JOIN itemOrcamento i ON i.idOrcamento = o.idOrcamento
    where o.idUsuario = @idUsuario ${
      dataInicial ? " and o.data >= @dataInicial" : ""
    } ${dataFinal ? " and o.data <= @dataFinal " : ""}`)

    const orcamentos = {}

    result.recordset.forEach((item) => {
      const idOrcamento = item.idOrcamento[(0, 0)]
      // Reorganiza os itens para devolver para o Aplicativo
      if (!orcamentos[idOrcamento]) {
        orcamentos[idOrcamento] = {
          idOrcamento: idOrcamento,
          idCliente: item.idCliente[0],
          idUsuario: item.idUsuario,
          vlrTotal: item.vlrTotal,
          data: item.data,
          nome: item.nome,
          itens: [],
        }
      }

      // Cria o item do orçamento
      const itemOrcamento = {
        item: item.item,
        descricao: item.descricao,
        quant: item.quantidade,
        valor: item.valor,
        tipo: item.tipo,
        total: item.total,
      }

      // Adiciona o item ao orçamento
      orcamentos[idOrcamento].itens.push(itemOrcamento)
    })

    const objOrcamento = Object.values(orcamentos)

    return objOrcamento
  } catch (error) {
    return []
  }
}

async function ListaOrcCliente(idUsuario, idCliente) {
  try {
    const pool = await connectToDatabase()

    const result = await pool
      .request()
      .input("idCliente", sql.Int, idCliente)
      .input("idUsuario", sql.Int, idUsuario)
      .query(
        `select * from orcamento where idCliente = @idCliente and idUsuario = @idUsuario
           order by data, idOrcamento desc`
      )

    return result.recordset
  } catch (error) {
    return []
  }
}

async function ListaItemsOrcamento(idOrcamento) {
  try {
    const pool = await connectToDatabase()

    const result = await pool
      .request()
      .input("idOrcamento", sql.Int, idOrcamento)
      .query(
        `select * from itemorcamento where idOrcamento = @idOrcamento order by item`
      )

    return result.recordset
  } catch (error) {
    return []
  }
}

async function DelOrcamento(idOrcamento) {
  try {
    const pool = await connectToDatabase()

    const transaction = new Transaction(pool)

    try {
      await transaction.begin()

      const idorca = transaction
        .request()
        .input("idOrcamento", sql.Int, idOrcamento)
      await idorca.query(
        `delete from itemorcamento where idOrcamento = @idOrcamento`
      )

      const orca = transaction
        .request()
        .input("idOrcamento", sql.Int, idOrcamento)
      await orca.query(`delete from orcamento where idOrcamento = @idOrcamento`)

      await transaction.commit()

      return 1
    } catch (error) {
      await transaction.rollback()
      return { status: "Erro na transação", error }
    }
  } catch (error) {
    return 0
  }
}

export default {
  AddOrcamento,
  ListaOrcamento,
  ListaOrcCliente,
  ListaOrcamentoData,
  DelOrcamento,
  ListaItemsOrcamento,
  UpdateOrcamento,
}
