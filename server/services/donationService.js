import Donation from "../models/Donation.js";

export function createDonation({ userId, templeId, amount, currency = "INR" }) {
  return Donation.create({ user: userId, temple: templeId, amount, currency });
}

export function listUserDonations(userId) {
  return Donation.find({ user: userId }).populate("temple").sort({ createdAt: -1 });
}

export function listAllDonations() {
  return Donation.find().populate("user temple").sort({ createdAt: -1 });
}
