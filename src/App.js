import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Sidebar from "./SideBar/SideBar";
import NoteList from "./NoteList/NoteList";
import Note from "./NoteCard/Note";
import NotefulContext from "./NotefulContext";
import AddFolder from "./AddFolder/AddFolder";
import AddNote from "./AddNote/AddNote";
import ErrorBoundary from "./ErrorBoundary";

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    error: null,
    tempFolderName: "",
    tempNoteName: "",
    tempNoteContent: "",
    tempNoteLocation: ""
  };

  setFolders = folders => {
    this.setState({
      folders,
      error: null
    });
  };

  addTempFolder = newFolder => {
    this.setState({ tempFolderName: newFolder });
  };

  addTempNoteName = newName => {
    this.setState({ tempNoteName: newName });
  };

  addTempNoteContent = newContent => {
    this.setState({ tempNoteContent: newContent });
  };

  addTempNoteLocation = folderLocation => {
    this.setState({ tempNoteLocation: folderLocation });
  };

  setNotes = notes => {
    this.setState({
      notes,
      error: null
    });
  };

  addFolder = newFolder => {
    this.setState({ folders: [...this.state.folders, newFolder] });
  };

  addNotes = newNotes => {
    this.setState({ notes: [...this.state.notes, newNotes] });
  };

  fetchApi() {
    const folderUrl = "http://localhost:9090/folders";
    const notesUrl = "http://localhost:9090/notes";
    fetch(folderUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setFolders)
      .catch(error => this.setState({ error }));

    fetch(notesUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setNotes)
      .catch(error => this.setState({ error }));
  }

  handleAddNote = event => {
    event.preventDefault();
    let today = new Date();
    let timeModified =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "T" +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
    const newNoteName = this.state.tempNoteName;
    const newNoteContent = this.state.tempNoteContent;
    const newFolderLocation = this.state.folders.find(
      folder => this.state.tempNoteLocation === folder.name
    ).id;
    const noteUrl = "http://localhost:9090/notes";
    fetch(noteUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: newNoteName,
        modified: timeModified,
        folderId: newFolderLocation,
        content: newNoteContent
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(addNoteName => {
        this.addNotes(addNoteName);
      })
      .catch(error => console.log(error));
    this.setState({
      tempNoteName: "",
      tempNoteContent: "",
      tempNoteLocation: ""
    });
  };

  handleFolderSubmit = event => {
    event.preventDefault();
    const folderName = this.state.tempFolderName;
    console.log(JSON.stringify(folderName));
    const folderUrl = "http://localhost:9090/folders";
    fetch(folderUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ name: folderName })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(folder => {
        this.addFolder(folder);
      })
      .catch(error => console.log(error));
    this.setState({
      tempFolderName: ""
    });
  };

  deleteNote = noteId => {
    const noteUrl = `http://localhost:9090/notes/${noteId}`;
    fetch(noteUrl, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
      })
      .catch(error => this.setState({ error }));
    const filteredNotes = this.state.notes.filter(note => noteId !== note.id);
    this.setState({
      notes: filteredNotes
    });
  };

  componentDidMount() {
    this.fetchApi();
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      handleFolderSubmit: this.handleFolderSubmit,
      handleAddNote: this.handleAddNote,
      addTempFolder: this.addTempFolder,
      addTempNoteName: this.addTempNoteName,
      addTempNoteContent: this.addTempNoteContent,
      addTempNoteLocation: this.addTempNoteLocation
    };
    return (
      <NotefulContext.Provider value={contextValue}>
        <header>
          <Link to="/" className="appTitle">
            <h1>Noteful</h1>
          </Link>
        </header>
        <main className="mainContainer">
          <ErrorBoundary>
            <Sidebar notes={this.state.notes} folders={this.state.folders} />
          </ErrorBoundary>
          <ErrorBoundary>
            <Switch>
              <Route
                exact
                path="/"
                render={({ history, match }) => (
                  <NoteList history={history} match={match} />
                )}
              />
              <Route
                exact
                path="/folder/:id"
                render={({ match, history }) => (
                  <NoteList history={history} match={match} />
                )}
              />
              <Route
                exact
                path="/note/:id"
                render={({ match, history }) => (
                  <Note
                    note={this.state.notes.find(
                      note => note.id === match.params.id
                    )}
                    history={history}
                  />
                )}
              />
              <Route exact path="/addnote" component={AddNote} />
              <Route exact path="/addfolder" component={AddFolder} />
              <Route render={() => <p>There are no notes to display.</p>} />
            </Switch>
          </ErrorBoundary>
        </main>
      </NotefulContext.Provider>
    );
  }
}

export default App;
