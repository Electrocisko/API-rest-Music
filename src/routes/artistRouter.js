import {Router} from "express";
import artistControler from "../controllers/artistControler.js";

const router = Router();

router.get('/prueba',artistControler.pruebaArtist );

export default router;