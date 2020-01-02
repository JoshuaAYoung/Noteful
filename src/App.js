import React from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Sidebar from './SideBar/SideBar';
import NoteList from './NoteList/NoteList';
import Note from './NoteCard/Note'
import store from './dummy-store';

class App extends React.Component {
  state = {
    folders: store.folders,
    notes: store.notes
  }

  render() {
    return (
      <>
        <header>
          <Link to='/'>
            <h1>Noteful</h1>
          </Link>
        </header>
        <Sidebar notes={this.state.notes} folders={this.state.folders} />
        <main>
          <Switch>
            <Route exact path='/' render={() => <NoteList notes={this.state.notes} />} />
            <Route exact path='/folder/:id' render={({ match }) => <NoteList notes={this.state.notes.filter(note => note.folderId === match.params.id)} />} />
            <Route exact path='/note/:id' render={({ match }) => <Note note={this.state.notes.find(note => note.id === match.params.id)} />} />
            <Route render={() => <p>There are no notes to display.</p>} />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;