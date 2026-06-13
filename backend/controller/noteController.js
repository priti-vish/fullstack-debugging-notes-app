const notes = require("../models/notes")

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required and cannot be empty" })
        }
        if (!content) {
            return res.status(400).json({ message: "Content is required" })
        }

        const note = await notes.create({
            title,
            content
        })
        res.status(201).json(note)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

const getAllNotes = async (req, res) => {
    try {

        const allNotes = await notes.find().sort({ updatedAt: -1 })
        res.status(200).json(allNotes)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getNoteById = async (req, res) => {
    try {

        const id = req.params.id
        const note = await notes.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(note);


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateNote = async (req, res) => {
    try {

        const id = req.params.id
        const { title, content } = req.body

        if (!id) {
            return res.status(400).json({
                message: "Id is required"
            })
        }

        if (!title || !content || title.trim() === "") {
            return res.status(400).json({
                message: "Invalid input"
            })
        }

        const note = await notes.findById(id)

        if(!note){
            return res.status(404).json({
                message: "Note not found"
            })
        }

        const updateNote = await notes.findByIdAndUpdate(id,
            {title, content},
            {new: true}
        )


        res.status(200).json(updateNote)


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteNote = async (req,res) => {
    try{

        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                message: "Id is required"
            })
        }

        const note = await notes.findById(id)

        if(!note){
            return res.status(404).json({
                message: "Note not found"
            })
        }

        const deletedNote = await notes.findByIdAndDelete(id)

        res.status(200).json({ message: "Note deleted successfully!!" })


    }catch (error){
        res.status(500).json({message: error.message})
    }
}

module.exports = { createNote, getAllNotes, getNoteById, updateNote, deleteNote }