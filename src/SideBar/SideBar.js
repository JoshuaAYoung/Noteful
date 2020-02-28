import React, { Component } from "react";
import FolderCard from "../FolderCard/FolderCard";
import { Route, Switch, Link } from "react-router-dom";
import "./SideBar.css";
import ErrorBoundary from "../ErrorBoundary";
import PropTypes from "prop-types";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <ErrorBoundary>
          <Link to="/addfolder" className="addButton">
            + Add a folder
          </Link>
        </ErrorBoundary>
        <ErrorBoundary>
          <Switch>
            <Route
              path="/note/:id"
              render={routerProps => (
                <>
                  <h2 className="noteContent">
                    {
                      // finds folder from props(state) where...
                      this.props.folders.find(folder => {
                        // ...the folderid variable here that equals...
                        const folderId = this.props.notes.find(
                          // ...the folderid value from the props(state) notes object equals the match params (path) id
                          note => note.id === parseInt(routerProps.match.params.id)
                        ).folderid;
                        return folderId === folder.id;
                      }).name
                    }
                  </h2>
                  <button
                    className="backButton"
                    onClick={routerProps.history.goBack}
                  >
                    Back
                  </button>
                </>
              )}
            />
            <Route
              component={FolderCard}
            />
          </Switch>
        </ErrorBoundary>
      </div>
    );
  }
}

Sidebar.propTypes = {
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

Sidebar.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      modified: PropTypes.string.isRequired,
      folderid: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired
    })
  )
};

export default Sidebar;
