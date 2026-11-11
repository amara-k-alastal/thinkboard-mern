import mongoose from "mongoose"

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoDB connected succssesfulle!")

    }catch(e){
        console.error("Error connecting to MONGODB" , e )
        process.exit(1);
    }
}