import Temple from "../models/Temple.js";

export function listTemples(query = {}) {
  const q = {};
  if (query.search) {
    q.$or = [
      { name: new RegExp(query.search, "i") },
      { location: new RegExp(query.search, "i") },
      { deity: new RegExp(query.search, "i") }
    ];
  }
  return Temple.find(q).sort({ createdAt: -1 });
}

export function getTemple(id) {
  return Temple.findById(id);
}

export function createTemple(data, userId) {
  return Temple.create({ ...data, createdBy: userId });
}

export function updateTemple(id, data) {
  return Temple.findByIdAndUpdate(id, data, { new: true });
}

export function deleteTemple(id) {
  return Temple.findByIdAndDelete(id);
}
