import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

const FileIcon = ({ type, name, location }) => {
  const fullPath = location || 'all-files';
  const fileIcon = type === 'folder' ? 'fas fa-folder' : 'far fa-file-alt';
  const slug = slugify(name, { lower: true });

  return (
    type === 'folder'
      ? (
        <Link to={`${fullPath}/${slug}`} className="file-icon folder">
          <i className={`${fileIcon}`} />
          <p className="file-name">{name}</p>
        </Link>
      )
      : (
        <div className="file-icon file">
          <i className={`${fileIcon}`} />
          <p className="file-name">{name}</p>
        </div>
      )
  );
};

FileIcon.propTypes = {
  type: string.isRequired,
  name: string.isRequired,
  location: string.isRequired
};

export default FileIcon;
