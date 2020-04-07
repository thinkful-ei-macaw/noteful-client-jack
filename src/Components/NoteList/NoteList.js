import React, { Component } from 'react';
import './NoteList.css';
import { Link } from 'react-router-dom';
import NoteContext from '../../NoteContext';
import api_config from '../../api-config';

class NoteList extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };

  state = {
    error: false
  };

  static contextType = NoteContext;

  handleDeleteNote = (id, callback) => {
    fetch(`${api_config.notes}/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res;
      })
      .then(() => {
        callback(id);
        this.setState({ error: false });
      })
      .catch((error) => {
        console.log(error);
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
          (note) => note.folder_id === +this.props.match.params.id
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
      <>
        {this.state.error && (
          <p>There was an error deleting the note, please try again later.</p>
        )}
        <button
          className="Main__new_button"
          onClick={() => this.props.history.push('/new-note/')}
        >
          New Note
        </button>
        <ul className="Main note_list">
          {notes.map((note) => {
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
      </>
    );
  }
}
export default NoteList;
