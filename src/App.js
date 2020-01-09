import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Sidebar from "./SideBar/SideBar";
import NoteList from "./NoteList/NoteList";
import Note from "./NoteCard/Note";
import NotefulContext from "./NotefulContext";
import AddFolder from "./AddFolder/AddFolder";
import AddNote from "./AddNote/AddNote";

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    error: null
  };

  setFolders = folders => {
    this.setState({
      folders,
      error: null
    });
  };

  addFolder = newFolder => {
    this.setState(
      {folders: [...this.state.folders, newFolder]}
    )
  }

  setNotes = notes => {
    this.setState({
      notes,
      error: null
    });
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

  handleAddNote(event) {
    event.preventDefault();
    const newNoteName = event.target.addNoteName.value;
    const noteUrl = `http://localhost:9000/notes/${newNoteName}`;
    fetch(noteUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      }

    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
      })
      .catch(error => console.log(error));
    // .catch(error => this.setState({error}));

  }

  handleFolderSubmit = event => {
    event.preventDefault();
    const folderName = event.target.folder.value;
    console.log(JSON.stringify(folderName));
    const folderUrl = `http://localhost:9090/folders`;
    fetch(folderUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({name: folderName})
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
          //console.log(".res.ok");
      return res.json();
        
      })

      .then(folder => {this.addFolder(folder)})

      .catch(error => console.log(error));

      //.catch(error => this.setState({error}));
      
  }

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
      handleFolderSubmit: this.handleFolderSubmit
    };
    return (
      <NotefulContext.Provider value={contextValue}>
        <header>
          <Link to="/" className="header">
            <h1>Noteful</h1>
          </Link>
        </header>
        <Sidebar notes={this.state.notes} folders={this.state.folders} />
        <main>
          <Switch>
            <Route exact path="/" component={NoteList} />} />
            <Route
              exact
              path="/folder/:id"
              render={({ match }) => <NoteList match={match} />}
            />
            <Route
              exact
              path="/note/:id"
              render={({ match }) => (
                <Note
                  note={this.state.notes.find(
                    note => note.id === match.params.id
                  )}
                />
              )}
            />
            <Route exact path="/addnote" component={AddNote} />
            <Route exact path="/addfolder" component={AddFolder} />
            <Route render={() => <p>There are no notes to display.</p>} />
          </Switch>
        </main>
      </NotefulContext.Provider>
    );
  }
}

export default App;
