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
    tempFolderName: {
      value: "",
      touched: false
    },
    tempNoteName: {
      value: "",
      touched: false
    },
    tempNoteContent: "",
    tempNoteLocation: "",
    currentFolder: ""
  };

  setFolders = folders => {
    this.setState({
      folders,
      error: null
    });
  };

  setCurrentFolder = folderName => {
    this.setState({
      currentFolder: folderName
    });
  };

  addTempFolder = newFolder => {
    this.setState({
      tempFolderName: {
        value: newFolder,
        touched: true
      }
    });
  };

  addTempNoteName = newName => {
    this.setState({
      tempNoteName: {
        value: newName,
        touched: true
      }
    });
  };

  addTempNoteContent = newContent => {
    this.setState({
      tempNoteContent: newContent
    });
  };

  addTempNoteLocation = folderName => {
    this.setState({ tempNoteLocation: folderName });
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

  addNote = newNote => {
    this.setState({ notes: [...this.state.notes, newNote] });
  };

  fetchApi() {
    const folderUrl = "http://localhost:8000/api/folders";
    const notesUrl = "http://localhost:8000/api/notes";
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

  getFolderId = (e, name) => {
    e.preventDefault();
    return this.state.folders.find(folder => name === folder.name).id;
  };

  getTempFolderId = () => {
    if (this.state.tempNoteLocation.length > 0) {
      const newFolderId = this.state.folders.find(
        folder => folder.name === this.state.tempNoteLocation
      ).id;
      return newFolderId;
    } else {
      return "";
    }
  };

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
    const newNoteName = this.state.tempNoteName.value;
    const newNoteContent = this.state.tempNoteContent;
    const newFolderId = parseInt(this.getTempFolderId());
    const noteUrl = "http://localhost:8000/api/notes";
    fetch(noteUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: newNoteName,
        modified: timeModified,
        folderid: newFolderId,
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
        this.addNote(addNoteName);
      })
      .catch(error => console.log(error));
    this.setState({
      tempNoteName: {
        value: "",
        touched: false
      },
      tempNoteContent: "",
      tempNoteLocation: ""
    });
  };

  handleAddFolder = event => {
    event.preventDefault();
    const folderName = this.state.tempFolderName.value;
    const folderUrl = "http://localhost:8000/api/folders";
    return fetch(folderUrl, {
      method: "POST",
      headers: {
        // Accept: "application/json",
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
  };

  deleteNote = noteId => {
    const noteUrl = `http://localhost:8000/api/notes/${noteId}`;
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
      handleAddFolder: this.handleAddFolder,
      handleAddNote: this.handleAddNote,
      addTempFolder: this.addTempFolder,
      addTempNoteName: this.addTempNoteName,
      addTempNoteContent: this.addTempNoteContent,
      addTempNoteLocation: this.addTempNoteLocation,
      tempFolderName: this.state.tempFolderName,
      tempNoteName: this.state.tempNoteName,
      tempNoteLocation: this.state.tempNoteLocation,
      getFolderId: this.getFolderId,
      setCurrentFolder: this.setCurrentFolder
    };
    return (
      <NotefulContext.Provider value={contextValue}>
        <header className="headerContainer">
          <Link to="/" className="appTitle">
            <h1>Noteful</h1>
          </Link>
        </header>
        <main className="mainContainer">
          <ErrorBoundary>
            <Route
              path="/"
              render={({ match }) => (
                <Sidebar
                  notes={this.state.notes}
                  folders={this.state.folders}
                  match={match}
                />
              )}
            />
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
                path="/folder/:name"
                render={({ match, history }) => (
                  <NoteList history={history} match={match} />
                )}
              />
              <Route
                exact
                path="/note/:id"
                render={({ match, history }) => (
                  <div className="noteContentContainer">
                    <Note
                      note={this.state.notes.find(
                        note => note.id === match.params.id
                      )}
                      history={history}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/addnote"
                render={({ history }) => <AddNote history={history} />}
              />
              <Route
                exact
                path="/addfolder"
                render={({ history }) => <AddFolder history={history} />}
              />
              <Route render={() => <p>There are no notes to display.</p>} />
            </Switch>
          </ErrorBoundary>
        </main>
      </NotefulContext.Provider>
    );
  }
}

export default App;
