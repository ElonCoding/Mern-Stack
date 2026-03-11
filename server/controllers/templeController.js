import { listTemples, getTemple, createTemple, updateTemple, deleteTemple } from "../services/templeService.js";

export async function list(req, res, next) {
  try {
    const items = await listTemples(req.query);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function detail(req, res, next) {
  try {
    const item = await getTemple(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const item = await createTemple(req.body, req.user.id);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const item = await updateTemple(req.params.id, req.body);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const item = await deleteTemple(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
