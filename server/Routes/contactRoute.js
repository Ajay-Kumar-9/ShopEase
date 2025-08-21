import { Router } from "express";
import { createContact } from "../Controllers/ContactController.js";

const router = Router();

router.post("/contact", createContact);

export default router;
