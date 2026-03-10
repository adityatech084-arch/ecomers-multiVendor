import express from "express";
import venderMiddleware from "../middlewares/venderMiddleware.js";
import { addProduct, getVendor, login, orders, productbyId, register, verifyOtp } from "../controllers/venderController.js";



const router = express.Router();



router.get("/me",venderMiddleware,getVendor);
router.post("/add-product",venderMiddleware,addProduct);
router.get("/product/:id",venderMiddleware,productbyId);
router.get('/orders',venderMiddleware,orders);
router.post('/verify-otp',verifyOtp);

router.post('/register',register);
router.post('/login',login);









export default router;