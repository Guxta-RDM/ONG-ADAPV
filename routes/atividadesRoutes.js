const express = require('express');
const AnimaisController = require("../controllers/animaisController");

let ctrl = new AnimaisController();

let router = express.Router();

module.exports = router;