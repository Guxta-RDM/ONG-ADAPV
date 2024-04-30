const express = require('express');
const ProjetosController = require("../controllers/projetosController");

let ctrl = new ProjetosController();

let router = express.Router();

router.get('/listar', ctrl.listagemView);
router.get('/cadastrar', ctrl.listagemAtivCad, ctrl.cadastroView)
router.post('/cadastrar', ctrl.cadastrar);
router.post('/excluir', ctrl.excluir) 

module.exports = router;