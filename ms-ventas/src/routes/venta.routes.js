const express = require('express');
const router = express.Router();

const ventaController = require('../controllers/venta.controller');

// Registrar una venta
router.post('/', ventaController.crear);

// Consultar todas las ventas
router.get('/', ventaController.obtenerTodas);

// Consultar ventas de un usuario
router.get('/usuario/:usuarioId', ventaController.obtenerPorUsuario);

// Consultar una venta por ID
router.get('/:id', ventaController.obtenerPorId);

// Actualizar el estado de una venta
router.patch('/:id/estado', ventaController.cambiarEstado);

// Eliminar una venta
router.delete('/:id', ventaController.eliminar);

module.exports = router;
