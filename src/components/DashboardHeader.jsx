import React, { Component } from 'react';
import {
  string, func, shape, bool
} from 'prop-types';
import { Link } from 'react-router-dom';

class DashboardHeader extends Component {
    state = {
      expanded: false
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.collapseDropdown);
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.collapseDropdown);
    }

    expandDropdown = (event) => {
      if (event.target.className.includes('btn')) {
        this.setState({ expanded: true });
      }
    }

    goBack = () => {
      const { history } = this.props;
      history.goBack();
    }

    collapseDropdown = (event) => {
      const { openCreateFileModal } = this.props;
      if (event.path[1].className.includes('create-options')) {
        openCreateFileModal();
      }

      if (!event.target.className.includes('btn')) {
        this.setState({ expanded: false });
      }
    }

    render() {
      const {
        title, openCreateFileModal, toggleDisplay, folderExists
      } = this.props;
      const { expanded } = this.state;

      return (
        <header className="dashboard-header">
          <Link to="../" className="back-btn" onClick={this.goBack}>
            <i className="fas fa-long-arrow-alt-left" />
          </Link>
          <h2 className="folder-name">{title}</h2>
          <div className="create-file">
            <button disabled={folderExists} type="button" className="btn dropdown-btn" onClick={this.expandDropdown}>
              <i className="fas fa-plus" />
              Create file / folder
            </button>
            <ul className={`create-options ${expanded ? 'dropdown-shown' : ''}`}>
              <li role="presentation" id="file" onClick={openCreateFileModal}>Create File</li>
              <li role="presentation" id="folder" onClick={openCreateFileModal}>Create Folder</li>
            </ul>
          </div>
          <div className="display-type">
            <button type="button" id="list" className="list-btn" onClick={toggleDisplay}>
              <i className="fas fa-list" />
            </button>
            <button type="button" id="grid" className="grid-btn" onClick={toggleDisplay}>
              <i className="fas fa-th" />
            </button>
          </div>
        </header>
      );
    }
}

DashboardHeader.propTypes = {
  title: string.isRequired,
  openCreateFileModal: func.isRequired,
  toggleDisplay: func.isRequired,
  folderExists: bool.isRequired,
  history: shape({
    goBack: func.isRequired
  }).isRequired
};

export default DashboardHeader;
