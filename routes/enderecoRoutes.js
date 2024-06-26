const express = require('express');
const EnderecoController = require("../controllers/enderecoController");

let ctrl = new EnderecoController();

let router = express.Router();

router.get('/listar', ctrl.listagemView)
router.get('/cadastrar', ctrl.listagemCadView, ctrl.cadastroView)
router.post('/cadastrar', ctrl.cadastrar)
router.get('/alterar/:id', ctrl.alterarView)
router.post('/alterar', ctrl.alterar)
router.post('/excluir', ctrl.excluir)

module.exports = router;