const Venta = require('../models/venta.model');

class VentaRepository {

    async crear(venta) {
        return await Venta.create(venta);
    }

    async obtenerTodas() {
        return await Venta.find().sort({ createdAt: -1 });
    }

    async buscarPorId(id) {
        return await Venta.findById(id);
    }

    async buscarPorUsuario(usuarioId) {
        return await Venta.find({ usuarioId }).sort({ createdAt: -1 });
    }

    async actualizarEstado(id, estado) {
        return await Venta.findByIdAndUpdate(
            id,
            { estado },
            { new: true, runValidators: true }
        );
    }

    async eliminar(id) {
        return await Venta.findByIdAndDelete(id);
    }
}

module.exports = new VentaRepository();
