import jwt from "../services/jwt.js";

//Crear la funcion middleware

const auth = (req, res, next) => {
  try {
    //Cheque si tiene cabecera auth
    if (!req.headers.authorization)
      throw new Error("Peticion no tiene cabecera de autenticación");
    let payload= jwt.decodeToken(req.headers.authorization);
    if (!payload) throw new Error("Token invalido o vencido")
    next();
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

//Comprobar si me llega la cabecera auth

// Limpiar Token

// Decodificar token

// Comprobar la expiracion del token

//Agregar datos al request

//Pasar a la ejecucion  de la accion

export default auth;
