const productos = [];

class ProductoRepository {

    crear(producto) {
        productos.push(producto);
        return producto;
    }

    obtenerTodos() {
        return productos;
    }

    buscarPorId(id) {

        return productos.find(
            producto => producto.id === Number(id)
        );
    }

    eliminar(id) {

        const indice =
            productos.findIndex(
                producto =>
                    producto.id === Number(id)
            );

        if (indice === -1) {
            return false;
        }

        productos.splice(indice, 1);

        return true;
    }
}

module.exports = new ProductoRepository();