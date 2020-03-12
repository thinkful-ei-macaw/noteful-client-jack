import React, { Component } from 'react';
import './NoteDetails.css';
import NoteContext from '../../NoteContext';

class NoteDetails extends Component {
  static contextType = NoteContext;

  handleDeleteNote = (id, callback) => {
    fetch(`http://localhost:9090/notes/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        this.props.history.push('/');
        callback(id);
      })
      .catch(err => console.log(err));
  };

  formatDate(date) {
    return new Date(date).toLocaleString();
  }

  getCurrentNote() {
    const notes = this.context.notes || [];
    return notes.length
      ? notes.find(n => n.id === this.props.match.params.id)
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
            <h2>{name}</h2>
            <p>{dateModified}</p>
            <button
              onClick={() => this.handleDeleteNote(id, this.context.deleteNote)}
            >
              Delete
            </button>
          </div>
          <p className="Main__note_details">{content}</p>
        </section>
      </>
    );
  }
}
export default NoteDetails;
