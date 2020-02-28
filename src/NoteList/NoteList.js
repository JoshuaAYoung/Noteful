import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "../NoteCard/Note";
import NotefulContext from "../NotefulContext";
import ErrorBoundary from "../ErrorBoundary";
import "./NoteList.css";

class NoteList extends Component {
  static contextType = NotefulContext;

  render() {
    return (
      <div className="noteListContainer">
        <Link to="/addnote" className="addButton noteButton">
          + Add a note
        </Link>
        <ul className="noteList">
          {this.props.match.path === "/"
            ? this.context.notes.map(note => (
                <ErrorBoundary key={note.id}>
                  <li className="noteInstance" key={note.id}>
                    <Note note={note} history={this.props.history} />
                  </li>
                </ErrorBoundary>
              ))
            : this.context.notes
                .filter(
                  note =>
                    note.folderid ===
                    this.context.folders.find(
                      folder => this.props.match.params.name === folder.name
                    ).id
                )
                .map(note => (
                  <ErrorBoundary key={note.id}>
                    <li className="noteInstance" key={note.id}>
                      <Note note={note} history={this.props.history} />
                    </li>
                  </ErrorBoundary>
                ))}
        </ul>
      </div>
    );
  }
}

export default NoteList;
