const service =
    require("../services/producto.service");

class ProductoController {

    crear = (req, res) => {

        const producto =
            service.crear(req.body);

        res.status(201).json(producto);
    };

    obtenerTodos = (req, res) => {

        const productos =
            service.obtenerTodos();

        res.json(productos);
    };

    obtenerPorId = (req, res) => {

        const producto =
            service.buscarPorId(req.params.id);

        if (!producto) {

            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json(producto);
    };

    eliminar = (req, res) => {

        const eliminado =
            service.eliminar(req.params.id);

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