import React, { useState } from 'react';
import Card from './card';


const Board = () => {
  const [notes, setNotes] = useState([
    { id: 1, text: 'New Sticky Note 1', x: 50, y: 50, pinned: false },
    { id: 2, text: 'New Sticky Note 2', x: 100, y: 100, pinned: false },
    { id: 3, text: 'New Sticky Note 3', x: 150, y: 150, pinned: false },
  ]);

  const addNote = (e) => {
    const newNote = {
      id: notes.length + 1,
      text: `New Sticky Note ${notes.length+1}`,
      x: Math.random() * 100,
      y: Math.random() * 100, 
      pinned: false,
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const editNote = (id,editedText) => {
    const updatedNotes = notes.map((note) =>{
      return note.id === id ? { ...note, text: editedText } : note }
    );
    setNotes(updatedNotes);
  };

  const pinNote = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    setNotes(updatedNotes);
  };

  const handleDrag = (id, x, y) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        if (note.pinned) {
          return { ...note, x: note.x, y: note.y };
        }
        const isOverlapping = notes.some(
          (otherNote) =>
            otherNote.id !== id &&
            ((otherNote.pinned && x < otherNote.x + 50 && x + 50 > otherNote.x &&
            y < otherNote.y + 50 && y + 50 > otherNote.y) ||
            (!otherNote.pinned && x < otherNote.x + 50 && x + 50 > otherNote.x &&
            y < otherNote.y + 50 && y + 50 > otherNote.y))
        );
        return {
          ...note,
          x: isOverlapping ? note.x : x,
          y: isOverlapping ? note.y : y,
        };
      }

      return note;
    })

    setNotes(updatedNotes);
  }

  return (
    <>
     <h1 className='heading salsa-regular'>Bulletin-Board-Notes</h1>
  
    <div className="board">
       
      {notes.map((note) => (
        <Card
          key={note.id}
          id={note.id}
          text={note.text}
          x={note.x}
          y={note.y}
          pinned={note.pinned}
          onDelete={deleteNote}
          onEdit={editNote}
          onPin={pinNote}
          onDrag={handleDrag}
        />
      ))}
      <img src='/plus.png' className="add-button"  onClick={addNote} alt='Add-Note'/>
      
    </div>
    </>
  );
};

export default Board;
