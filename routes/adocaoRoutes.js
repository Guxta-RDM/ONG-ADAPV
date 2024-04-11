const express = require('express');
const AdocaoController = require("../controllers/adocaoController");

let ctrl = new AdocaoController();

let router = express.Router();

module.exports = router;