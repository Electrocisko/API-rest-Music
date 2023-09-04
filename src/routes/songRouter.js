import {Router} from "express";
import songControler from "../controllers/songControler.js";

const router = Router();

router.get('/prueba',songControler.pruebaSong );

export default router;