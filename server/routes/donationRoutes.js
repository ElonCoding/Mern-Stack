import { Router } from "express";
import { auth, authorize } from "../middleware/auth.js";
import { donate, myDonations, all } from "../controllers/donationController.js";

const router = Router();

router.post("/", auth, donate);
router.get("/me", auth, myDonations);
router.get("/", auth, authorize(["ADMIN"]), all);

export default router;
