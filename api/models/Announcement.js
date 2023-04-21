import mongoose from "mongoose";

const DuyuruSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duyuru: {
      type: String,
      required: true,
    },
    adder: {
      type: String,
      required: true,
    },
    adderName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Duyuru", DuyuruSchema);
