import { User } from "../models/userModel.js";

// Acciones de prueb
const pruebaUser = (req, res) => {
    let user = req.user;
    return res.status(200).send({
      message: "Mensaje enviado desde controlador User",
      user,
    });
  };

const registerUser = async (req,res) => {
try {

  //Comprobar que llegan todos los datos requeridos-  controlar usuario duplicado - cifrar contraseña . crear objeto user y luego grabarlo y hacer un select
  const data = req.body
  if(!data.name) { 
    return res.status(400).json({
      status:"error",
      message: "Falta ingresar nombre"
    })
  }

  if(!data.surname) {
    return res.status(400).json({
      status:"error",
      message: "Falta ingresar apellido"
    })
  }
  if(!data.nick) {
    return res.status(400).json({
      status:"error",
      message: "Falta ingresar apodo"
    })
  }
  if(!data.email) {
    return res.status(400).json({
      status:"error",
      message: "Falta ingresar el Email"
    })
  }
  if(!data.password) {
    return res.status(400).json({
      status:"error",
      message: "Falta ingresar contraseña"
    })
  }

  // Validar (Queda pendiente con Validator)

  // Controlar que no haya otro usuario registrado con ese mail o con ese nick.
  let exist = await User.find({nick: data.nick});
  if(exist.length != 0) {
      return res.status(400).json({
        status:"error",
        message: "Usuario ya registrado con ese Apodo"
      })
  }
  exist = await User.find({email: data.email});
  if(exist.length != 0) {
      return res.status(400).json({
        status:"error",
        message: "Usuario ya registrado con ese Email"
      })
  }

  //Crear el Objeto User
  const newUser = new User(data);

   await newUser.save();



  // Agregar el password hasheado

  //Grabar usuario en la base de datos

  //Devolver los datos con un select

  return res.status(200).json({
    status:"success",
    message:"Usuario Registrado",
    data,
    newUser
  })
} catch (error) {
  return res.status(400).json({
    status:"error",
    message:"No se pudo registar el usuario nuevo"
  })
}
}


export default {
    pruebaUser,
    registerUser
}