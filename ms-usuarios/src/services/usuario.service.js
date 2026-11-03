
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const repository = require("../repositories/usuario.repository");

const SECRET_KEY = process.env.JWT_SECRET;

class UsuarioService {

    async registrar(nombre, email, password) {

        const usuarioExistente =
            await repository.buscarPorEmail(email);

        if (usuarioExistente) {
            throw new Error("El usuario ya existe");
        }

        const passwordEncriptada =
            bcrypt.hashSync(password, 10);

        const usuario = {
            nombre,
            email: email.toLowerCase(),
            password: passwordEncriptada
        };

        return await repository.crear(usuario);
    }

    async login(email, password) {

        const usuario =
            await repository.buscarPorEmail(email);

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        const passwordCorrecta =
            bcrypt.compareSync(password, usuario.password);

        if (!passwordCorrecta) {
            throw new Error("Contraseña incorrecta");
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email
            },
            SECRET_KEY,
            {
                expiresIn: "1h"
            }
        );

        return {
            mensaje: "Login exitoso",
            token
        };
    }
}

module.exports = new UsuarioService();
