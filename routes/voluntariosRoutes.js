const express = require('express');
const VoluntariosController = require("../controllers/voluntariosController");

let ctrl = new VoluntariosController();

let router = express.Router();

module.exports = router;