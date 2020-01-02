import React from 'react';
import FolderCard from '../FolderCard/FolderCard'
import { Route, Switch } from 'react-router-dom';
import './SideBar.css';

function Sidebar(props) {
  return (
    <>
      <Switch>
        <Route path='/note/:id' render={(routerProps) => (
          <>
            <h2>{props.folders.find(folder => {
              const folderId = props.notes.find(note => note.id === routerProps.match.params.id).folderId;
              return folderId === folder.id;
            }).name
            }</h2> 
            <button onClick={routerProps.history.goBack}>Back</button>
          </>)} />
        <Route render={() => <FolderCard folders={props.folders} />} />
      </Switch>
    </>
  );
}

export default Sidebar;
