import express from "express";
import cors from "cors";
import __dirname from "../aux_dirname.js";
import config from "./config/config.js";

const PORT = config.app.PORT || 8080;

// Creo servidor express
const app = express();

//Midlewars
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//routes
app.get('/',(req,res) => {
    return res.status(200).json({
        status:"succes",
        message: "Api rest de musica"
    });
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


