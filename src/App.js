import React, { useState, useEffect } from 'react';
import './App.css';
import { getAllNotes, deleteNote } from './api';
import { NoteList, NoteForm } from './components';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getAllNotes.then(res => setNotes(res))
  }, []);

  function handleRemove(e, id) {
    e.preventDefault();
    deleteNote(id).then(res => res)
    const newNotesArray = notes.filter(note => note.ref.id !== id)
    setNotes(newNotesArray)
    toast.success('Removed successfully')
  }

  return (
    <div className="App">
      <ToastContainer autoClose={5000} limit={1} />
      <header className="App-container">
        <div className="notes-container">
        <NoteForm notes={notes} setNotes={setNotes} />
        <NoteList 
            onRemove={handleRemove} 
            data={notes}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
