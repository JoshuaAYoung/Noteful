import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./Note.css";
import NotefulContext from "../NotefulContext";
import PropTypes from "prop-types";

class Note extends Component {
  static contextType = NotefulContext;

  render() {
    return (
      <>
        <Link to={`/note/${this.props.note.id}`} className="noteTitle">
          <h3>{this.props.note.name}</h3>
        </Link>
        <p className="noteDate">{this.props.note.modified}</p>
        <Link to="/">
          <button
            onClick={() => this.context.deleteNote(this.props.note.id)}
            className="deleteButton"
          >
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

Note.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      modified: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  )
};

export default Note;
