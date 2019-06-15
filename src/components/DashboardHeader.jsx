import React from 'react';
import { string } from 'prop-types';
import slugify from 'slugify';
import { Link } from 'react-router-dom';

const DashboardHeader = ({ title }) => {
  const slug = slugify(title, { lower: true });
  return (
    <header className="dashboard-header">
      <Link to={slug} className="back-btn">
        <i className="fas fa-long-arrow-alt-left" />
      </Link>
      <h2 className="folder-name">{title}</h2>
      <div className="create-file">
        <button type="button" className="dropdown">
          <i className="fas fa-plus" />
          Create file / folder
        </button>
        <ul className="create-options">
          <li>Create File</li>
          <li>Create Folder</li>
        </ul>
      </div>
      <div className="display-type">
        <button type="button" className="list-btn">
          <i className="fas fa-list" />
        </button>
        <button type="button" className="grid-btn">
          <i className="fas fa-th" />
        </button>
      </div>
    </header>
  );
};

DashboardHeader.propTypes = {
  title: string.isRequired
};

export default DashboardHeader;
