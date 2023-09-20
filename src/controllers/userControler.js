import { User } from "../models/userModel.js";
import { createHash, isValidPassword } from "../helpers/cryptPaswword.js";
import validate from "../helpers/validations.js";
import UserDtoPresenter from "../helpers/userDTO.js";
import jwt from "../services/jwt.js";
import mongoose from "mongoose";
import fs from 'fs';


// Acciones de prueb
const pruebaUser = (req, res) => {
  let user = req.user;
  return res.status(200).send({
    message: "Mensaje enviado desde controlador User",
    user,
  });
};

const registerUser = async (req, res) => {
  try {
    //Comprobar que llegan todos los datos requeridos
    const data = req.body;
    if (!data.name) throw new Error("Falta Apellido");
    if (!data.surname) throw new Error("Falta Apellido");
    if (!data.nick) throw new Error("Falta Nick");
    if (!data.email) throw new Error("Falta Email");
    if (!data.password || !data.passwordCheck)
      throw new Error("Falta Password");
    if (data.password != data.passwordCheck)
      throw new Error("Los passwords no coindicen");
    // Validar (Queda pendiente con Validator)
    validate(data);

    // Controlar que no haya otro usuario registrado con ese mail o con ese nick.
    let exist = await User.find({ nick: data.nick.toLowerCase() });
    if (exist.length != 0)
      throw new Error("Usuario ya registrado con ese nick");
    exist = await User.find({ email: data.email.toLowerCase() });
    if (exist.length != 0)
      throw new Error("Usuario ya registrado con ese email");
    // Agregar el password hasheado
    data.password = await createHash(data.password);
    //Crear el Objeto User
    const newUser = new User(data);
    //Grabar usuario en la base de datos
    let response = await newUser.save();
    //Elimino los datos sensibles DTO
    let userDto = UserDtoPresenter(response);

    return res.status(200).json({
      status: "success",
      message: "Usuario Registrado",
      user: userDto,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data.email) throw new Error("Falta ingresar Email");
    if (!data.password) throw new Error("Falta ingresar Password");
    let user = await User.findOne({ email: data.email });
    if (!user) throw new Error("No se ha encontrado el usuario");
    let checkpas = await isValidPassword(user.password, data.password);
    if (!checkpas) throw new Error("Password incorrecto");
    let userDto = UserDtoPresenter(user);
    let token = jwt.createToken(userDto);

    return res.status(200).json({
      status: "success",
      message: "Aca se logea usuario",
      user: userDto,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const profileUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      throw new Error("Id de usuario no valido");
    let profile = await User.findById(userId);
    if (!profile) throw new Error("No se ha encontrado perfil de usuario");
    profile = UserDtoPresenter(profile);
    return res.status(200).json({
      status: "sucess",
      message: "Profile user",
      profile,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    //Recoger datos usuario identificado
    let userIdentity = req.user;
    //Recoger datos a actualizar
    let userToUpdated = req.body;

    //Comprobar si el usuario existe
    let users = await User.find({
      $or: [{ email: userToUpdated.email }, { nick: userToUpdated.nick }],
    });
    if (!users) throw new Error("No se ha encontrado el usuario");
    //Comprobar si el usuario existe y no soy yo(el identificado)
    let userIsset = false;
    users.forEach((user) => {
      if (user && user._id != userIdentity._id) userIsset = true;
    });
    if (userIsset) throw new Error("Ya existe un usuario con ese mail o nick");

    // Validar
    if (!userToUpdated.nick) throw new Error("Falta Nick");
    if (!userToUpdated.email) throw new Error("Falta Email");
    if (!userToUpdated.password) throw new Error("Falta Password");
    validate(userToUpdated);

    //Cifrar password si es que llega
    if (userToUpdated.password) {
      userToUpdated.password = await createHash(userToUpdated.password);
    }

    // Buscar usuario en bd  y actualizar
    let userToSave = await User.findByIdAndUpdate(
      userIdentity._id,
      userToUpdated,
      { new: true }
    );

    //Devolver repuesta

    return res.status(200).json({
      status: "sucess",
      message: "Updated user",
      user: UserDtoPresenter(userToSave),
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const loader = async (req, res) => {
  try {
    // configurar multer como middleware

    //Recoger fichero de imagen y ver si existe
    if(!req.file) throw new Error("La petición no incluye un fichero de imagen");
    //Obtener nombre del archivo
    let image = req.file.originalname;
    //obtener la extension del arhivo de la imagen
    const imageSplit = image.split("\."); //devuele un array y el ultimo elemento es la extension
    const extension = imageSplit[1];
    //Chequear la extension
    if(extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif"){
      const filePath = req.file.path;
      fs.unlinkSync(filePath); // borro el archivo incorrecto
      throw new Error("Extension no valida")
    }
    // guardar en base de datos
    let userUpdated = await User.findByIdAndUpdate(
      req.user._id,
      { image: req.file.path },
      { new: true }
    );

  
    
    //Devolver repuesta.

    return res
      .status(200)
      .json({ 
        status: "success",
        message: "Subiendo el archivo",
        file: req.file,
        userUpdated: UserDtoPresenter(userUpdated)
       });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  pruebaUser,
  registerUser,
  loginUser,
  profileUser,
  updateUser,
  loader,
};
