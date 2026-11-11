import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import { useEffect  } from 'react';
import axios from "axios"
import toast from "react-hot-toast";
import NoteCard from '../components/NoteCard.jsx';
import api from '../lib/axios.js';
import NotesNotFound from '../components/NotesNotFound.jsx'

const HomePage = () => {

  const [isratelimited , setIsRateLimited] = useState(false);
  const [notes , SetNote] = useState([])
  const [loading , Setloading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async () => {
      try{
        // const res = await axios.get("http://localhost:5001/api/notes")  // fetch === axios
        const res = await api.get("/notes")
        console.log(res.data)
        SetNote(res.data)
        setIsRateLimited(false)
      }catch(error){
        console.log("Error Fetching Notes")
        if(error.response.status === 429){
          setIsRateLimited(true)
        }else{
          toast.error("FALID TO IMPORT DATA")
        }
      } finally{
        Setloading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />

      {isratelimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading notes...
          </div>
        )}

        {notes.length === 0 && !loading && !isratelimited && <NotesNotFound />}

        {!loading && !isratelimited && notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} SetNote={SetNote}/>
            ))}
          </div>
        )}
      </div>
    </div>
)}

export default HomePage