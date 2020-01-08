import React, { Component } from "react";
import Note from "../NoteCard/Note";
import NotefulContext from "../NotefulContext";

class NoteList extends Component {
  static contextType = NotefulContext;

  render() {
    return (
      <>
        <ul>
          {this.props.match.path === "/"
            ? this.context.notes.map(note => (
                <li className="note" key={note.id}>
                  <Note note={note} />
                </li>
              ))
            : this.context.notes
                .filter(note => note.folderId === this.props.match.params.id)
                .map(note => (
                  <li className="note" key={note.id}>
                    <Note note={note} />
                  </li>
                ))}
        </ul>
      </>
    );
  }
}

export default NoteList;
