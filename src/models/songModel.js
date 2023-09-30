import mongoose from "mongoose";
const { Schema, model } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";

const SongSchema = new Schema({
  album: {
    type: Schema.ObjectId,
    ref: "Album",
  },
  track: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

SongSchema.plugin(mongoosePaginate);

export const Song = model("songs", SongSchema);
