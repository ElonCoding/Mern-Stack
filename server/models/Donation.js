import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    temple: { type: mongoose.Schema.Types.ObjectId, ref: "Temple", required: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: "INR" }
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
