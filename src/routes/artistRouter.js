import {Router} from "express";
import artistControler from "../controllers/artistControler.js";
import upLoader from "../helpers/storageImageArtist.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get('/prueba',artistControler.pruebaArtist );
router.post('/create', upLoader.single("image") ,artistControler.createArtist);
router.get('/one/:id', auth, artistControler.oneArtist);
router.get('/all/:page?',auth, artistControler.allArtist);
router.put('/edit/:id',  upLoader.single("image"), artistControler.editArtist);
router.delete('/remove/:id', auth,artistControler.deleteArtist);

export default router;  