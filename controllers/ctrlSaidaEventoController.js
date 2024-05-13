const { DateTime } = require("luxon");
const CtrlSaidaEventoModel = require("../models/ctrlSaidaEventoModel");
const ProdutosModel = require("../models/produtosModel");
const EventoModel = require("../models/eventosModel");

class CtrlSaidaEventoController {

    cadastroView(req, res) {
        res.render('cadastrar/ctrlSaidaEvento');
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();
        if (req.body.desc != '' && req.body.estado != '' && req.body.prodSaida_id != '' && req.body.prodSaida_qnt != '' && req.body.prodEntrada_id != '' && req.body.prodEntrada_qnt != '' && req.body.even_id != '') {
            let ctrlEven = new CtrlSaidaEventoModel(0, req.body.desc, req.body.estado, dataHoje.toISODate(), dataHoje.toISODate(), req.body.prodSaida_id, req.body.prodSaida_qnt, req.body.prodEntrada_id, req.body.prodEntrada_qnt, req.body.even_id);

            let result = await ctrlEven.cadastrar();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Controle de saida de evento registrado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao registrar a controle de saida de evento, tente novamente!"
                });
            }
        }
        else {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }

    async listagemCadView(req, res) {
        let produto = new ProdutosModel()
        let listaProduto = await produto.listar()
        let evento = new EventoModel()
        let listaEvento = await evento.listarEvento()
        res.render('cadastrar/ctrlSaidaEvento', { listaProduto: listaProduto, listaEvento: listaEvento})
    }

    async listagemView(req, res) {
        let ctrlEven = new CtrlSaidaEventoModel()
        let listaCtrlEven = await ctrlEven.listar();
        res.render('listar/ctrlSaidaEvento', { listaCtrlEven: listaCtrlEven });
    }

    async alterarView(req, res) {
        let ctrlEven = new CtrlSaidaEventoModel();
        ctrlEven = await ctrlEven.obterId(req.params.id);
        res.render('alterar/ctrlSaidaEvento', { ctrlEven: ctrlEven});
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now()
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()

        if (req.body.desc != '' && req.body.estado != '' && req.body.prodSaida_id != '' && req.body.prodSaida_qnt != '' && req.body.prodEntrada_id != '' && req.body.prodEntrada_qnt != '' && req.body.even_id != '') {
            let ctrlEven = new CtrlSaidaEventoModel(req.body.id, req.body.desc, req.body.estado, dataCriacao, dataHoje.toISODate(), req.body.prodSaida_id, req.body.prodSaida_qnt, req.body.prodEntrada_id, req.body.prodEntrada_qnt, req.body.even_id);

            let result = await ctrlEven.editar();
            if (result) {
                res.send({
                    ok: true,
                    msg: "Controle de saida de evento alterado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar o controle de saida de evento, tente novamente!"
                });
            }
        }
        else {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }

    async excluir(req, res) {
        if (req.body.id != null) {
            let ctrlEven = new CtrlSaidaEventoModel();

            let ok = await ctrlEven.excluir(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir controle de saida de evento" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado." })
        }
    }

}

module.exports = CtrlSaidaEventoController;