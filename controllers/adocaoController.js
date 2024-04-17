const { DateTime } = require("luxon");
const PessoaModel = require("../models/pessoaModel");
const AnimalModel = require("../models/animaisModel");
const AdocaoModel = require("../models/adocaoModel");

class AdocaoController {

    cadastroView(req, res) {
        res.render('cadastrar/adocao');
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();

        if (req.body.IdAdotante != '0' && req.body.IdAnimal != '0') {
            let adocao = new AdocaoModel(0, req.body.IdAdotante, req.body.IdAnimal, dataHoje.toISODate(), dataHoje.toISODate());

            let result = await adocao.criarAdocao();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Adoção registrada com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao registrar a adoção, tente novamente!"
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

    async listagemView(req, res) {
        let adocao = new AdocaoModel()

        let listaAdocao = await adocao.listarAdocao();

        res.render('listar/adocao', { listaAdocao: listaAdocao });
    }

    async alterarView(req, res) {
        let adocao = new AdocaoModel();

        adocao = await adocao.obterAdoId(req.params.id);

        res.render('alterar/adocao', { adocao: adocao });
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now()

        if (req.body.pessId != 0 && req.body.aniId != 0) {
            let usuario = new AdocaoModel(0, req.body.pessId, req.body.aniId, req.body.createdAt, dataHoje.toISODate());

            let result = await usuario.editarAdocao();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Doação registrada com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar a adoção, tente novamente!"
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
            let adocao = new AdocaoModel();

            let ok = await adocao.excluirAdocao(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir animal" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado." })
        }
    }

}

module.exports = AdocaoController;