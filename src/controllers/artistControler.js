import { Artist } from "../models/artistModel.js";
import fs from 'fs';

const pruebaArtist = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde controlador Artist",
  });
};


const createArtist = (req, res) => {
  try {
    let artistData = req.body;
    let newArtist = new Artist(artistData);
 
   newArtist.image = "/public/images/musica.jpg"
   

    if(req.file != undefined) {
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
    
    newArtist.image = req.file.path

    }
  
    
    return res.status(200).json({
      status: "success",
      message: "Aca se va crear el artista",
      newArtist,
     
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  pruebaArtist,
  createArtist,
};
