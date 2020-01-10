import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "../NoteCard/Note";
import NotefulContext from "../NotefulContext";
import ErrorBoundary from "../ErrorBoundary";
import PropTypes from "prop-types";

class NoteList extends Component {
  static contextType = NotefulContext;

  render() {
    return (
      <>
        <ul>
          {this.props.match.path === "/"
            ? this.context.notes.map(note => (
                <ErrorBoundary key={note.id}>
                  <li className="note" key={note.id}>
                    <Note note={note} />
                  </li>
                </ErrorBoundary>
              ))
            : this.context.notes
                .filter(note => note.folderId === this.props.match.params.id)
                .map(note => (
                  <ErrorBoundary key={note.id}>
                    <li className="note" key={note.id}>
                      <Note note={note} />
                    </li>
                  </ErrorBoundary>
                ))}
        </ul>
        <Link to="/addnote">+</Link>
      </>
    );
  }
}

// NoteList.propTypes = {
//   notes: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       modified: PropTypes.string.isRequired
//     })
//   ).isRequired
// };

export default NoteList;
