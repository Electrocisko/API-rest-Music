// Acciones de prueba

const pruebaSong = (req, res) => {
    return res.status(200).send({
      message: "Mensaje enviado desde controlador Song",
    });
  };

export default {
    pruebaSong
}