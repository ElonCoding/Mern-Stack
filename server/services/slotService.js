import DarshanSlot from "../models/DarshanSlot.js";

export function listSlotsByTemple(templeId) {
  return DarshanSlot.find({ temple: templeId }).sort({ date: 1, startTime: 1 });
}

export function createSlot(data) {
  const availableSeats = data.availableSeats ?? data.capacity;
  return DarshanSlot.create({ ...data, availableSeats });
}

export function updateSlot(id, data) {
  return DarshanSlot.findByIdAndUpdate(id, data, { new: true });
}

export function deleteSlot(id) {
  return DarshanSlot.findByIdAndDelete(id);
}

export async function adjustAvailability(slotId, delta) {
  const slot = await DarshanSlot.findById(slotId);
  if (!slot) {
    const err = new Error("Slot not found");
    err.status = 404;
    throw err;
  }
  const next = slot.availableSeats + delta;
  if (next < 0 || next > slot.capacity) {
    const err = new Error("Invalid availability update");
    err.status = 400;
    throw err;
  }
  slot.availableSeats = next;
  await slot.save();
  return slot;
}
