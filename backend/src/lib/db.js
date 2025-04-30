import mongoose from "mongoose";
function connectDB(){
    return mongoose.connect(process.env.MONGO_URI)
}
export default connectDB;