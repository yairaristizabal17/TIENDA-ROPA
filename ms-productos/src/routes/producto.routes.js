const express = require("express");

const router = express.Router();

const controller =
    require("../controllers/producto.controller");

router.get(
    "/",
    controller.obtenerTodos
);

router.get(
    "/:id",
    controller.obtenerPorId
);

router.post(
    "/",
    controller.crear
);

router.delete(
    "/:id",
    controller.eliminar
);

module.exports = router;