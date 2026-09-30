const service = require("../services/usuario.service");

class UsuarioController {

    registrar = (req, res) => {

        try {

            const {
                nombre,
                email,
                password
            } = req.body;

            const usuario = service.registrar(
                nombre,
                email,
                password
            );

            res.status(201).json({
                mensaje: "Usuario registrado",
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email
                }
            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    login = (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;

            const resultado = service.login(
                email,
                password
            );

            res.json(resultado);

        } catch (error) {

            res.status(401).json({
                error: error.message
            });

        }
    };
}

module.exports = new UsuarioController();