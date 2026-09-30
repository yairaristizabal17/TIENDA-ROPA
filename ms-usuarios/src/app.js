const express = require("express");
const cors = require("cors");

const usuarioRoutes = require("./routes/usuario.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/usuarios", usuarioRoutes);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`MS Usuarios ejecutándose en puerto ${PORT}`);
});