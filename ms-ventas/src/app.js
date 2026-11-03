
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/database');

const ventaRoutes = require('./routes/venta.routes');

const {
    register,
    solicitudesHTTP,
    tiempoRespuesta
} = require('./config/metrics');

const app = express();

app.use(cors());
app.use(express.json());

// Registrar métricas de las solicitudes HTTP
app.use((req, res, next) => {
    const inicio = process.hrtime();

    res.on('finish', () => {
        const duracion = process.hrtime(inicio);
        const segundos = duracion[0] + duracion[1] / 1e9;

        const ruta = req.route?.path
            ? req.baseUrl + req.route.path
            : req.path;

        solicitudesHTTP.inc({
            metodo: req.method,
            ruta,
            estado: res.statusCode
        });

        tiempoRespuesta.observe({
            metodo: req.method,
            ruta
        }, segundos);
    });

    next();
});

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Microservicio de ventas funcionando',
        servicio: 'MS-VENTAS',
        puerto: process.env.PORT || 3003
    });
});

// Verificar estado del servicio
app.get('/health', (req, res) => {
    res.status(200).json({
        estado: 'OK',
        servicio: 'MS-VENTAS'
    });
});

// Métricas para Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Rutas de ventas
app.use('/ventas', ventaRoutes);

// Iniciar servidor
const iniciarServidor = async () => {
    await conectarDB();

    const PORT = process.env.PORT || 3003;

    app.listen(PORT, () => {
        console.log(`MS-VENTAS ejecutándose en puerto ${PORT}`);
    });
};

iniciarServidor();
