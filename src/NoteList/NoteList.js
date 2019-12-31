import React, { Component } from "react";

import "./NoteList.css";
import NoteCard from "../NoteCard/NoteCard.js";

class NoteList extends Component {
  render() {
    return (
      <li>
        {this.props.notes.map(noteCard => (
          <NoteCard
            key={noteCard.id}
            details={noteCard.content}
            name={noteCard.name}
            date={noteCard.modified}
          />
        ))}
      </li>
    );
  }
}

export default NoteList;
