import { Router } from "express";
import { Signup, Login } from "../Controllers/authController.js";


const router = Router();

router.post("/auth/signup", Signup);
router.post("/auth/login", Login);



export default router;