import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError';

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

  handleSubmit(e) {
    e.preventDefault();
    console.log('Form submitted');
    console.log(this.state);
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

  validateDesc(desc) {}

  validateFolder(folder) {}

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
        <label htmlFor="folder"></label>
        <select
          htmlFor="folder"
          onChange={e => this.updateFolder(e.target.value)}
        >
          <option>Select a folder..</option>
          {this.props.folders.map(folder => (
            <option value={folder.name} key={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <input type="submit" />
      </form>
    );
  }
}
export default AddNoteForm;
