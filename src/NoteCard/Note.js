import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./Note.css";
import NotefulContext from "../NotefulContext";

class Note extends Component {
  static contextType = NotefulContext;

  render() {
    return (
      <>
        <Link to={`/note/${this.props.note.id}`}>
          <h3>{this.props.note.name}</h3>
        </Link>
        <p>{this.props.note.modified}</p>
        <Link to="/">
          <button onClick={() => this.context.deleteNote(this.props.note.id)}>
            Delete
          </button>
        </Link>
        <Route
          path="/note/:id"
          render={() => <p>{this.props.note.content}</p>}
        />
      </>
    );
  }
}

export default Note;
