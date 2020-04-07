import React, { Component } from 'react';
import './NoteDetailsNav.css';
import NoteContext from '../../NoteContext';
import './NoteDetailsNav.css';

class NoteDetailsNav extends Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  };

  static contextType = NoteContext;

  findCurrentNote(notes, id) {
    return notes ? notes.find((note) => +note.id === +id) : {};
  }

  findCurrentFolder(folders, id) {
    return folders ? folders.find((folder) => +folder.id === +id) : {};
  }

  render() {
    const { notes, folders } = this.context;
    const currentNoteId = this.props.match.params.id;
    const note = this.findCurrentNote(notes, currentNoteId);
    const currentFolder = this.findCurrentFolder(folders, note.folder_id);

    return (
      <div className="Sidebar">
        <button onClick={this.props.history.goBack}>Go Back</button>
        {currentFolder && (
          <h2 className="Sidebar__nav_folder">{currentFolder.name}</h2>
        )}
      </div>
    );
  }
}
export default NoteDetailsNav;
