import React, { Component } from "react";
import "./NoteCard.css";
import NoteDetails from "../NoteDetails/NoteDetails.js";

class NoteCard extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <p>{this.props.date}</p>
      </div>
    );
  }
}

export default NoteCard;
