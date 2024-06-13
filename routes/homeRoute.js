const express = require('express');
const HomeController = require('../controllers/homeController');

let ctrl = new HomeController();

let router = express.Router();

router.get('/', ctrl.listarView, ctrl.homeView)

module.exports = router;