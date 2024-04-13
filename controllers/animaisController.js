const { DateTime } = require("luxon");
const AnimalModel = require("../models/animaisModel");

class AnimalController {

    cadastroView(req,res){
        res.render('cadastrar/animais')
    }

    async cadastrar(req, res){
        const dataHoje = DateTime.now()
        
        if(req.body.nome != "" && req.body.sexo != "0" && req.body.ester != "0" && req.body.campoData != '' && req.body.especie != '0' && req.body.estado != '0' && req.body.raca != '0' && req.body.pelagem != '0') {
            let animal = new AnimalModel(0, req.body.nome, req.body.campoData, req.body.raca, req.body.sexo, req.body.especie, req.body.pelagem, req.body.ester, req.body.estado, dataHoje.toISODate(), dataHoje.toISODate());

            let result = await animal.cadastrar();

            if(result) {
                res.send({
                    ok: true,
                    msg: "Usuário cadastrado com sucesso!"
                });
            }   
            else{
                res.send({
                    ok: false,
                    msg: "Erro ao cadastrar usuário!"
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

        res.render('listar/animais')
    }

}

module.exports = AnimalController;