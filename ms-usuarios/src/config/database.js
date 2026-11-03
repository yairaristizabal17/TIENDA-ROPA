const mongoose = require("mongoose");

const conectarDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI no está definida");
        }

        await mongoose.connect(mongoURI);

        console.log("MongoDB conectado correctamente");
    } catch (error) {
        console.error("Error al conectar MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = conectarDB;