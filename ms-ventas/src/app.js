require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/database');

const ventaRoutes = require('./routes/venta.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensaje: 'Microservicio de ventas funcionando',
        servicio: 'MS-VENTAS',
        puerto: process.env.PORT || 3003
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        estado: 'OK',
        servicio: 'MS-VENTAS'
    });
});

// Rutas de ventas
app.use('/ventas', ventaRoutes);

const iniciarServidor = async () => {
    await conectarDB();

    const PORT = process.env.PORT || 3003;

    app.listen(PORT, () => {
        console.log(`MS-VENTAS ejecutándose en puerto ${PORT}`);
    });
};

iniciarServidor();
