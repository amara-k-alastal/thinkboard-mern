import mongoose from "mongoose";

// 1 : creat schema
// 1 : models based off of that schema

const noteSchema = new mongoose.Schema({
    titel:{
        type: String ,
        required : true 
    },
    content:{
        type: String ,
        required : true 
    },
} ,
 {timestamps : true} // createdAt // updatadAt
)

const Note = mongoose.model("Note" , noteSchema)

export default Note;