import {Router} from "express";
import userControler from "../controllers/userControler.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js"; //Multer

const router = Router();

//Defino las rutas
router.get('/prueba',userControler.pruebaUser );
router.post('/register',userControler.registerUser);
router.post('/login',userControler.loginUser);
router.get('/profile/:id',auth, userControler.profileUser);
router.put('/updated',auth, userControler.updateUser);
router.post('/upload', [auth, upload.single("avatar")], userControler.loader);


export default router;

