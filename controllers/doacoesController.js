const { DateTime } = require("luxon");
const DoacoesModel = require("../models/doacoesModel");
const PessoaModel = require("../models/pessoaModel");

class DoacoesController {
    cadastroView(req, res) {
        res.render('cadastrar/doacoes')
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();
        console.log(req.body)
        if (req.body.tipo != "" && req.body.desc != "" && req.body.qnt != "" && req.body.data != "" && req.body.pess_id != "") {
            let doacoes = new DoacoesModel(0, req.body.tipo, req.body.desc, req.body.qnt, req.body.doador, req.body.cpf_cnpj, req.body.rg, req.body.data, req.body.pess_id, dataHoje.toISODate(), dataHoje.toISODate());
            let result = await doacoes.cadastrarDoacao();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Doação cadastrada com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao cadastrar a doação"
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
        let doacoes = new DoacoesModel();
        let listaDoacoes = await doacoes.listaDoacoes()
        res.render('listar/doacoes', { listaDoacoes: listaDoacoes })
    }

    async listagemPessoaCadView(req, res) {
        let pessoa = new PessoaModel();
        let listaPessoas = await pessoa.listarPessoa()
        res.render('cadastrar/doacoes', { listaPessoa: listaPessoas})
    }

    async alterarView(req, res) {
        let doacoes = new DoacoesModel();
        doacoes = await doacoes.obterDoaId(req.params.id);
        res.render('alterar/doacoes', { doacoes: doacoes });
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now()
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()
        const dataTratarDoa = new Date(Date.parse(req.body.data))
        const dataTratar2Doa = DateTime.fromJSDate(dataTratarDoa)
        const dataTratadaDoa = dataTratar2Doa.toISODate()
        console.log(req.body)
        if (req.body.tipo != "" && req.body.desc != "" && req.body.qnt != "" && req.body.data != "" && req.body.pess_id != "") {
            let doacoes = new DoacoesModel(req.body.id, req.body.tipo, req.body.desc, req.body.qnt, req.body.doador, req.body.cpf_cnpj, req.body.rg, dataTratadaDoa, req.body.pess_id, dataCriacao, dataHoje.toISODate());

            let result = await doacoes.editarDoacao();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Doação alterada com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar doação!"
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
            let doacoes = new DoacoesModel();
            let ok = await doacoes.excluir(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir doação" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado" })
        }
    }
}

module.exports = DoacoesController; 