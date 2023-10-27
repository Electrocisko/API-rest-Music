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
          const { name, surname, nick, role, created_at ,password2} = req.body;
          if (!name) return done(null, false, {message: "Falta completar campo nombre"});
          if (!surname) return done(null, false, {message: "Falta completar campo apellido"});
          if (!nick) return done(null, false, {message: "Falta completar campo nick name/apodo"});
          if (!email) return done(null, false, {message: "Falta completar campo emaill"});
          if (!password) return done(null, false, {message: "Falta completar campo contraseña/password"});
          if (!password2) return done(null, false, {message: "Falta completar campo  reingrese constraseña/password"});
          if (password != password2) return done(null, false, {message: "Contraseñas no concuerdan"});
          // Falta imagen
          let exist = await User.findOne({$or: [ {email: email},{nick: nick} ] });
          if (exist) return done(null, false, {message: "Usuario ya registrado con ese mail o apodo duplicado"});
          let userData = {
            name,
            surname,
            nick,
            email,
            password,
            role,
            created_at,
          };
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
    return done(error, null, { message: "Error al registrar usuario" } );
  }

  try {
    passport.use(
      "login",
      new LocalStrategy(
        {
          usernameField: "email",
        },
        async (email, password, done) => {
          if (!email || !password) return done(null, false, {message: "Datos incompletos"});
          let user = await User.findOne({ email });
          if (!user) return done(null, false, { message: "No existe usuario" });
          let checkPassword = await isValidPassword(user.password, password);
          if (!checkPassword)
            return done(null, false, { message: "Password Incorrecto" });
          return done(null, user);
        }
      )
    );
  } catch (error) {
    return done(error, null, { message: "Error en login" } );
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
