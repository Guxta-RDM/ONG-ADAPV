const { DateTime } = require("luxon");
const AtividadesModel = require("../models/atividadesModel");
const VoluntariosModel = require("../models/voluntariosModel");
const EmpresasModel = require("../models/empresasModel");

class AtividadesController {

    cadastroView(req, res) {
        res.render('cadastrar/atividades');
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();

        if (req.body.nome != "" && req.body.desc != "" && req.body.data != "" && req.body.voluntario != "0" && req.body.empresa != "0") {

        }
    }

}

module.exports = AtividadesController;