import {Router} from "express";
import albumControler from "../controllers/albumControler.js";
import upLoader from "../helpers/storageImageAlbum.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get('/prueba',albumControler.pruebaAlbum );
router.post('/create',upLoader.single("image"), albumControler.createAlbum);
router.get('/one/:id', auth,albumControler.oneAlbum );
router.get('/artist/:id', albumControler.albumsArtist);
router.put('/updated/:id', upLoader.single("image"),albumControler.updatedAlbum);

export default router;