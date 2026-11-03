const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

function verificarToken(req, res, next) {

    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            mensaje: "Token requerido"
        });
    }

    const partes = authorization.split(" ");

if (partes.length !== 2 || partes[0] !== "Bearer" || !partes[1]) {
    return res.status(401).json({
        mensaje: "Formato de token inválido. Use Bearer TOKEN"
    });
}

const token = partes[1];

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