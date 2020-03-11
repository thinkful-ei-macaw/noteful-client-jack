import React, { Component } from 'react';
import './NoteList.css';
import { Link } from 'react-router-dom';
import NoteContext from '../../NoteContext';

class NoteList extends Component {
  formatDate(date) {
    return new Date(date).toLocaleString();
  }
  static contextType = NoteContext;

  getNotes() {
    if (this.props.match.params.id) {
      return this.context.notes.filter(
        note => note.folderId === this.props.match.params.id,
      );
    } else {
      return this.context.notes;
    }
  }

  render() {
    const notes = this.getNotes();
    const deleteNote = this.context.deleteNote;
    return (
      <ul className="Main note_list">
        {notes.map(note => {
          const date = this.formatDate(note.modified);
          return (
            <li key={note.id}>
              <h2>
                <Link to={`/note-details/${note.id}`}>{note.name}</Link>
              </h2>
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
