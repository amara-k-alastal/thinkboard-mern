import express from "express"
import { getAllNotes , createNote , updateNode , deleteNode , getNoteById} from "../controllers/notesControllers.js";

const router = express.Router()

// router.get("/", (req , res)=>{
//     res.status(200).send("you just fetch the note")
// })

router.get( "/", getAllNotes)
router.get( "/:id", getNoteById)
router.post("/" , createNote )
router.put("/:id" , updateNode)
router.delete("/:id" , deleteNode)

export default router;
