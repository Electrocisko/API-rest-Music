import { User } from "../models/userModel.js";
import { createHash, isValidPassword } from "../helpers/cryptPaswword.js";
import validate from "../helpers/validations.js";
import UserDtoPresenter from "../helpers/userDTO.js";
import jwt from "../services/jwt.js";
import mongoose from "mongoose";
// let checkpas = await isValidPassword(passwordHashed,"123" );

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

    //Comprobar si el usuario existe

    //Comprobar si el usuario existe y no soy yo(el identificado)

    //Si ya existe devuelvo una repuesta

    //Cifrar passwors si es que llega

    // Buscar usuario en bd  y actualizar

    //Devolver repuesta

    return res.status(200).json({
      status: "sucess",
      message: "Updated user",
      dataProof: userIdentity,
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
};
