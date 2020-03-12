import React, { Component } from 'react';
import './App.css';
import FolderNav from './Components/FolderNav/FolderNav';
import NoteList from './Components/NoteList/NoteList';
import NoteDetails from './Components/NoteDetails/NoteDetails';
import NoteDetailsNav from './Components/NoteDetailsNav/NoteDetailsNav';
import { Route, Link, Switch } from 'react-router-dom';
import NoteContext from './NoteContext';
import AddFolderForm from './Components/AddFolderForm/AddFolderForm';
import AddNoteForm from './Components/AddNoteForm/AddNoteForm';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

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

    Promise.all([fetch(api_link_folders), fetch(api_link_notes)])
      .then(([folderRes, noteRes]) => {
        if (!folderRes.ok) return folderRes.json().then(e => Promise.reject(e));
        if (!noteRes.ok) return noteRes.json().then(e => Promise.reject(e));

        return Promise.all([folderRes.json(), noteRes.json()]);
      })
      .then(([folders, notes]) => {
        this.setState({ folders, notes });
      })
      .catch(error => console.error(error));
  }

  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder],
    });
  };

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

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
        <ErrorBoundary>
          <NoteContext.Provider value={contextValue}>
            <Route exact path={['/', '/note-list/:id']} component={FolderNav} />
            <Route path="/note-details/:id" component={NoteDetailsNav} />
            <Switch>
              <Route exact path="/" component={NoteList} />
              <Route path="/note-list/:id" component={NoteList} />
              <Route path="/note-details/:id" component={NoteDetails} />
              <Route
                exact
                path="/new-folder/"
                render={({ history }) => (
                  <AddFolderForm
                    history={history}
                    onAddFolder={this.addFolder}
                  />
                )}
              />
              <Route
                exact
                path="/new-note/"
                render={({ history }) => (
                  <AddNoteForm
                    history={history}
                    folders={this.state.folders}
                    onAddNote={this.addNote}
                  />
                )}
              />
              <Route
                path="/"
                render={() => <div className="Main error">404 Not Found</div>}
              />
            </Switch>
          </NoteContext.Provider>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
