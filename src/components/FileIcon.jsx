import React from 'react';
import { string } from 'prop-types';

const FileIcon = ({ type, name }) => {
  const fileIcon = type === 'file' ? 'fas fa-folder' : 'far fa-file-alt';
  return (
    <div className="file-icon">
      <i className={`${fileIcon}`} />
      <p className="file-name">{name}</p>
    </div>
  );
};

FileIcon.propTypes = {
  type: string.isRequired,
  name: string.isRequired
};

export default FileIcon;
