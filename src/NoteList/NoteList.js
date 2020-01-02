import React from 'react';
import Note from '../NoteCard/Note';


function NoteList(props) {
  const notes = props.notes.map(note => <li className='note' key={note.id}><Note note={note} /></li>);
  return (
    <>
      <ul>
        {notes}
      </ul>
    </>
  );
}

export default NoteList;