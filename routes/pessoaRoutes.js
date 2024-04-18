const express = require('express');
const PessoaController = require("../controllers/pessoaController");

let ctrl = new PessoaController();

let router = express.Router();

router.get('/listar', ctrl.listagemView) //NF = Não funciona
router.get('/cadastrar', ctrl.cadastroView)
router.post('/cadastrar', ctrl.cadastrar)
router.get('/alterar/:id', ctrl.alterarView) //NF
router.post('/alterar', ctrl.alterar) //NF
router.post('/excluir', ctrl.excluir) //NF

module.exports = router;