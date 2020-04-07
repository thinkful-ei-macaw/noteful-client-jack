import React, { Component } from 'react';
import './NoteDetails.css';
import NoteContext from '../../NoteContext';
import api_config from '../../api-config';

class NoteDetails extends Component {
  state = { error: false };

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
        this.props.history.push('/');
        callback(id);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  formatDate(date) {
    return new Date(date).toLocaleString();
  }

  getCurrentNote() {
    const notes = this.context.notes || [];
    return notes.length
      ? notes.find((n) => +n.id === +this.props.match.params.id)
      : [];
  }

  render() {
    const currentNote = this.getCurrentNote();
    const { id, name, content, modified } = currentNote || {};
    const dateModified = this.formatDate(modified);

    return (
      <>
        <section className="Main">
          <div className="Main__note_header">
            <h3>{name}</h3>
            <p>{dateModified}</p>
            <button
              onClick={() =>
                this.handleDeleteNote(+id, this.context.deleteNote)
              }
            >
              Delete
            </button>
            {this.state.error && (
              <p>
                There was an error deleting the note, please try again later.
              </p>
            )}
          </div>
          <p className="Main__note_details">{content}</p>
        </section>
      </>
    );
  }
}
export default NoteDetails;
