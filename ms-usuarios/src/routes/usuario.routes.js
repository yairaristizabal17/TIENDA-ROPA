const express = require("express");

const router = express.Router();

const controller = require("../controllers/usuario.controller");

router.post("/registro", controller.registrar);

router.post("/login", controller.login);

module.exports = router;