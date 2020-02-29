import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./Note.css";
import NotefulContext from "../NotefulContext";
import PropTypes from "prop-types";

class Note extends Component {
  static contextType = NotefulContext;

  onDelete = () => {
    this.context.deleteNote(this.props.note.id);
  };

  render() {
    return (
      <>
        <Link to={`/note/${this.props.note.id}`} className="noteTitle">
          <h3>{this.props.note.name}</h3>
        </Link>
        <Route
          path="/note/:id"
          render={() => <p className="noteContent">{this.props.note.content}</p>}
        />
        <p className="noteDate">Modified: {new Date(this.props.note.modified).toDateString()}</p>
        <button onClick={this.onDelete} className="deleteButton">
          Delete
        </button>
      </>
    );
  }
}

Note.defaultProps = {
  note: {}
}

Note.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      modified: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  )
};

export default Note;
