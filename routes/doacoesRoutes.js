const express = require('express');
const DoacoesController = require("../controllers/doacoesController");

let ctrl = new DoacoesController();

let router = express.Router();

module.exports = router;