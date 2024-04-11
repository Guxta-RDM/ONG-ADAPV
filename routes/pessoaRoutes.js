const express = require('express');
const PessoaController = require("../controllers/pessoaController");

let ctrl = new PessoaController();

let router = express.Router();

module.exports = router;