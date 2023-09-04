// Acciones de prueba

const pruebaArtist = (req, res) => {
    return res.status(200).send({
      message: "Mensaje enviado desde controlador Artist",
    });
  };

export default {
    pruebaArtist
}