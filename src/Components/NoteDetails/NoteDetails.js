import React, { Component } from 'react';
import './NoteDetails.css';
import NoteDetailsNav from '../NoteDetailsNav/NoteDetailsNav';
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

  render() {
    const note = this.context.notes.find(
      n => n.id === this.props.match.params.id,
    );
    const { folderId, name, content, modified } = note;
    const dateModified = new Date(modified).toLocaleString();
    const folder = this.context.folders.find(f => f.id === folderId);

    return (
      <>
        <NoteDetailsNav folder={folder} />
        <section className="Main">
          <div className="Main__note_header">
            <h3>{name}</h3>
            <p>{dateModified}</p>
            <button
              onClick={() =>
                this.handleDeleteNote(note.id, this.context.deleteNote)
              }
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
