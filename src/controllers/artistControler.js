import { Artist } from "../models/artistModel.js";
import fs from "fs";
import mongoose from "mongoose";


const pruebaArtist = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde controlador Artist",
  });
};

const createArtist = (req, res) => {
  try {
    let artistData = req.body;
    if (!artistData.name) throw new Error("Falta nombre de artista");
    if (!artistData.description) throw new Error("Falta Descripción");
    let newArtist = new Artist(artistData);
    // Por omision le asigno una imagen generica
    newArtist.image = "musica.jpg";
    // Si llega el req.file hago las validaciones y actualizo el path de la imagen en newartist
    if (req.file != undefined) {
      let image = req.file.originalname;
      //obtener la extension del arhivo de la imagen
      const imageSplit = image.split("."); //devuele un array y el ultimo elemento es la extension
      const extension = imageSplit[1];
      //Chequear la extension
      if (
        extension != "png" &&
        extension != "jpg" &&
        extension != "jpeg" &&
        extension != "gif"
      ) {
        const filePath = req.file.path;
        fs.unlinkSync(filePath); // borro el archivo incorrecto
        throw new Error("Extension no valida");
      }
      // Agrego el nombre del archivo en el artista
      newArtist.image = req.file.filename;
    }
    newArtist.save();

    return res.status(200).json({
      status: "success",
      message: "Artista guardado en base de datos",
      newArtist,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const oneArtist = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Id de artista no valido");
    let artist = await Artist.findById(id);
    if (!artist) throw new Error("No se ha encontrado perfil de artista");
    return res.status(200).json({
      status: "success",
      message: "Datos del artista",
      artist,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const allArtist = async (req, res) => {
  try {
    //options de paginate
    let page = req.params.page ?? 1;
    const options = {
      page: page,
      limit: 5,
      sort: { name: 1 },
    }
    const list = await Artist.paginate({},options)

    return res.status(200).json({
      status: "success",
      message: "Listado de artistas",
      artists: list
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const editArtist = async (req,res) => {
  try {
    return res.status(200).json({
      status: "success",
      message: "Editar Artista"
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }

}

export default {
  pruebaArtist,
  createArtist,
  oneArtist,
  allArtist,
  editArtist
};
