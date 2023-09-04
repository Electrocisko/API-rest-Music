// Acciones de prueba

const pruebaUser = (req, res) => {
    let user = req.user;
    return res.status(200).send({
      message: "Mensaje enviado desde controlador User",
      user,
    });
  };

export default {
    pruebaUser
}