import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError';
import PropTypes from 'prop-types';
import './AddFolderForm.css';
import api_config from '../../api-config';

class AddFolderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: {
        value: '',
        touched: false
      }
    };
  }

  handleNewFolderSubmit(event) {
    event.preventDefault();
    const folderName = this.state.folder.value;
    const folder = {
      name: folderName.trim()
    };
    fetch(api_config.folders, {
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then((data) => {
        this.props.onAddFolder(data);
        this.props.history.goBack();
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  updateFolderName(name) {
    this.setState({
      folder: {
        value: name,
        touched: true
      }
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
      <form className="Main" onSubmit={(e) => this.handleNewFolderSubmit(e)}>
        <label htmlFor="folder">Folder Name:</label>
        <input
          type="text"
          name="folder"
          id="folder"
          value={this.state.folder.value}
          onChange={(e) => this.updateFolderName(e.target.value)}
        />
        {this.state.folder.touched && (
          <ValidationError message={this.validateFolderName()} />
        )}
        <input type="submit" disabled={this.validateFolderName()} />
        {this.state.error && (
          <p>There was an error adding the folder, please try again later.</p>
        )}
      </form>
    );
  }
}

AddFolderForm.propTypes = {
  onAddFolder: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default AddFolderForm;
