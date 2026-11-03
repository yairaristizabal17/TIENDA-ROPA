
const service = require("../services/usuario.service");

class UsuarioController {

    registrar = async (req, res) => {

        try {

            const {
                nombre,
                email,
                password
            } = req.body;

            if (!nombre || !email || !password) {
                return res.status(400).json({
                    error: "Todos los campos son obligatorios"
                });
            }

            const usuario = await service.registrar(
                nombre,
                email,
                password
            );

            res.status(201).json({
                mensaje: "Usuario registrado",
                usuario: {
                    id: usuario._id,
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

    login = async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    error: "Correo y contraseña son obligatorios"
                });
            }

            const resultado = await service.login(
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
