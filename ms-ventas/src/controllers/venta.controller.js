const ventaService = require('../services/venta.service');

class VentaController {

    async crear(req, res) {
        try {
            const venta = await ventaService.crearVenta(req.body);

            return res.status(201).json({
                mensaje: 'Venta registrada correctamente',
                venta
            });

        } catch (error) {
            return res.status(400).json({
                mensaje: error.message
            });
        }
    }

    async obtenerTodas(req, res) {
        try {
            const ventas = await ventaService.obtenerVentas();

            return res.status(200).json(ventas);

        } catch (error) {
            return res.status(500).json({
                mensaje: error.message
            });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const venta = await ventaService.obtenerVentaPorId(req.params.id);

            return res.status(200).json(venta);

        } catch (error) {
            const codigo = error.message === 'Venta no encontrada' ? 404 : 400;

            return res.status(codigo).json({
                mensaje: error.message
            });
        }
    }

    async obtenerPorUsuario(req, res) {
        try {
            const ventas = await ventaService.obtenerVentasPorUsuario(
                req.params.usuarioId
            );

            return res.status(200).json(ventas);

        } catch (error) {
            return res.status(500).json({
                mensaje: error.message
            });
        }
    }

    async cambiarEstado(req, res) {
        try {
            const venta = await ventaService.cambiarEstado(
                req.params.id,
                req.body.estado
            );

            return res.status(200).json({
                mensaje: 'Estado actualizado correctamente',
                venta
            });

        } catch (error) {
            const codigo = error.message === 'Venta no encontrada' ? 404 : 400;

            return res.status(codigo).json({
                mensaje: error.message
            });
        }
    }

    async eliminar(req, res) {
        try {
            await ventaService.eliminarVenta(req.params.id);

            return res.status(200).json({
                mensaje: 'Venta eliminada correctamente'
            });

        } catch (error) {
            const codigo = error.message === 'Venta no encontrada' ? 404 : 400;

            return res.status(codigo).json({
                mensaje: error.message
            });
        }
    }
}

module.exports = new VentaController();
