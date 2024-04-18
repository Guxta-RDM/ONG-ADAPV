const { DateTime } = require("luxon");
const AnimaisModel = require("../models/animaisModel");

class AnimalController {

    cadastroView(req,res){
        res.render('cadastrar/animais')
    }

    async cadastrar(req, res){
        const dataHoje = DateTime.now()
        
        if(req.body.nome != "" && req.body.sexo != "0" && req.body.ester != "0" && req.body.campoData != '' && req.body.especie != '0' && req.body.estado != '0' && req.body.raca != '0' && req.body.pelagem != '0') {
            let animal = new AnimaisModel(0, req.body.nome, req.body.campoData, req.body.raca, req.body.sexo, req.body.especie, req.body.pelagem, req.body.ester, req.body.estado, dataHoje.toISODate(), dataHoje.toISODate());

            let result = await animal.cadastrar();

            if(result) {
                res.send({
                    ok: true,
                    msg: "Animal cadastrado com sucesso!"
                });
            }   
            else{
                res.send({
                    ok: false,
                    msg: "Erro ao cadastrar animal!"
                });
            }
        }
        else
        {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }

    async listagemView(req, res){
        let animal = new AnimaisModel()
        let listaAnimais = await animal.listarAnimais()
        res.render('listar/animais', {lista: listaAnimais})
    }

    async alterarView(req,res){
        let animais = new AnimaisModel();
        animais = await animais.obterAnimId(req.params.id);
        res.render('alterar/animais', { animais: animais });
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now()
        console.log(req.body)
        if(req.body.nome != "" && req.body.sexo != "0" && req.body.ester != "0" && req.body.campoData != '' && req.body.especie != '0' && req.body.estado != '0' && req.body.raca != '0' && req.body.pelagem != '0') {
            let usuario = new AnimaisModel(req.body.id, req.body.nome, req.body.campoData, req.body.raca, req.body.sexo, req.body.especie, req.body.pelagem, req.body.ester, req.body.estado, req.body.createdAt, dataHoje.toISODate());

            let result = await usuario.alterar();

            if(result) {
                res.send({
                    ok: true,
                    msg: "Animal alterado com sucesso!"
                });
            }   
            else{
                res.send({
                    ok: false,
                    msg: "Erro ao alterar animal!"
                });
            }
        }
        else
        {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }

    async excluir(req, res){
        if(req.body.id != null) {
            let animal = new AnimaisModel();
            let ok = await animal.excluir(req.body.id);
            if(ok) {
                res.send({ok: true});
            }
            else{
                res.send({ok: false, msg: "Erro ao excluir animal"})
            }
        }
        else{
            res.send({ok: false, msg: "O id para exclusão não foi enviado"})
        }
    }

}

module.exports = AnimalController;