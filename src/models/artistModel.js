import mongoose from "mongoose";
const { Schema, model } = mongoose;
import mongoosePaginate from 'mongoose-paginate-v2';



const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "artist.jpg",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

artistSchema.plugin(mongoosePaginate);

export const Artist = model("artist",artistSchema);