import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    image: {
      type: String,
      trim: true,
      default: "https://placehold.co/900x500/1e293b/a5b4fc?text=Project+Image"
    },
    techStack: {
      type: [String],
      default: []
    },
    features: {
      type: [String],
      default: []
    },
    githubUrl: {
      type: String,
      trim: true,
      default: "https://github.com/"
    },
    liveUrl: {
      type: String,
      trim: true,
      default: "#"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);

