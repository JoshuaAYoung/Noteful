import React, { Component } from "react";
import Note from "../NoteCard/Note";
import NotefulContext from "../NotefulContext";

class NoteList extends Component {
  static contextType = NotefulContext;

  // notes = () => {
  //   if (this.props.params.id === "/") {
  //     return this.context.notes.map(note => (
  //       <li className="note" key={note.id}>
  //         <Note note={note} />
  //       </li>
  //     ));
  //   } else {
  //     return this.context.notes
  //       .filter(note => note.folderId === this.props.match.params.id)
  //       .map(note => (
  //         <li className="note" key={note.id}>
  //           <Note note={note} />
  //         </li>
  //       ));
  //   }
  // };
  render() {
    console.log(this.props.match);
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
