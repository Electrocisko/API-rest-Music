import {Router} from "express";
import artistControler from "../controllers/artistControler.js";
import upLoader from "../middlewares/multerArtist.js";

const router = Router();

router.get('/prueba',artistControler.pruebaArtist );
router.post('/create', upLoader.single("image") ,artistControler.createArtist);

export default router;  