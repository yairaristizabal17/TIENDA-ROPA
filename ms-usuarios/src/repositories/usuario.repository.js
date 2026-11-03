
const Usuario = require("../models/usuario.model");

class UsuarioRepository {

    async crear(usuario) {
        return await Usuario.create(usuario);
    }

    async buscarPorEmail(email) {
        return await Usuario.findOne({
            email: email.toLowerCase()
        });
    }

    async buscarPorId(id) {
        return await Usuario.findById(id);
    }

    async obtenerTodos() {
        return await Usuario.find();
    }
}

module.exports = new UsuarioRepository();
