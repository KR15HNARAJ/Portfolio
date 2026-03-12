import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    }
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);

