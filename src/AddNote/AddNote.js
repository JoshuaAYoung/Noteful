import React, { Component } from "react";
import NotefulContext from "../NotefulContext";
import "./AddNote.css";

export default class AddNote extends Component {
  static contextType = NotefulContext;

  validateField(fieldValue) {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  render() {
    const folders = this.context.folders;
    return (
      <div className="noteFormContainer">
        <h2 className="formTitle">Create Note</h2>
        <form className="form" onSubmit={e => this.context.handleAddNote(e)}>
          <label htmlFor="addNoteName" className="inputLabel">
            Note Name:
          </label>
          <input
            type="text"
            id="addNoteName"
            className="formInput"
            onChange={e => this.context.addTempNoteName(e.target.value)}
          />
          <label htmlFor="folder" className="inputLabel">
            Note Content:
          </label>
          <input
            type="text"
            id="addNoteContent"
            className="formInput"
            onChange={e => this.context.addTempNoteContent(e.target.value)}
          />
          <label htmlFor="noteFolderSelect" className="inputLabel">
            Folder Location:
          </label>
          <select
            id="noteFolderSelect"
            className="dropdown"
            onChange={e => this.context.addTempNoteLocation(e.target.value)}
          >
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
