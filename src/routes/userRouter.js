import {Router} from "express";
import userControler from "../controllers/userControler.js";

const router = Router();
//Defino las rutas
router.get('/prueba',userControler.pruebaUser );
router.post('/register',userControler.registerUser);
router.post('/login',userControler.loginUser);





export default router;

