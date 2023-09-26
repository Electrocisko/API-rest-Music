import {Router} from "express";
import albumControler from "../controllers/albumControler.js";
import { uploader } from "../controllers/albumControler.js";

const router = Router();

router.get('/prueba',albumControler.pruebaAlbum );
router.post('/create',uploader.single("image"), albumControler.createAlbum);
router.get('/one/:id',albumControler.oneAlbum );


export default router;