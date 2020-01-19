import React, { Component } from "react";
import NotefulContext from "../NotefulContext";
import "./AddNote.css";
import ValidationError from "../ValidationError";

export default class AddNote extends Component {
  static contextType = NotefulContext;

  onSubmit = e => {
    this.context.handleAddNote(e);
    if (this.context.tempNoteLocation.length > 0) {
      this.props.history.push(`/folder/${this.context.tempNoteLocation}`);
    } else {
      this.props.history.push("/");
    }
  };

  validateName() {
    const name = this.context.tempNoteName.value;
    if (name.length === 0) {
      return "Please enter a name for your note";
    }
  }

  render() {
    const nameError = this.validateName();
    const folders = this.context.folders;
    return (
      <div className="noteFormContainer">
        <h2 className="formTitle">Create Note</h2>
        <form className="form" onSubmit={e => this.onSubmit(e)}>
          <label htmlFor="addNoteName" className="inputLabel">
            Note Name:
          </label>
          <input
            type="text"
            id="addNoteName"
            className="formInput"
            onChange={e => this.context.addTempNoteName(e.target.value)}
            placeholder="required"
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
            <option value="">...</option>
            {folders.map(folder => (
              <option key={folder.id}>{folder.name}</option>
            ))}
          </select>
          <div className="error">
            {this.context.tempNoteName.touched && (
              <ValidationError message={nameError} />
            )}
          </div>
          <button
            type="submit"
            className="submitButton"
            disabled={this.validateName()}
          >
            Add note
          </button>
        </form>
      </div>
    );
  }
}
