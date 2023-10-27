import passport from "passport";
import local from "passport-local";
import { User } from "../models/userModel.js";
import { createHash, isValidPassword } from "../helpers/cryptPaswword.js";

const LocalStrategy = local.Strategy;

const initPassport = () => {
  try {
    passport.use(
      "register",
      new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
          // Validaciones que lleguen los datos
          //Tiene que llegar dos password para chequear
          const { name, surname, nick, role, created_at } = req.body;
          // Falta imagen
          let userData = {
            name,
            surname,
            nick,
            email,
            password,
            role,
            created_at,
          };
          //Validacion de si usuario ya existe
          let newUser = new User(userData);
          newUser.password = await createHash(password);
          const user = await newUser.save();
          if (!user)
            return done(null, false, { message: "Error al crear usuario" });
          return done(null, user);
        }
      )
    );
  } catch (error) {
    console.log("error en local:", error);
    return done(error, null);
  }


  try {
    
  passport.use('login', new LocalStrategy({
    usernameField:'email'} , async (email, password, done) => {
      if (!email || !password) return done(null, false);
      let user = await User.findOne({email})
      // Falta validacion de comparar el password
      console.log(user);
    return done(null,user);
  }))

  // passport.use('login', new LocalStrategy({
  //   usernameField:'email', passReqToCallback: true
  // } , async (email, password, done) => {
  //   if (!email || !password) return done(null, false);
  //   let user = await User.findOne({email})
  //   if (!user) return done(null, false,{ message: "No existe usuario" });
  //   let checkPassword = await isValidPassword(user.password, password);
  //   if (!checkPassword) return done(null, false);
  //   return done(null, user);
  // }))
  } catch (error) {
    console.log('error en login',error);
    return done(error,null)
  }

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let result = await User.findById(id);
    return done(null, result);
  });
};

export default initPassport;
