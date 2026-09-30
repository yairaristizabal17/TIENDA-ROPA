const repository =
    require("../repositories/producto.repository");

const Producto =
    require("../models/producto.model");

class ProductoService {

    crear(datos) {

        const id =
            repository.obtenerTodos().length + 1;

        const producto =
            new Producto(
                id,
                datos.nombre,
                datos.categoria,
                datos.talla,
                datos.color,
                datos.precio,
                datos.stock
            );

        return repository.crear(producto);
    }

    obtenerTodos() {
        return repository.obtenerTodos();
    }

    buscarPorId(id) {
        return repository.buscarPorId(id);
    }

    eliminar(id) {
        return repository.eliminar(id);
    }
}

module.exports = new ProductoService();