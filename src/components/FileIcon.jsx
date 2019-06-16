import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

const FileIcon = ({
  type, name, location, url
}) => {
  const fullPath = location || 'all-files';
  const fileIcon = type === 'folder' ? 'fas fa-folder' : 'far fa-file-alt';

  return (
    type === 'folder'
      ? (
        <Link to={`${fullPath}/${url}`} className="file-icon folder">
          <i className={`${fileIcon}`} />
          <p className="file-name" id={url}>{name}</p>
        </Link>
      )
      : (
        <div className="file-icon file">
          <i className={`${fileIcon}`} />
          <p className="file-name" id={url}>{name}</p>
        </div>
      )
  );
};

FileIcon.propTypes = {
  type: string.isRequired,
  name: string.isRequired,
  url: string.isRequired,
  location: string
};

FileIcon.defaultProps = {
  location: 'all-files'
};

export default FileIcon;
