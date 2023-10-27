import {Router} from 'express';

const router = Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    return res.render('home.ejs', {user: req.session.user})
  }
  else {
    return res.render('index.ejs')
  }
  });

router.get('/register',(req,res) => {
  return res.render('register.ejs')
})

router.get('/error', (req,res) => {
  let messages = req.session.messages;
  req.session.destroy();
  return res.render('error.ejs',{messages})
})


router.get('/error/register', (req,res) => {
  let messages = req.session.messages;
  req.session.destroy();
  return res.render('error-register.ejs',{messages})
})

export default router;