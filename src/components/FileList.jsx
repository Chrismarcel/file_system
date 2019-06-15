import React from 'react';
import { string } from 'prop-types';
import FileIcon from './FileIcon';

const FileList = ({ type, name, modifiedDate }) => (
  <div className="file-list">
    <FileIcon type={type} name={name} />
    <span className="modified-date">{modifiedDate}</span>
    <div className="file-actions">
      <button type="button" className="edit">
        <i className="far fa-edit" />
      </button>
      <button type="button" className="delete">
        <i className="far fa-trash-alt" />
      </button>
    </div>
  </div>
);

FileList.propTypes = {
  type: string.isRequired,
  name: string.isRequired,
  modifiedDate: string.isRequired
};

export default FileList;
