import { Album } from "../models/albumModel.js";
import { Artist } from "../models/artistModel.js";
import mongoose from "mongoose";
import multer from "multer";

//Multer
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/images/albums");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploader = multer({ storage });

const pruebaAlbum = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde controlador Album",
  });
};

const createAlbum = async (req, res) => {
  try {
    const album = req.body;
    if (!album.title) throw new Error("Falta Titulo del Album");
    if (!album.artist) throw new Error("Falta el Id del Artista del Album");
    if (!album.description) throw new Error("Falta Descripción");
    if (!album.year) throw new Error("Falta Año de publicación del Album");
    //Validar el id del artista.
    if (!mongoose.Types.ObjectId.isValid(album.artist))
      throw new Error("Id de artista no valido");
    //Validar si el artista existe en la base de datos.
    let artist = await Artist.findById(album.artist);
    if (!artist)
      throw new Error("No se encontro el artista en la base de datos");
    // Me falta hacer lo de Multer para los archivos de imagen del album.

    let newAlbum = new Album(album);
    let aux = await newAlbum.save();
    return res.status(200).json({
      status: "success",
      message: "Ingresar Album a Base de datos",
      album: aux,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const oneAlbum = async (req, res) => {
  try {
    // Falta todas las validaciones
    let album = await Album.findById(req.params.id).populate("artist");

    return res.status(200).json({
      status: "success",
      message: "Obtener Album por Id",
      album,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  pruebaAlbum,
  createAlbum,
  oneAlbum,
};
