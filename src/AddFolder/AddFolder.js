import React, { Component } from "react";
import NotefulContext from "../NotefulContext";
import "./AddFolder.css";
import ValidationError from "../ValidationError";

class AddFolder extends Component {
  static contextType = NotefulContext;

  onSubmit = e => {
    this.context.handleFolderSubmit(e);
    this.props.history.push(`/folder/${this.context.tempFolderName.value}`);
  };

  validateName() {
    const name = this.context.tempFolderName.value;
    if (name.length === 0) {
      return "Please enter a name for your folder";
    }
  }

  render() {
    const nameError = this.validateName();
    return (
      <div className="folderFormContainer">
        <h2 className="formTitle">Add a folder</h2>
        <form className="form" onSubmit={e => this.onSubmit(e)}>
          <label htmlFor="folder" className="inputLabel">
            Folder Name:
          </label>
          <input
            type="text"
            className="formInput"
            name="folder"
            id="folder"
            defaultValue=""
            onChange={e => this.context.addTempFolder(e.target.value)}
          />
          <div className="error">
            {this.context.tempFolderName.touched && (
              <ValidationError message={nameError} />
            )}
          </div>
          <button
            type="submit"
            className="submitButton"
            disabled={this.validateName()}
          >
            Add Folder
          </button>
        </form>
      </div>
    );
  }
}

export default AddFolder;
