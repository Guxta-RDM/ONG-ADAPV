const express = require('express');
const ProjetosController = require("../controllers/projetosController");

let ctrl = new ProjetosController();

let router = express.Router();

module.exports = router;