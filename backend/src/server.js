import express from "express"
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middelware/rateLimiter.js"
import cors from "cors" // CORS بنحتاجه عشان نخلي الـFrontend والـBackend يتواصلوا بشكل صحيح عبر المتصفح لما يكونوا على مصادر مختلفة.
import path from "path"


dotenv.config();  // هادي اشي مهم جدا لاستدعاء المتغيرات اللي استخدمها ف .env 

const app = express()

const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

// connectDB()

// middelware : 
if(process.env.NDDE_ENV !== "production"){
    app.use(cors({   //«اسمح لواجهة React الموجودة على localhost:5173 إنها تقرأ ردودي.»
        origin: "http://localhost:5173",
    }))
}
app.use(express.json())  

app.use(rateLimiter)


app.use( (req , res , next)=>{
    console.log(`we just got a new req : ${req.method}`)
    next()
})

app.use("/api/notes" , notesRoutes)  // بدل م اضل اكتبها ف مل راوت 

if(process.env.NDDE_ENV === "production"){
    app.use(express.static(path.join(__dirname , "../frontend/dist")))
    app.get("*" , (req , res) =>{
        res.sendFile(path.join(__dirname , "../frontend" , "dist" , "index.html"))
    })
}


// app.listen( 5001  , ()=>{
//     console.log("server started on PORT : " , PORT)
// })

////////////////////////////////////

// server started on PORT :  5001
// mongoDB connected succssesfulle! 

// نشوف نوع جديد من الفلسفه انوا قال لازم اتصل ف قاعده البيانات بعدين يشتغل البورت ف هنشغل البورت اللي هو لسن جوا الداتا بيس 

connectDB().then ( ()=>{
    app.listen( 5001  , ()=>{
        console.log("server started on PORT : " , PORT)
    })
})

// mongoDB connected succssesfulle!        وبس 
// server started on PORT :  5001