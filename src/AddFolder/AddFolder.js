import React, { Component } from "react";
import NotefulContext from "../NotefulContext";
import "./AddFolder.css"

class AddFolder extends Component {
  static contextType = NotefulContext;

  render() {
    return (
      <div className="folderFormContainer">
        <h2 className="formTitle">Add a folder</h2>
        <form
          className="form"
          onSubmit={e => this.context.handleFolderSubmit(e)}
        >
          <label htmlFor="folder" className="inputLabel">
            Folder Name:
          </label>
          <input
            type="text"
            className="formInput"
            name="folder"
            id="folder"
            defaultValue=""
          />
          <button type="submit" className="submitButton">
            Add Folder
          </button>
        </form>
      </div>
    );
  }
}

export default AddFolder;
