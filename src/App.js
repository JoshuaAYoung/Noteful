import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import SideBar from "./SideBar/SideBar.js";
import NoteList from "./NoteList/NoteList.js";
import STORE from "./dummy-store.js";

class App extends Component {
  state = {
    folders: STORE.folders,
    notes: STORE.notes,
    page: "",
    selectedFolderId: "",
    selectedNoteId: ""
  };

  render() {
    const otherFolders = this.state.folders.map((folderData, idx) => (
      <Route
        path={"/folder" + idx + 1}
        render={() => (
          <NoteList
            notes={this.state.notes.filter(note => note.id === folderData.id)}
          />
        )}
      />
    ));

    console.log(this.state.folders);
    return (
      <div>
        <header className="header">
          <h1>
            <Link to={"/"}>Noteful</Link>
          </h1>
        </header>
        <nav className="sideBar">
          <SideBar folders={this.state.folders} />
        </nav>
        <main className="noteList">
          <Route
            path="/"
            render={() => <NoteList notes={this.state.notes} />}
          />
          {otherFolders}
        </main>
      </div>
    );
  }
}

export default App;
