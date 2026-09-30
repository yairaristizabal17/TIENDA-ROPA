class Producto {

    constructor(
        id,
        nombre,
        categoria,
        talla,
        color,
        precio,
        stock
    ) {

        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.talla = talla;
        this.color = color;
        this.precio = precio;
        this.stock = stock;
    }
}

module.exports = Producto;