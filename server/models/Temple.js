import mongoose from "mongoose";

const templeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    deity: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Temple", templeSchema);
