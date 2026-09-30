const express = require("express");
const cors = require("cors");

const productoRoutes =
    require("./routes/producto.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/productos",
    productoRoutes
);

const PORT = 3002;

app.listen(PORT, () => {

    console.log(
        `MS Productos ejecutándose en puerto ${PORT}`
    );
});