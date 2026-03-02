import { createDonation, listUserDonations, listAllDonations } from "../services/donationService.js";

export async function donate(req, res, next) {
  try {
    const d = await createDonation({
      userId: req.user.id,
      templeId: req.body.templeId,
      amount: req.body.amount,
      currency: req.body.currency
    });
    res.status(201).json(d);
  } catch (err) {
    next(err);
  }
}

export async function myDonations(req, res, next) {
  try {
    const items = await listUserDonations(req.user.id);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function all(req, res, next) {
  try {
    const items = await listAllDonations();
    res.json(items);
  } catch (err) {
    next(err);
  }
}
