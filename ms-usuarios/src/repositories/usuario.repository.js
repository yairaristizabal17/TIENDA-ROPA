const usuarios = [];

class UsuarioRepository {

    crear(usuario) {
        usuarios.push(usuario);
        return usuario;
    }

    buscarPorEmail(email) {
        return usuarios.find(
            usuario => usuario.email === email
        );
    }

    buscarPorId(id) {
        return usuarios.find(
            usuario => usuario.id === id
        );
    }

    obtenerTodos() {
        return usuarios;
    }
}

module.exports = new UsuarioRepository();