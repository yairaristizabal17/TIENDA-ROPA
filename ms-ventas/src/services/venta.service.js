const ventaRepository = require('../repositories/venta.repository');

class VentaService {

    async crearVenta(datos) {
        if (!datos.usuarioId) {
            throw new Error('El usuario es obligatorio');
        }

        if (!Array.isArray(datos.productos) || datos.productos.length === 0) {
            throw new Error('La venta debe tener productos');
        }

        let total = 0;

        const productos = datos.productos.map(producto => {
            const cantidad = Number(producto.cantidad);
            const precio = Number(producto.precioUnitario);

            if (!producto.productoId || !producto.nombre) {
                throw new Error('Cada producto debe tener ID y nombre');
            }

            if (!Number.isInteger(cantidad) || cantidad <= 0) {
                throw new Error('La cantidad debe ser un entero positivo');
            }

            if (!Number.isFinite(precio) || precio < 0) {
                throw new Error('El precio debe ser un número válido');
            }

            const subtotal = cantidad * precio;
            total += subtotal;

            return {
                productoId: producto.productoId,
                nombre: producto.nombre,
                cantidad,
                precioUnitario: precio,
                subtotal
            };
        });

        return await ventaRepository.crear({
            usuarioId: datos.usuarioId,
            productos,
            total,
            estado: 'completada'
        });
    }

    async obtenerVentas() {
        return await ventaRepository.obtenerTodas();
    }

    async obtenerVentaPorId(id) {
        const venta = await ventaRepository.buscarPorId(id);

        if (!venta) {
            throw new Error('Venta no encontrada');
        }

        return venta;
    }

    async obtenerVentasPorUsuario(usuarioId) {
        return await ventaRepository.buscarPorUsuario(usuarioId);
    }

    async cambiarEstado(id, estado) {
        const estadosPermitidos = [
            'pendiente',
            'completada',
            'cancelada'
        ];

        if (!estadosPermitidos.includes(estado)) {
            throw new Error('Estado de venta no válido');
        }

        const venta = await ventaRepository.actualizarEstado(id, estado);

        if (!venta) {
            throw new Error('Venta no encontrada');
        }

        return venta;
    }

    async eliminarVenta(id) {
        const venta = await ventaRepository.eliminar(id);

        if (!venta) {
            throw new Error('Venta no encontrada');
        }

        return venta;
    }
}

module.exports = new VentaService();
