import React, { Component } from "react";
import NotefulContext from "../NotefulContext";

export default class AddNote extends Component {
  static contextType = NotefulContext;

  render() {
    const folders = this.context.folders;
    return (
      <div>
        <h2>Create Note</h2>
        <form
          className="noteForm"
          onSubmit={e => this.context.handleAddNote(e)}
        >
          <label htmlFor="addNoteName">Note name</label>
          <input type="text" id="addNoteName" />
          <label htmlFor="folder">Note content</label>
          <input type="text" id="addNoteContent" />
          <select id="noteFolderSelect">
            <option value={null}>...</option>
            {folders.map(folder => (
              <option key={folder.id}>{folder.name}</option>
            ))}
          </select>
          <button type="submit">Add note</button>
        </form>
      </div>
    );
  }
}
