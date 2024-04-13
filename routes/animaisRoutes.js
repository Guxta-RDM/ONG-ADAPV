const express = require('express');
const AnimaisController = require("../controllers/animaisController");

let ctrl = new AnimaisController();

let router = express.Router();

router.get('/cadastrar', ctrl.cadastroView)
router.post('/cadastrar', ctrl.cadastrar)

module.exports = router;