import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

const FileIcon = ({ type, name }) => {
  const fileIcon = type === 'folder' ? 'fas fa-folder' : 'far fa-file-alt';
  const slug = slugify(name, { lower: true });

  return (
    <Link to={slug} className="file-icon">
      <i className={`${fileIcon}`} />
      <p className="file-name">{name}</p>
    </Link>
  );
};

FileIcon.propTypes = {
  type: string.isRequired,
  name: string.isRequired
};

export default FileIcon;
