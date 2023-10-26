import express from "express";
import cors from "cors";
import __dirname from "../aux_dirname.js";
import config from "./config/config.js";
import connection from "./database/connection.js";
import userRouter from "./routes/userRouter.js";
import songRouter from "./routes/songRouter.js";
import artistRouter from "./routes/artistRouter.js";
import albumRouter from "./routes/albumRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import passport from "passport";
import initPassport from "./config/configPassport.js";
import session from "express-session";
import cookieParser from "cookie-parser";


const PORT = config.app.PORT || 8080;

// Creo servidor express
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/src/public"));// Ruta publica seria ejemplo: http://localhost:3030/public/images/musica.jpg
app.use(cookieParser());
app.use(session({secret: config.session.SECRET_SESSION, resave: true, saveUninitialized:true })); //MemoyStore

//Conectando a Base de Datos
connection();

initPassport();
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/user", userRouter);
app.use("/api/artist", artistRouter);
app.use("/api/album", albumRouter);
app.use("/api/song", songRouter);
app.use("/", viewsRouter);



app.use((error, req, res, next) => {
  console.log('This is the rejected field ->', error.field);
  res.status(400).json({
    status: "error",
    message: error.message
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
