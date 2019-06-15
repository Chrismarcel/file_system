import React, { Component } from 'react';
import { string, func } from 'prop-types';
import slugify from 'slugify';
import { Link } from 'react-router-dom';

class DashboardHeader extends Component {
    state = {
      expanded: false
    }

    myRef = React.createRef();

    componentDidMount() {
      document.addEventListener('mousedown', this.collapseDropdown);
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.collapseDropdown);
    }

    expandDropdown = () => {
      this.setState({ expanded: true });
    }

    collapseDropdown = (event) => {
      if (!this.myRef.current.contains(event.target)) {
        this.setState({ expanded: false });
      }
    }

    render() {
      const { title, createFileModal, toggleDisplay } = this.props;
      const { expanded } = this.state;
      const slug = slugify(title, { lower: true });

      return (
        <header className="dashboard-header">
          <Link to={slug} className="back-btn">
            <i className="fas fa-long-arrow-alt-left" />
          </Link>
          <h2 className="folder-name">{title}</h2>
          <div className="create-file">
            <button ref={this.myRef} type="button" className="dropdown-btn" onClick={this.expandDropdown}>
              <i className="fas fa-plus" />
              Create file / folder
            </button>
            <ul className={`create-options ${expanded && 'dropdown-shown'}`}>
              <li role="presentation" id="file" onClick={createFileModal}>Create File</li>
              <li role="presentation" id="folder" onClick={createFileModal}>Create Folder</li>
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
  createFileModal: func.isRequired,
  toggleDisplay: func.isRequired
};

export default DashboardHeader;