import mongoose from "mongoose";

const RaporSchema = new mongoose.Schema(
  {
    officer: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    report: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    moreOfficers: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rapor", RaporSchema);
