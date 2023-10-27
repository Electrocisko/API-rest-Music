import {Router} from 'express';

const router = Router();

router.get("/", (req, res) => {
return res.render('index.ejs');
  });

router.get('/register',(req,res) => {
  return res.render('register.ejs')
})

router.get('/error', (req,res) => {
  return res.render('error.ejs')
})

export default router;