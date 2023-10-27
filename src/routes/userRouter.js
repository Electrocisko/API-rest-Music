import {Router} from "express";
import userControler from "../controllers/userControler.js";
import auth from "../middlewares/auth.js";
import upLoader from "../helpers/storageImageAvatar.js"; //Multer

import passport from "passport";

const router = Router();

//Defino las rutas

router.get('/profile/:id',auth, userControler.profileUser);
router.put('/updated',auth, userControler.updateUser);
router.post('/upload', [auth, upLoader.single("avatar")], userControler.loader);
router.get('/avatar/:file',userControler.avatar);


export default router;

