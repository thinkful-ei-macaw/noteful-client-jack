import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError';
import PropTypes from 'prop-types';

class AddNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: {
        value: '',
        touched: false,
      },
      desc: {
        value: '',
        touched: false,
      },
      folder: {
        value: null,
        touched: false,
      },
    };
  }

  getFolderId = folderName => {
    const currentFolder = this.props.folders.find(
      folder => folder.name === folderName,
    );
    return currentFolder.id;
  };

  handleSubmit(e) {
    e.preventDefault();
    const noteTitle = this.state.title.value;
    const noteDesc = this.state.desc.value;
    const noteFolderId = this.getFolderId(this.state.folder.value);
    const note = {
      name: noteTitle,
      modified: Date.now(),
      folderId: noteFolderId,
      content: noteDesc,
    };
    console.log(noteFolderId);
    fetch('http://localhost:9090/notes/', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        this.props.onAddNote(data);
        this.props.history.goBack();
      });
  }

  updateTitle(title) {
    this.setState({
      title: {
        value: title,
        touched: true,
      },
    });
  }

  updateDesc(desc) {
    this.setState({
      desc: {
        value: desc,
        touched: true,
      },
    });
  }

  updateFolder(folder) {
    this.setState({
      folder: {
        value: folder,
        touched: true,
      },
    });
  }

  validateTitle() {
    const noteName = this.state.title.value.trim();
    if (noteName.length === 0) {
      return 'Note name is required!';
    } else if (noteName.length < 3) {
      return 'Note title must be at least 3 characters long!';
    }
  }

  validateDesc() {
    const currentDesc = this.state.desc.value.trim();
    if (currentDesc.length === 0) {
      return 'Please enter a description';
    }
  }

  validateFolder() {
    const currentFolder = this.state.folder.value;
    if (currentFolder === 'default') {
      return 'Please choose a folder for this note.';
    }
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={e => this.updateTitle(e.target.value)}
        />
        {this.state.title.touched && (
          <ValidationError message={this.validateTitle()} />
        )}
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="desc"
          id="desc"
          onChange={e => this.updateDesc(e.target.value)}
        />
        {this.state.desc.touched && (
          <ValidationError message={this.validateDesc()} />
        )}
        <label htmlFor="folder"></label>
        <select
          htmlFor="folder"
          onChange={e => this.updateFolder(e.target.value)}
        >
          <option value="default">Select a folder..</option>
          {this.props.folders.map(folder => (
            <option value={folder.name} key={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        {this.state.folder.touched && (
          <ValidationError message={this.validateFolder()} />
        )}
        <input
          type="submit"
          disabled={
            this.validateTitle() || this.validateDesc() || this.validateFolder()
          }
        />
      </form>
    );
  }
}

AddNoteForm.propTypes = {
  onAddNote: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
};

export default AddNoteForm;
