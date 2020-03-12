import React, { Component } from 'react';
import './NoteList.css';
import { Link } from 'react-router-dom';
import NoteContext from '../../NoteContext';

class NoteList extends Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  static contextType = NoteContext;

  formatDate(date) {
    return new Date(date).toLocaleString();
  }

  getNotes() {
    if (this.props.match.params.id) {
      return (
        this.context.notes.filter(
          note => note.folderId === this.props.match.params.id,
        ) || []
      );
    } else {
      return this.context.notes || [];
    }
  }

  render() {
    const notes = this.getNotes();
    const deleteNote = this.context.deleteNote;
    return (
      <ul className="Main note_list">
        <button onClick={() => this.props.history.push('/new-note/')}>
          New Note
        </button>
        {notes.map(note => {
          const date = this.formatDate(note.modified);
          return (
            <li key={note.id}>
              <Link to={`/note-details/${note.id}`}>{note.name}</Link>
              <p>{date}</p>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    );
  }
}
export default NoteList;
