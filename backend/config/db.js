import mongoose from "mongoose";
let connectDB=async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URL);
         console.log("DB Connected");
         
    } catch (error) {
        console.log(error);
        
    }
}
export default connectDB;