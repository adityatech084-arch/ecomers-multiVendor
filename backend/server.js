import app from "./app.js";
import http from "http";
import dotenv from "dotenv";
import dbconnect from "./config/dbconnect.js";
dotenv.config();
const server = http.createServer(app);


dbconnect().catch((err)=>console.log(err));
server.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port " + (process.env.PORT || 5000));
});

