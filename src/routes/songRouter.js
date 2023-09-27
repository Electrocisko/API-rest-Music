import {Router} from "express";
import songControler from "../controllers/songControler.js";

const router = Router();

router.get('/prueba',songControler.pruebaSong );
router.post('/create', songControler.createSong);


export default router;