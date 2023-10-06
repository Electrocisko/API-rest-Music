// Acciones de prueba
import mongoose from "mongoose";
import { Song } from "../models/songModel.js";
import fs from "fs";
import path from "path";

const pruebaSong = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde controlador Song",
  });
};

const createSong = async (req, res) => {
  try {
    let dataSong = req.body;
    if (!dataSong.title) throw new Error("Falta Titulo de la cancion");
    if (!dataSong.album) throw new Error("Falta el Id  del Album");
    if (!dataSong.track) throw new Error("Falta Numero de track");
    if (!dataSong.duration) throw new Error("Falta duracion");
    if (!mongoose.Types.ObjectId.isValid(dataSong.album))
      throw new Error("Id del album no valido");
    // Falta validaciones de mp3
    let fileMp3 = req.file;
    if (!fileMp3) throw new Error("Falta archivo mp3");
    //obtener la extension del arhivo de la imagen
    const split = fileMp3.originalname.split("."); //devuele un array y el ultimo elemento es la extension
    //Chequear la extension
    if (split[1] != "mp3") {
      const filePath = req.file.path;
      fs.unlinkSync(filePath); // borro el archivo incorrecto
      throw new Error("Extension no valida");
    }
    let newSong = new Song(dataSong);
    newSong.file = fileMp3.filename;
    let song = await newSong.save();

    return res.status(200).json({
      status: "success",
      message: "Guardar cancion nueva ",
      song,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const oneSong = async (req, res) => {
  try {
    let songId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(songId))
      throw new Error("Id no valido");

    // Nested populate ////////////////
    let song = await Song.findById(songId).populate({
      path: "album",
      populate: { path: "artist" },
    });
    if (!song) throw new Error("No se encontro la canción con ese id");

    res.status(200).json({
      status: "success",
      message: "Return song",
      song,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const songsFromAlbum = async (req, res) => {
  try {
    let albumId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(albumId))
      throw new Error("Id no valido");

    let list = await Song.find({ album: albumId }).populate({
      path: "album",
      populate: { path: "artist" },
    });

    res.status(200).json({
      status: "success",
      message: "Return songs from album",
      list,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const audio = async (req, res) => {
  try {
    const file = req.params.file;
    const filePath = "./src/uploads/songs/" + file;
    fs.stat(filePath, (error, exists) => {
      if (error || !exists)
        return res.status(400).json({
          status: "error",
          message: "No se encontro fichero",
        });
    });

    res.sendFile(path.resolve(filePath));
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Id de la cancion no valido");
    let dataSong = req.body;
    if (!mongoose.Types.ObjectId.isValid(dataSong.album))
      throw new Error("Id del album no valido");
    if (req.file) {
      let fileMp3 = req.file;
      const split = fileMp3.originalname.split(".");
      if (split[1] != "mp3") {
        const filePath = req.file.path;
        fs.unlinkSync(filePath);
        throw new Error("Extension file no valida");
      }
      dataSong.file = fileMp3.filename;
    }

    let songUpdated = await Song.findByIdAndUpdate(id,dataSong,{new: true});
    return res.status(200).json({
      status: "success",
      message: "Updated Song",
      songUpdated
      
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
  createSong,
  oneSong,
  songsFromAlbum,
  audio,
  update,
};
