// Acciones de prueba
import mongoose from "mongoose";

const pruebaSong = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde controlador Song",
  });
};

const createSong = (req, res) => {
  try {
    let dataSong = req.body;
    if (!dataSong.title) throw new Error("Falta Titulo de la cancion");
    if (!dataSong.album) throw new Error("Falta el Id  del Album");
    if (!dataSong.track) throw new Error("Falta Numero de track");
    if (!dataSong.duration) throw new Error("Falta duracion");
    if (!mongoose.Types.ObjectId.isValid(dataSong.album))
    throw new Error("Id del album no valido");

    return res.status(200).json({
      status: "success",
      message: "Guardar cancion nueva ",
      song: dataSong
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  pruebaSong,
  createSong
};
