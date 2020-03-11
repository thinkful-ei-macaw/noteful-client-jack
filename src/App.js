import React, { Component } from 'react';
import './App.css';
import FolderNav from './Components/FolderNav/FolderNav';
import NoteList from './Components/NoteList/NoteList';
import NoteDetails from './Components/NoteDetails/NoteDetails';
import { Route, Link, Switch } from 'react-router-dom';
import NoteContext from './NoteContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
    };
  }

  componentDidMount() {
    const api_link_folders = 'http://localhost:9090/folders';

    const api_link_notes = 'http://localhost:9090/notes';

    fetch(api_link_folders)
      .then(res => res.json())
      .then(data => this.setState({ folders: data }));

    fetch(api_link_notes)
      .then(res => res.json())
      .then(data => this.setState({ notes: data }));
  }

  setNotes = notes => {
    this.setState({
      notes: notes,
    });
  };

  deleteNote = id => {
    const newNotes = this.state.notes.filter(n => n.id !== id);
    this.setNotes(newNotes);
  };

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
    };

    return (
      <div className="App">
        <header className="App__header">
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <NoteContext.Provider value={contextValue}>
          <Route exact path={['/', '/note-list/:id']} component={FolderNav} />
          <Switch>
            <Route exact path="/" component={NoteList} />
            <Route path="/note-list/:id" component={NoteList} />
            )} />
            <Route path="/note-details/:id" component={NoteDetails} />
            <Route path="/" render={() => <div>404 Not Found</div>} />
          </Switch>
        </NoteContext.Provider>
      </div>
    );
  }
}

export default App;
