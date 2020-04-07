import React, { Component } from 'react';
import './FolderNav.css';
import { NavLink } from 'react-router-dom';
import NoteContext from '../../NoteContext';

class FolderNav extends Component {
  static contextType = NoteContext;
  render() {
    const folders = this.context.folders || [];
    return (
      <nav className="Sidebar">
        <button
          className="Sidebar__new"
          onClick={() => this.props.history.push('/new-folder/')}
        >
          New Folder
        </button>
        <ul>
          {folders.map((folder) => {
            return (
              <li key={folder.id}>
                <NavLink
                  to={`/note-list/${folder.id}`}
                  activeClassName="Sidebar__selected"
                >
                  {folder.name}
                </NavLink>
              </li>
            );
          })}
          <li></li>
        </ul>
      </nav>
    );
  }
}
export default FolderNav;
