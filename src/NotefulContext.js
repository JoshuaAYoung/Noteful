import React from "react";

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  tempFolderName: "",
  tempNoteName: "",
  tempNoteContent: "",
  tempNoteLocation: ""
});

export default NotefulContext;
