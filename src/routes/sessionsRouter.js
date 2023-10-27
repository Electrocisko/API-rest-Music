import {Router} from "express";
import sessionControler from "../controllers/sessionControler.js";
import auth from "../middlewares/auth.js";
import upLoader from "../helpers/storageImageAvatar.js"; //Multer

import passport from "passport";

const router = Router();

router.post('/register', passport.authenticate('register',
 {failureRedirect: '/api/session/error/register', failureMessage: true}),sessionControler.registerUser);

router.post('/login', passport.authenticate('login',
 {failureRedirect: '/api/session/error', failureMessage: true}),  sessionControler.loginUser);

 router.get('/error/register', (req,res) => {    
    res.redirect('/error/register')
 })
 
router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/')
})

 router.get('/error', (req,res) => {    
    res.redirect('/error')
 })

 export default router;