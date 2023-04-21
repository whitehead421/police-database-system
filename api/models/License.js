import mongoose from "mongoose";

const LicenseSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    pp: {
      type: String,
      required: true,
    },
    serialNo: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("License", LicenseSchema);
