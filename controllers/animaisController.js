const { DateTime } = require("luxon");
const AnimalModel = require("../models/animaisModel");

class AnimalController {

    cadastroView(req,res){
        res.render('cadastrar/animais')
    }

    async cadastrar(req, res){
        const dataHoje = DateTime.now()
        const toISOdtNasc = req.body.campoData
        console.log(toISOdtNasc)
        
        if(req.body.nome != "" && req.body.sexo != "0" && req.body.ester != "0" && req.body.campoData != '' && req.body.especie != '0' && req.body.estado != '0' && req.body.raca != '0' && req.body.pelagem != '0') {
            let animal = new AnimalModel(0, req.body.nome, req.body.campoData, req.body.raca, req.body.sexo, req.body.especie, req.body.pelagem, req.body.ester, req.body.estado, dataHoje.toISODate(), dataHoje.toISODate());

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

    async listagemView(req,res){
        let animal = new AnimalModel()
        let listaAnimais = await animal.listarAnimais()

        res.render('listar/animais', {lista: listaAnimais})
    }

    async alterarView(req,res){
        let animais = new AnimalModel();
        animais = await animais.obterAnimId(req.params.id);
        res.render('alterar/animais', { animais: animais });
    }

    async alterar(req, res) {
        if(req.body.nome != "" && req.body.sexo != "0" && req.body.ester != "0" && req.body.campoData != '' && req.body.especie != '0' && req.body.estado != '0' && req.body.raca != '0' && req.body.pelagem != '0') {
            let usuario = new AnimalModel(req.body.id, req.body.nome, req.body.campoData, req.body.raca, req.body.sexo, req.body.especie, req.body.pelagem, req.body.ester, req.body.estado, req.body.createdAt, dataHoje.toISODate());

            let result = await usuario.cadastrar();

            if(result) {
                res.send({
                    ok: true,
                    msg: "Usuário alterado com sucesso!"
                });
            }   
            else{
                res.send({
                    ok: false,
                    msg: "Erro ao alterar usuário!"
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

}

module.exports = AnimalController;