// Acciones de prueba

const pruebaAlbum = (req, res) => {
    return res.status(200).send({
      message: "Mensaje enviado desde controlador Album",
    });
  };

export default {
    pruebaAlbum
}