const service = require("../services/producto.service");

class ProductoController {

    crear = (req, res) => {
        const { nombre, precio, stock } = req.body;

        if (!nombre || precio < 0 || stock < 0 ||
            precio === undefined || stock === undefined) {
            return res.status(400).json({
                mensaje: "Datos del producto inválidos"
            });
        }

        const producto = service.crear(req.body);

        res.status(201).json({
            mensaje: "Producto creado correctamente",
            producto
        });
    };

    obtenerTodos = (req, res) => {
        res.json(service.obtenerTodos());
    };

    obtenerPorId = (req, res) => {
        const producto = service.buscarPorId(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json(producto);
    };

    eliminar = (req, res) => {
        const eliminado = service.eliminar(req.params.id);

        if (!eliminado) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json({
            mensaje: "Producto eliminado"
        });
    };
}

module.exports = new ProductoController();