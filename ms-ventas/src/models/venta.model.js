const mongoose = require('mongoose');

const detalleVentaSchema = new mongoose.Schema({
    productoId: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1
    },
    precioUnitario: {
        type: Number,
        required: true,
        min: 0
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0
    }
}, { _id: false });

const ventaSchema = new mongoose.Schema({
    usuarioId: {
        type: String,
        required: true
    },
    productos: {
        type: [detalleVentaSchema],
        required: true,
        validate: {
            validator: productos => productos.length > 0,
            message: 'La venta debe contener al menos un producto'
        }
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    estado: {
        type: String,
        enum: ['pendiente', 'completada', 'cancelada'],
        default: 'completada'
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Venta', ventaSchema);
