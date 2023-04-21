import mongoose from "mongoose";

const OfficerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    rankNo: {
      type: Number,
      required: true,
    },
    pp: {
      type: String,
      default: "https://i.hizliresim.com/5xxviwa.jpg",
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      default: false,
      unique: true,
    },
    badge: {
      type: String,
      unique: true,
    },
    isFTO: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Officer", OfficerSchema);
