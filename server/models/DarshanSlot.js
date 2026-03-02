import mongoose from "mongoose";

const darshanSlotSchema = new mongoose.Schema(
  {
    temple: { type: mongoose.Schema.Types.ObjectId, ref: "Temple", required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    capacity: { type: Number, required: true, min: 1 },
    availableSeats: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["OPEN", "CLOSED"], default: "OPEN" }
  },
  { timestamps: true }
);

export default mongoose.model("DarshanSlot", darshanSlotSchema);
