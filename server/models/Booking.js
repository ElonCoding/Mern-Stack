import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    temple: { type: mongoose.Schema.Types.ObjectId, ref: "Temple", required: true },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: "DarshanSlot", required: true },
    status: { type: String, enum: ["CONFIRMED", "CANCELLED"], default: "CONFIRMED" }
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, slot: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);
