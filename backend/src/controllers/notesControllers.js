import Note from "../models/Note.js"


export async function getAllNotes  (req , res){
    try{
        const notes = await Note.find().sort({createdAt : -1})  // newest first 
        res.status(200).json(notes)
    }catch(error){
        console.error("Error in getALLnOTES Controller" , error)
        res.status(500).json({message : "Internal server error"})
    }
}
export async function getNoteById  (req , res){
    try{
        const _id = req.params.id
        const note = await  Note.findById(_id)

        if (!note) {
            return res.status(404).json({message: "Note not found"});
        }

        res.status(200).json(note)

    }catch (error) {
        console.error("Error in getNoteById Controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function createNote  (req , res){
    try{
        const {titel , content} = req.body
        const newNode = new Note({titel , content})

        await newNode.save()
        res.status(201).json(newNode)
    }catch(error){
        console.error("Error in createNote Controller" , error)
        res.status(500).json({message : "Internal server error"})
    }
}

export async function updateNode(req, res) {
  try {
    const { titel, content } = req.body;
    const _id = req.params.id;

    const note = await Note.findByIdAndUpdate(
      _id,
      { titel , content },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({message: "Note not found"});
    }

    res.status(200).json(note);

  } catch (error) {
    console.error("Error in updateNode Controller", error);
    res.status(500).json({message: "Internal server error"});
  }
}


export async function deleteNode(req , res){
    try{
        const _id = req.params.id
        const note = await  Note.findByIdAndDelete(_id)

        if (!note) {
            return res.status(404).json({message: "Note not found"});
        }

        res.status(200).json({message : "note is deleted sucssesfully!"});

    }catch (error) {
        console.error("Error in deleteNode Controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}