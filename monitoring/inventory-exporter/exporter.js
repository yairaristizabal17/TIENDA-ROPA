const express = require('express');
const client = require('@prometheus-io/client');

const app = express();
const register = new client.Registry();

const productosTotal = new client.Gauge({
    name: 'tienda_productos_total',
    help: 'Cantidad total de productos registrados'
});

const inventarioUnidades = new client.Gauge({
    name: 'tienda_inventario_unidades',
    help: 'Total de unidades disponibles'
});

const productosStockBajo = new client.Gauge({
    name: 'tienda_productos_stock_bajo',
    help: 'Productos con stock inferior a 5 unidades'
});

const stockProducto = new client.Gauge({
    name: 'tienda_stock_producto',
    help: 'Stock disponible por producto',
    labelNames: ['nombre', 'categoria']
});

register.registerMetric(productosTotal);
register.registerMetric(inventarioUnidades);
register.registerMetric(productosStockBajo);
register.registerMetric(stockProducto);

app.get('/metrics', async (req, res) => {
    try {
        const respuesta = await fetch(
            'http://localhost:3002/productos'
        );

        if (!respuesta.ok) {
            throw new Error('Error consultando MS Productos');
        }

        const productos = await respuesta.json();

        productosTotal.set(productos.length);

        inventarioUnidades.set(
            productos.reduce((total, p) => total + Number(p.stock || 0), 0)
        );

        productosStockBajo.set(
            productos.filter(p => Number(p.stock) < 5).length
        );

        stockProducto.reset();

        productos.forEach(p => {
            stockProducto.set(
                { nombre: p.nombre, categoria: p.categoria },
                Number(p.stock || 0)
            );
        });

        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());

    } catch (error) {
        res.status(503).send(error.message);
    }
});

app.listen(9100, () => {
    console.log('Inventory Exporter ejecutándose en puerto 9100');
});