const express = require('express');
const EnderecoController = require("../controllers/enderecoController");

let ctrl = new EnderecoController();

let router = express.Router();

module.exports = router;