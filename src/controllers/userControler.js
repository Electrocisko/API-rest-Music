import { User } from "../models/userModel.js";

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
    //Comprobar que llegan todos los datos requeridos-  controlar usuario duplicado - cifrar contraseña . crear objeto user y luego grabarlo y hacer un select
    const data = req.body;
    if (!data.name) throw new Error("Falta Apellido");
    if (!data.surname) throw new Error("Falta Apellido");
    if (!data.nick) throw new Error("Falta Nick");
    if (!data.email) throw new Error("Falta Email");
    if (!data.password) throw new Error("Falta Password");

    // Validar (Queda pendiente con Validator)

    // Controlar que no haya otro usuario registrado con ese mail o con ese nick.
    let exist = await User.find({ nick: data.nick });
    if (exist.length != 0)
      throw new Error("Usuario ya registrado con ese nick");
    exist = await User.find({ email: data.email });
    if (exist.length != 0)
      throw new Error("Usuario ya registrado con ese email");

    //Crear el Objeto User
    const newUser = new User(data);

    await newUser.save();

    // Agregar el password hasheado

    //Grabar usuario en la base de datos

    //Devolver los datos con un select

    return res.status(200).json({
      status: "success",
      message: "Usuario Registrado",
      data,
      newUser,
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
};
