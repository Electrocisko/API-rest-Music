import {Router} from "express";
import albumControler from "../controllers/albumControler.js";
import upLoader from "../helpers/storageImageAlbum.js";

const router = Router();

router.get('/prueba',albumControler.pruebaAlbum );
router.post('/create',upLoader.single("image"), albumControler.createAlbum);
router.get('/one/:id',albumControler.oneAlbum );


export default router;