import { User } from "../models/userModel.js";
import { createHash, isValidPassword } from "../helpers/cryptPaswword.js";
import validate from "../helpers/validations.js";
import UserDtoPresenter from "../helpers/userDTO.js";
import jwt from "../services/jwt.js";

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
      user: userDto
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const loginUser = async (req,res) => {
  try {
    const data = req.body;
    if (!data.email) throw new Error("Falta ingresar Email");
    if (!data.password) throw new Error("Falta ingresar Password");
    let user = await  User.findOne({email: data.email});
    if (!user) throw new Error("No se ha encontrado el usuario");
    let checkpas = await isValidPassword(user.password,data.password );
    if (!checkpas) throw new Error("Password incorrecto");
    let token = jwt.createToken(data);
    let userDto = UserDtoPresenter(user);

    return res.status(200).json({
      status:"success",
      message: "Aca se logea usuario",
      user: userDto,
      token
    })
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}

export default {
  pruebaUser,
  registerUser,
  loginUser
};
