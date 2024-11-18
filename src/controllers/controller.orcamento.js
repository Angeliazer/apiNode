import { Orcamento } from "../models/model.orcamento.js"
import serviceOrcamento from "../services/service.orcamento.js"
import PDFDocument from "pdfkit"
import nodemailer from "nodemailer"
import fs from "fs"

async function AddOrcamento(req, res) {
  try {
    const orcamento = { ...req.body }

    const response = await serviceOrcamento.AddOrcamento(orcamento)

    if (response.idOrcamento) {
      res.status(201).json(response)
    } else {
      res.status(401).json({ error: response.error })
    }
  } catch (error) {
    res.status(401).json({ error })
  }
}

async function UpdateOrcamento(req, res) {
  try {
    const orcamento = { ...req.body }

    const response = await serviceOrcamento.UpdateOrcamento(orcamento)

    if (response.status === 1) {
      res.status(200).json(response)
    } else {
      res.status(401).json({ error: response.error })
    }
  } catch (error) {
    res.status(401).json({ error })
  }
}

async function ListaOrcamento(req, res) {
  const idUsuario = req.body.idUsuario

  try {
    const result = await serviceOrcamento.ListaOrcamento(idUsuario)

    if (result.length == 0) res.status(200).json([])
    else res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}

async function ListaItemsOrcamento(req, res) {
  const idOrcamento = req.query.idOrcamento

  try {
    const result = await serviceOrcamento.ListaItemsOrcamento(idOrcamento)

    if (result.length == 0) res.status(200).json([])
    else res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}

async function ListaOrcamentoData(req, res) {
  const dataInicial = req.query.dataInicial
  const dataFinal = req.query.dataFinal
  const idUsuario = req.body.idUsuario

  try {
    const result = await serviceOrcamento.ListaOrcamentoData(
      dataInicial,
      dataFinal,
      idUsuario
    )

    if (result.length == 0) res.status(200).json([])
    else res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ status: error })
  }
}

async function ListaOrcCliente(req, res) {
  const idUsuario = req.body.idUsuario
  const idCliente = req.params.idCliente

  try {
    const result = await serviceOrcamento.ListaOrcCliente(idUsuario, idCliente)

    if (result.length == 0) res.status(200).json([])
    else res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ status: error })
  }
}

async function DelOrcamento(req, res) {
  const idOrcamento = parseInt(req.query.idOrcamento)

  try {
    const orcamento = await serviceOrcamento.DelOrcamento(idOrcamento)

    if (orcamento == 0) res.status(200).json({ status: 0 })
    else res.status(200).json({ status: 1 })
  } catch (error) {
    res.status(500).json({ status: error })
  }
}

async function GerarPDF(req, res) {
  try {
    // 1. Criar o PDF em memória
    const doc = new PDFDocument()
    const filePath = "./output.pdf"

    // Grava o PDF no sistema de arquivos
    const writeStream = fs.createWriteStream(filePath)
    doc.pipe(writeStream)

    doc
      .fontSize(16)
      .text("Este é um PDF de exemplo gerado pela API!", 100, 100)
      .moveDown(2)
      .text("Centralizando dentro de um espaço de 400", {
        width: 400,
        align: "justify",
      })
    doc.end()

    // Esperar até que o PDF seja completamente gravado antes de enviar o e-mail
    writeStream.on("finish", async () => {
      try {
        // 2. Configurar o transporte do Nodemailer

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // Use SSL para a porta 465
          auth: {
            user: "yyrigon@gmail.com",
            pass: "gryz tjyk dbhg menk", // ou a senha de app gerada se tiver autenticação em duas etapas
          },
        })

        // 3. Configurar o e-mail com o PDF em anexo
        const mailOptions = {
          from: "yyrigon@gmail.com",
          to: "yrigon216@gmail.com",
          subject: "Aqui está o seu PDF!",
          text: "Este é o PDF que você pediu.",
          attachments: [
            {
              filename: "output.pdf",
              path: filePath,
              contentType: "application/pdf",
            },
          ],
        }

        // 4. Enviar o e-mail com o PDF em anexo

        try {
          await transporter.sendMail(mailOptions)
          res.status(200).send("PDF gerado e enviado por e-mail com sucesso!")
        } catch (error) {
          console.error("Erro ao enviar o e-mail:", error)
          res.status(500).send(`Erro ao enviar o e-mail: ${error.message}`)
        }

        // Remover o arquivo após o envio
        fs.unlinkSync(filePath)
      } catch (error) {
        console.error("Erro ao enviar o e-mail:", error)
        res.status(500).send("Erro ao enviar o e-mail")
      }
    })
  } catch (error) {
    console.error("Erro ao gerar o PDF:", error)
    res.status(500).send("Erro ao gerar o PDF")
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
  GerarPDF,
}
