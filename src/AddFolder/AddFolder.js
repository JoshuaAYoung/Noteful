import React, { Component } from "react";
import NotefulContext from "../NotefulContext";

class AddFolder extends Component {
  static contextType = NotefulContext;

  render() {
    return (
      <div>
        <h1>Add a folder</h1>
        <form
          className="folderForm"
          onSubmit={e => this.context.handleFolderSubmit(e)}
        >
          <label htmlFor="folder">Name</label>
          <input
            type="text"
            className="folderInput"
            name="folder"
            id="folder"
          />
          <button type="submit">Add Folder</button>
        </form>
      </div>
    );
  }
}

export default AddFolder;
