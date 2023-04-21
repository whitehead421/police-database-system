import mongoose from "mongoose";

const ArananSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    officerName: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    lastSeen: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "https://i.hizliresim.com/nnq15lm.png",
    },
    desc: {
      type: String,
    },
    priority: {
      type: Number,
      required: true,
      default: 1,
    },
    // 3 = Kırmızı
    // 2 = Sarı
    // 1 = Mavi
  },
  { timestamps: true }
);

export default mongoose.model("Aranan", ArananSchema);
