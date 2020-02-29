import React, { Component } from "react";
import FolderCard from "../FolderCard/FolderCard";
import { Route, Switch, Link } from "react-router-dom";
import "./SideBar.css";
import ErrorBoundary from "../ErrorBoundary";
import PropTypes from "prop-types";

class Sidebar extends Component {

  findFolder = (routerProps) => {
    const folder = this.props.folders.find(folder => {
      const folderFound = this.props.notes.find(
        note => {
          return note.id === parseInt(routerProps.match.params.id)
        }
      );
      console.log("inside function", folder)
      return folderFound ? folderFound.folderid === folder.id : this.props.history.push("/");
    })
    console.log("folder and props folder", folder, this.props.folders);
    return folder ? folder.name : "";
  }
  render() {
    console.log(this.props.notes, this.props.folders)
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
                  <h2 className="folderTitle">
                    {this.findFolder(routerProps)}
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
