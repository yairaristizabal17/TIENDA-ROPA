const jwt = require("jsonwebtoken");

const SECRET_KEY = "tienda-ropa-secreta";

function verificarToken(req, res, next) {

    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            mensaje: "Token requerido"
        });
    }

    const token = authorization.split(" ")[1];

    try {

        const usuario = jwt.verify(
            token,
            SECRET_KEY
        );

        req.usuario = usuario;

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: "Token inválido"
        });
    }
}

module.exports = verificarToken;