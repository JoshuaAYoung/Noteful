import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./FolderCard.css";
import NotefulContext from "../NotefulContext";

class FolderCard extends Component {
  static contextType = NotefulContext;

  render() {
    const folders = this.context.folders.map(folder => (
      <li key={folder.id} className="folder">
        <NavLink to={`/folder/${folder.id}`}>
          <p>{folder.name}</p>
        </NavLink>
      </li>
    ));
    return (
      <div className="folder-card">
        <ul>{folders}</ul>
      </div>
    );
  }
}

FolderCard.defaultProps = {
  folders: [{ id: "0", name: "empty" }]
};

export default FolderCard;
