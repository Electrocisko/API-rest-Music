import {Router} from "express";
import sessionControler from "../controllers/sessionControler.js";
import auth from "../middlewares/auth.js";
import upLoader from "../helpers/storageImageAvatar.js"; //Multer

import passport from "passport";

const router = Router();

router.post('/register', passport.authenticate('register',
 {failureRedirect: '/error', failureMessage: true}),sessionControler.registerUser);

router.post('/login', passport.authenticate('login',
 {failureRedirect: '/error', failureMessage: true}),  sessionControler.loginUser);

 export default router;