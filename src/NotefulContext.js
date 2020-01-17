import React from "react";

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  tempFolderName: {
    value: "",
    touched: false
  },
  tempNoteName: {
    value: "",
    touched: false
  },
  tempNoteContent: {
    value: "",
    touched: false
  },
  tempNoteLocation: ""
});

export default NotefulContext;
