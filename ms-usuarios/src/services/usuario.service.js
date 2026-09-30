const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const repository = require("../repositories/usuario.repository");
const Usuario = require("../models/usuario.model");

const SECRET_KEY = "tienda-ropa-secreta";

class UsuarioService {

    registrar(nombre, email, password) {

        const usuarioExistente =
            repository.buscarPorEmail(email);

        if (usuarioExistente) {
            throw new Error("El usuario ya existe");
        }

        const passwordEncriptada =
            bcrypt.hashSync(password, 10);

        const id =
            repository.obtenerTodos().length + 1;

        const usuario = new Usuario(
            id,
            nombre,
            email,
            passwordEncriptada
        );

        return repository.crear(usuario);
    }

    login(email, password) {

        const usuario =
            repository.buscarPorEmail(email);

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        const passwordCorrecta =
            bcrypt.compareSync(
                password,
                usuario.password
            );

        if (!passwordCorrecta) {
            throw new Error("Contraseña incorrecta");
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email
            },
            SECRET_KEY,
            {
                expiresIn: "1h"
            }
        );

        return {
            mensaje: "Login exitoso",
            token: token
        };
    }
}

module.exports = new UsuarioService();