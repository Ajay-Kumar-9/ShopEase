//sales route
import { Router } from "express";
import { handler, specificProduct , searchProduct } from "../Controllers/Sales.Controller.js";

const router = Router();
router.get("/sales", handler);
router.post("/product", specificProduct);
router.get('/search' , searchProduct);

export default router;

