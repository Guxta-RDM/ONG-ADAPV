const { DateTime } = require("luxon");
const PatrimonioModel = require("../models/patrimonioModel");
const DoacoesModel = require("../models/doacoesModel");

class PatrimonioController {

    cadastroView(req, res){
        res.render('cadastrar/patrimonio');
    }

    async cadastrar(req, res){
        const dataHoje = DateTime.now();

        if (req.body.saldo != "" || req.body.doa_id !=""){
            let patrimonio = new PatrimonioModel(0, req.body.saldo, req.body.doa_id, dataHoje.toISODate(), dataHoje.toISODate());

            let result = await patrimonio.cadastrar();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Patrimonio registrado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao registrar o patrimonio, tente novamente!"
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

    async listagemView(req, res){
        let patrimonio = new PatrimonioModel();
        let listaPatrim = await patrimonio.listar();
        res.render('listar/patrimonio', {listaPatrim: listaPatrim})
    }

    async listagemDoaCad(req, res){
        let doacao = new DoacoesModel();
        let listaDoa = await doacao.listaDoacoes();
        res.render('cadastrar/patrimonio', {listaDoa: listaDoa})
    }

    async alterarView(req, res){
        let patrimonio = new PatrimonioModel();

        patrimonio = await patrimonio.obterId(req.params.id);

        res.render('alterar/patrimonio', {patrimonio: patrimonio});
    }

    async alterar(req, res){
        const dataHoje = DateTime.now();
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()

        console.log(req.body)

        if (req.body.saldo != "" && req.body.doa_id != ""){
            let patrimonio = new PatrimonioModel(req.body.id, req.body.saldo, req.body.doa_id, dataCriacao, dataHoje.toISODate());

            let result = await patrimonio.editar();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Patrimonio alterado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar o patrimonio, tente novamente!"
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
            let patrimonio = new PatrimonioModel();

            let ok = await patrimonio.excluir(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir patrimonio" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado." })
        }
    }

}

module.exports = PatrimonioController;