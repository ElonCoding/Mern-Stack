import Booking from "../models/Booking.js";
import DarshanSlot from "../models/DarshanSlot.js";

export async function createBooking({ userId, templeId, slotId }) {
  const slot = await DarshanSlot.findById(slotId);
  if (!slot || slot.status !== "OPEN") {
    const err = new Error("Slot not available");
    err.status = 400;
    throw err;
  }
  if (slot.availableSeats <= 0) {
    const err = new Error("No seats available");
    err.status = 400;
    throw err;
  }
  const existing = await Booking.findOne({ user: userId, slot: slotId });
  if (existing) {
    const err = new Error("Already booked");
    err.status = 400;
    throw err;
  }
  const booking = await Booking.create({
    user: userId,
    temple: templeId,
    slot: slotId,
    status: "CONFIRMED"
  });
  slot.availableSeats -= 1;
  await slot.save();
  return booking;
}

export function listUserBookings(userId) {
  return Booking.find({ user: userId }).populate("temple slot").sort({ createdAt: -1 });
}

export async function cancelBooking(bookingId, userId) {
  const booking = await Booking.findOne({ _id: bookingId, user: userId });
  if (!booking) {
    const err = new Error("Booking not found");
    err.status = 404;
    throw err;
  }
  if (booking.status === "CANCELLED") return booking;
  booking.status = "CANCELLED";
  await booking.save();
  const slot = await DarshanSlot.findById(booking.slot);
  if (slot && slot.availableSeats < slot.capacity) {
    slot.availableSeats += 1;
    await slot.save();
  }
  return booking;
}

export function listAllBookings() {
  return Booking.find().populate("user temple slot").sort({ createdAt: -1 });
}
