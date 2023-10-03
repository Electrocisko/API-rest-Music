import mongoose from "mongoose";
const { Schema, model } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";

const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.ObjectId,
    ref: "artist",
  },
  description: {
    type: String,
    required: true,
  },
  year: String,
  image: {
    type: String,
    default: "album.jpg",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

albumSchema.plugin(mongoosePaginate);

export const Album = model("album", albumSchema);
