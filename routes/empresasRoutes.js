const express = require('express');
const EmpresasController = require("../controllers/empresasController");

let ctrl = new EmpresasController();

let router = express.Router();

module.exports = router;