import { Album } from "../models/albumModel.js";
import { Artist } from "../models/artistModel.js";
import mongoose from "mongoose";

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
    // multer
    req.file != null && (album.image = req.file.filename);
    let newAlbum = new Album(album);
    let data = await newAlbum.save();
    return res.status(200).json({
      status: "success",
      message: "Ingresar Album a Base de datos",
      album: data,
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
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Id del album no valido");
    let album = await Album.findById(req.params.id).populate("artist");
    if (!album) throw new Error("No se ha encontrado album con ese id");
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

const albumsArtist = async (req, res) => {
  try {
    let artistId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(artistId))
      throw new Error("Id del artista no valido");
    let list = await Album.find({ artist: artistId });
    if (list.length == 0)
      throw new Error(
        "El artista no tiene albumes registrados o  no existe"
      );
    return res.status(200).json({
      status: "success",
      message: "Obtener Lista de albums por artista",
      list,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updatedAlbum = async (req, res) => {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Id del album no valido");
    let newDataAlbum = req.body
    //Faltaria validaciones
    if(req.file) newDataAlbum.image = req.file.filename;
    let albumUpdated = await Album.findByIdAndUpdate(id,newDataAlbum,{new: true});
   if(!albumUpdated) throw new Error("No existe album con ese id")
    return res.status(200).json({
      status: "success",
      message: "Modificar album",
      albumUpdated
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
  albumsArtist,
  updatedAlbum
};
