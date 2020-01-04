import React, { Component } from "react";
import FolderCard from "../FolderCard/FolderCard";
import { Route, Switch } from "react-router-dom";
import "./SideBar.css";
import NotefulContext from "../NotefulContext";

class Sidebar extends Component {
  static contextType = NotefulContext;

  render() {
    return (
      <>
        <Switch>
          <Route
            path="/note/:id"
            render={routerProps => (
              <>
                <h2>
                  {
                    this.props.folders.find(folder => {
                      const folderId = this.props.notes.find(
                        note => note.id === routerProps.match.params.id
                      ).folderId;
                      return folderId === folder.id;
                    }).name
                  }
                </h2>
                <button onClick={routerProps.history.goBack}>Back</button>
              </>
            )}
          />
          <Route component={FolderCard} />
        </Switch>
      </>
    );
  }
}

export default Sidebar;
