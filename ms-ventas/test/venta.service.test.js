const { test, before } = require('node:test');
const assert = require('node:assert/strict');

// Simulamos el repositorio para no necesitar MongoDB
const repositoryPath = require.resolve('../src/repositories/venta.repository');

const ventasGuardadas = [];

require.cache[repositoryPath] = {
    id: repositoryPath,
    filename: repositoryPath,
    loaded: true,
    exports: {
        async crear(venta) {
            ventasGuardadas.push(venta);
            return venta;
        }
    }
};

const ventaService = require('../src/services/venta.service');

before(() => {
    ventasGuardadas.length = 0;
});

test('Debe registrar una venta y calcular correctamente el total', async () => {
    const datos = {
        usuarioId: 'USR001',
        productos: [
            {
                productoId: 'PROD001',
                nombre: 'Camiseta',
                cantidad: 2,
                precioUnitario: 45000
            }
        ]
    };

    const resultado = await ventaService.crearVenta(datos);

    assert.equal(resultado.total, 90000);
    assert.equal(resultado.usuarioId, 'USR001');
    assert.equal(resultado.productos.length, 1);
});

test('Debe rechazar una venta sin usuario', async () => {
    await assert.rejects(
        ventaService.crearVenta({
            productos: [
                {
                    productoId: 'PROD001',
                    nombre: 'Camiseta',
                    cantidad: 1,
                    precioUnitario: 45000
                }
            ]
        }),
        /El usuario es obligatorio/
    );
});

test('Debe rechazar una venta sin productos', async () => {
    await assert.rejects(
        ventaService.crearVenta({
            usuarioId: 'USR001',
            productos: []
        }),
        /La venta debe tener productos/
    );
});

test('Debe rechazar cantidades negativas', async () => {
    await assert.rejects(
        ventaService.crearVenta({
            usuarioId: 'USR001',
            productos: [
                {
                    productoId: 'PROD001',
                    nombre: 'Camiseta',
                    cantidad: -2,
                    precioUnitario: 45000
                }
            ]
        }),
        /La cantidad debe ser un entero positivo/
    );
});
