import React, { Component } from "react";
import FolderCard from "../FolderCard/FolderCard";
import { Route, Switch, Link } from "react-router-dom";
import "./SideBar.css";
import ErrorBoundary from "../ErrorBoundary";
import PropTypes from "prop-types";

class Sidebar extends Component {
  render() {
    return (
      <>
        <Switch>
          <ErrorBoundary>
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
          </ErrorBoundary>
          <ErrorBoundary>
            <Route component={FolderCard} />
          </ErrorBoundary>
        </Switch>
        <Link to="/addfolder">+</Link>
      </>
    );
  }
}

Sidebar.propTypes = {
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

Sidebar.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      modified: PropTypes.string.isRequired,
      folderId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  )
};

export default Sidebar;
