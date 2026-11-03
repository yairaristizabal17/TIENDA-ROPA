require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const verificarToken = require("./middleware/auth.middleware");

const app = express();

// Direcciones de los microservicios
const USUARIOS_URL = process.env.USUARIOS_URL;
const PRODUCTOS_URL = process.env.PRODUCTOS_URL;
const VENTAS_URL = process.env.VENTAS_URL;

// Middlewares
app.use(cors());
app.use(express.json());


// ================================
// USUARIOS - REGISTRO
// ================================

app.post("/usuarios/registro", async (req, res) => {

    try {

        const respuesta = await axios.post(
            `${USUARIOS_URL}/usuarios/registro`,
            req.body
        );

        res
            .status(respuesta.status)
            .json(respuesta.data);

    } catch (error) {

        res
            .status(error.response?.status || 500)
            .json(
                error.response?.data || {
                    mensaje: "Error en MS Usuarios"
                }
            );
    }
});


// ================================
// USUARIOS - LOGIN
// ================================

app.post("/usuarios/login", async (req, res) => {

    try {

        const respuesta = await axios.post(
            `${USUARIOS_URL}/usuarios/login`,
            req.body
        );

        res.json(respuesta.data);

    } catch (error) {

        res
            .status(error.response?.status || 500)
            .json(
                error.response?.data || {
                    mensaje: "Error en login"
                }
            );
    }
});


// ================================
// PRODUCTOS - RUTA PROTEGIDA
// ================================

app.get("/productos", verificarToken, async (req, res) => {

    try {

        const respuesta = await axios.get(
    `${PRODUCTOS_URL}/productos`
);

        res.json(respuesta.data);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error en MS Productos"
        });
    }
});

// ================================
// VENTAS - RUTAS
// ================================

// Registrar una venta
app.post("/ventas", verificarToken, async (req, res) => {
    try {
        const respuesta = await axios.post(
            "${VENTAS_URL}/ventas",
            req.body
        );

        res.status(respuesta.status).json(respuesta.data);

    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || {
                mensaje: "Error en MS Ventas"
            }
        );
    }
});

// Consultar todas las ventas
app.get("/ventas", verificarToken, async (req, res) => {
    try {
        const respuesta = await axios.get(
            "${VENTAS_URL}/ventas"
        );

        res.json(respuesta.data);

    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || {
                mensaje: "Error en MS Ventas"
            }
        );
    }
});

// Consultar ventas de un usuario
app.get("/ventas/usuario/:usuarioId", verificarToken, async (req, res) => {
    try {
        const respuesta = await axios.get(
            `${VENTAS_URL}/ventas/usuario/${req.params.usuarioId}`
        );

        res.json(respuesta.data);

    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || {
                mensaje: "Error en MS Ventas"
            }
        );
    }
});

// Consultar una venta por ID
app.get("/ventas/:id", verificarToken, async (req, res) => {
    try {
        const respuesta = await axios.get(
            `${VENTAS_URL}/ventas/${req.params.id}`
        );

        res.json(respuesta.data);

    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || {
                mensaje: "Error en MS Ventas"
            }
        );
    }
});

// Actualizar el estado de una venta
app.patch("/ventas/:id/estado", verificarToken, async (req, res) => {
    try {
        const respuesta = await axios.patch(
            `${VENTAS_URL}/ventas/${req.params.id}/estado`,
            req.body
        );

        res.json(respuesta.data);

    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || {
                mensaje: "Error en MS Ventas"
            }
        );
    }
});

// Eliminar una venta
app.delete("/ventas/:id", verificarToken, async (req, res) => {
    try {
        const respuesta = await axios.delete(
            `${VENTAS_URL}/ventas/${req.params.id}`
        );

        res.json(respuesta.data);

    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || {
                mensaje: "Error en MS Ventas"
            }
        );
    }
});

// ================================
// HEALTH CHECK
// ================================

app.get("/health", (req, res) => {
    res.status(200).json({
        estado: "OK",
        servicio: "API GATEWAY"
    });
});

// ================================
// SERVIDOR
// ================================

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `API Gateway ejecutándose en puerto ${PORT}`
    );

});