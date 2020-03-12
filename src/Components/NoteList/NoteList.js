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

  state = {
    error: false,
  };

  static contextType = NoteContext;

  handleDeleteNote = (id, callback) => {
    fetch(`http://localhost:9090/notes/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(() => {
        callback(id);
        this.setState({ error: false });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

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
        <li>
          <button
            className="Main__new_button"
            onClick={() => this.props.history.push('/new-note/')}
          >
            New Note
          </button>
          {this.state.error && (
            <p>There was an error deleting the note, please try again later.</p>
          )}
        </li>
        {notes.map(note => {
          const date = this.formatDate(note.modified);
          return (
            <li key={note.id}>
              <Link to={`/note-details/${note.id}`}>{note.name}</Link>
              <p>{date}</p>
              <button
                onClick={() => this.handleDeleteNote(note.id, deleteNote)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
export default NoteList;
