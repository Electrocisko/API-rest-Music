import {Router} from "express";
import songControler from "../controllers/songControler.js";
import upLoader from "../helpers/storageSong.js";
import auth from "../middlewares/auth.js";

const router = Router();

// Falta el auth

router.get('/prueba',songControler.pruebaSong );
router.post('/create', upLoader.single("file"), songControler.createSong);
router.get('/one/:id',auth ,songControler.oneSong);
router.get('/songsalbum/:id', auth,songControler.songsFromAlbum);
router.get('/audio/:file',auth,  songControler.audio);
router.put('/update/:id',upLoader.single("file"),songControler.update);


export default router;