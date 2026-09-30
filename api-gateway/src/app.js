const express = require("express");
const axios = require("axios");
const cors = require("cors");

const verificarToken = require("./middleware/auth.middleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// ================================
// USUARIOS - REGISTRO
// ================================

app.post("/usuarios/registro", async (req, res) => {

    try {

        const respuesta = await axios.post(
            "http://localhost:3001/usuarios/registro",
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
            "http://localhost:3001/usuarios/login",
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
            "http://localhost:3002/productos"
        );

        res.json(respuesta.data);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error en MS Productos"
        });
    }
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