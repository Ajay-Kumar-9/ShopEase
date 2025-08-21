import { Router } from "express";
import { addressDetails } from "../Controllers/adressController.js";

const router = Router();

router.post( "/details", addressDetails);

export default router;
