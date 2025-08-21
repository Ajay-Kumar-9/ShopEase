import { Router } from "express";
import { updateProfile } from "../Controllers/updateUserController.js";

const router = Router();

router.patch("/update-profile", updateProfile);

export default router;
