import React, { Component } from "react";
import NotefulContext from "../NotefulContext";

export default class AddNote extends Component {
  static contextType = NotefulContext;

  render() {
    const folders = this.context.folders;
    return (
      <div className="noteFormContainer">
        <h2 className="formTitle">Create Note</h2>
        <form className="form" onSubmit={e => this.context.handleAddNote(e)}>
          <label htmlFor="addNoteName" className="inputLabel">
            Note name
          </label>
          <input type="text" id="addNoteName" className="formInput" />
          <label htmlFor="folder" className="inputLabel">
            Note content
          </label>
          <input type="text" id="addNoteContent" className="formInput" />
          <select id="noteFolderSelect" className="dropdown">
            <option value={null}>...</option>
            {folders.map(folder => (
              <option key={folder.id}>{folder.name}</option>
            ))}
          </select>
          <button type="submit" className="submitButton">
            Add note
          </button>
        </form>
      </div>
    );
  }
}
