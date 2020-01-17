import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./FolderCard.css";
import NotefulContext from "../NotefulContext";

class FolderCard extends Component {
  static contextType = NotefulContext;

  render() {
    const folders = this.context.folders.map(folder => (
      <li key={folder.id} className="folderInstance">
        <NavLink to={`/folder/${folder.name}`}>
          <h2 className="folderName">{folder.name}</h2>
        </NavLink>
      </li>
    ));
    return (
      <div className="folderListContainer">
        <ul className="folderList">{folders}</ul>
      </div>
    );
  }
}

export default FolderCard;
