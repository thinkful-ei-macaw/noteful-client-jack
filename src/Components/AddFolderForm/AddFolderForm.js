import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError';

class AddFolderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: {
        value: '',
        touched: false,
      },
    };
  }

  handleNewFolderSubmit(event) {
    event.preventDefault();
    const folderName = this.state.folder.value;
    const folder = {
      name: folderName.trim(),
    };
    fetch('http://localhost:9090/folders/', {
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        this.props.onAddFolder(data);
        this.props.history.goBack();
      });
  }

  updateFolderName(name) {
    this.setState({
      folder: {
        value: name,
        touched: true,
      },
    });
  }

  validateFolderName() {
    const folderName = this.state.folder.value.trim();
    if (folderName.length === 0) {
      return 'Folder name is required!';
    } else if (folderName.length < 3) {
      return 'Name must be at least 3 characters long!';
    }
  }

  render() {
    return (
      <form className="Main" onSubmit={e => this.handleNewFolderSubmit(e)}>
        <label htmlFor="folder">Folder Name:</label>
        <input
          type="text"
          name="folder"
          id="folder"
          value={this.state.folder.value}
          onChange={e => this.updateFolderName(e.target.value)}
        />
        {this.state.folder.touched && (
          <ValidationError message={this.validateFolderName()} />
        )}
        <input type="submit" disabled={this.validateFolderName()} />
      </form>
    );
  }
}
export default AddFolderForm;
