import React, { Component } from "react";
import notefulContext from "../NotefulContext";

export default class AddNote extends Component {
  static contextType = notefulContext;

  render() {
    const folders = this.context.folders;

    return (
      <div>
        <h2>Create Note</h2>

        <form
          className="noteForm"
          onSubmit={e => this.context.handleAddNote(e)}
        >
          <input
            type="text"
            id="addNoteName"
            value={this.props.name}
            //onChange={e => this.context.updateNoteName(e.target.value)}
          >
            Note name
          </input>
          <input
            type="text"
            id="addNoteContent"
            value={this.props.content}
            //onChange={e => this.context.updateNoteContent(e.target.value)}
          >
            Note content
          </input>
          <select
            id="noteFolderSelect"
            value={this.props.folder}
            //onChange={e => this.context.selectFolder(e.target.value)}
          >
            <option value={null}>...</option>
            {folders.map(folder => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
          <button type="submit">Add note</button>
        </form>
      </div>
    );
  }
}
