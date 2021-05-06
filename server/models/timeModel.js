import mongoose from "mongoose";

const Schema = mongoose.Schema;

const timeSchema = new Schema({
  title: { type: String, required: true },
  creator: { type: String, required: true },
  date: { type: String, required: true },
  project: { type: String },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  h: { type: Number, required: true },
  m: { type: Number, required: true },
  s: { type: Number, required: true },
});

const Time = mongoose.model("Time", timeSchema);

export default Time;
