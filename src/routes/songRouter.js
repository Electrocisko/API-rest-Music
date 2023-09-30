import {Router} from "express";
import songControler from "../controllers/songControler.js";
import upLoader from "../helpers/storageSong.js";

const router = Router();

// Falta el auth

router.get('/prueba',songControler.pruebaSong );
router.post('/create', upLoader.single("file"), songControler.createSong);
router.get('/one', songControler.oneSong);


export default router;