import mongoose from "mongoose";



const dbconnect = async()=>{
    await mongoose.connect(process.env.DB_URL);
    console.log("db-connected")
}


export default dbconnect;