import express from "express";
import cors from "cors";
import __dirname from "../aux_dirname.js";
import config from "./config/config.js";
import connection from "./database/connection.js";
import userRouter from "./routes/userRouter.js";
import songRouter from "./routes/songRouter.js";
import artistRouter from "./routes/artistRouter.js";
import albumRouter from "./routes/albumRouter.js";

const PORT = config.app.PORT || 8080;

// Creo servidor express
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/src/public"));
// Ruta publica seria ejemplo: http://localhost:3030/public/images/musica.jpg

//Conectando a Base de Datos
connection();

//ruta de prueba
app.get("/", (req, res) => {
  return res.status(200).json({
    status: "succes",
    message: "Api rest de musica",
  });
});

//routes
app.use("/api/user", userRouter);
app.use("/api/artist", artistRouter);
app.use("/api/album", albumRouter);
app.use("/api/song", songRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
