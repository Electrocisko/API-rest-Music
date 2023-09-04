import {Router} from "express";
import userControler from "../controllers/userControler.js";

const router = Router();

router.get('/prueba',userControler.pruebaUser );

export default router;

