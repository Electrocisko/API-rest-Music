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
    done(error, null);
  }

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser(async (user, done) => {
    return done(null, user);
  });
};

export default initPassport;
