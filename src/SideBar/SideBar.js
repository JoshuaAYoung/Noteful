import React, { Component } from "react";
import "./SideBar.css";
import FolderCard from "../FolderCard/FolderCard.js";

class SideBar extends Component {
  render() {
    const noteCards = this.props.folders.map(folderData => (
      <FolderCard folderName={folderData.name} key={folderData.id} />
    ));
    return (
      <div>
        <li>{noteCards}</li>
        <div className="addFolder">Add Folder</div>
      </div>
    );
  }
}

export default SideBar;
