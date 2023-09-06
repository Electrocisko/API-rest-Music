import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  nick: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:  {
    type: String,
    default: "user",
  },
  image:  {
    type: String,
    default: "generic-avatar.jpg",
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

export const User = mongoose.model("users", userSchema);
