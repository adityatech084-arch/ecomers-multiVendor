import express from "express";

import venderMiddleware from "../middlewares/venderMiddleware.js";
import { addSubcategory, createCategory, deleteCategory, deleteSubcategory, getCategoriesByVendor, updateCategory, updateSubcategory } from "../controllers/categoryControler.js";
const router = express.Router();

router.post("/create-category",venderMiddleware, createCategory);            
router.get("/categories",venderMiddleware, getCategoriesByVendor); 
router.put("/update/:id",venderMiddleware, updateCategory);           
router.delete("/delete/category/:id",venderMiddleware, deleteCategory);       

// Subcategory routes
router.post("/subcategory",venderMiddleware, addSubcategory);                                
router.put("/update/:categoryId/subcategory/:subcategoryId",venderMiddleware, updateSubcategory);   
router.delete("/delete/:categoryId/subcategory/:subcategoryId",venderMiddleware, deleteSubcategory);



export default router;