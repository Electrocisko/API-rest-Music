import { User } from "../models/userModel.js";
import { createHash, isValidPassword } from "../helpers/cryptPaswword.js";
import validate from "../helpers/validations.js";
import UserDtoPresenter from "../helpers/userDTO.js";
import jwt from "../services/jwt.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const registerUser = async (req, res) => {
    try {
     const user = req.user;
     return res.json({
      user
     })
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };

  const loginUser = async (req, res) => {
    try {
      req.session.user = req.user;
      // return res.json({
      //   user:  req.session.user
      //  })  
      return res.render('home.ejs',{user:req.session.user })
    } catch (error) {
      console.log(error);
    }
  };

  export default {
    registerUser,
    loginUser
  }