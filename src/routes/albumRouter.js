import {Router} from "express";
import albumControler from "../controllers/albumControler.js";

const router = Router();

router.get('/prueba',albumControler.pruebaAlbum );

export default router;