
import express from "express";
import cors from "cors";
const app = express();
import userRouter from "./routes/user.route.js";
import venderRouter from "./routes/vender.route.js";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: false,     // do not save files to disk
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max per file
  })
);

app.use("/api/v1/auth/user",userRouter);
app.use("/api/v1/auth/vendor",venderRouter)

app.use("/api/v1/product",productRouter);
app.use("/api/v1/auth/cart",cartRouter)
app.use("/api/v1/vendor/category",categoryRouter)




export default app; 