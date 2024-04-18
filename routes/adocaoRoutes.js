const express = require('express');
const AdocaoController = require("../controllers/adocaoController");

let ctrl = new AdocaoController();

let router = express.Router();

router.get('/listar', ctrl.listagemView) //Não está mostrando
router.get('/cadastrar', ctrl.cadastroView) //NF
router.post('/cadastrar', ctrl.cadastrar) // NF
router.get('alterar:id', ctrl.alterarView) //NF
router.post('/alterar', ctrl.alterar) // NF
router.post('/excluir', ctrl.excluir) //NF

module.exports = router;