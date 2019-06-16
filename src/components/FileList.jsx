import React from 'react';
import { string, func } from 'prop-types';
import FileIcon from './FileIcon';

const FileList = ({
  type, name, modifiedDate, location, url, openEditMode, openDeleteModal
}) => (
  <div className="file-list">
    <FileIcon type={type} name={name} url={url} location={location} />
    <span className="modified-date">{modifiedDate}</span>
    <div className="file-actions">
      <button type="button" className="edit" onClick={openEditMode}>
        <i className="far fa-edit" id={type} data-file-id={url} />
      </button>
      <button type="button" className="delete" onClick={openDeleteModal}>
        <i className="far fa-trash-alt" id={type} data-file-id={url} />
      </button>
    </div>
  </div>
);

FileList.propTypes = {
  type: string.isRequired,
  name: string.isRequired,
  modifiedDate: string.isRequired,
  location: string,
  url: string.isRequired,
  openEditMode: func.isRequired,
  openDeleteModal: func.isRequired
};

FileList.defaultProps = {
  location: 'all-files'
};

export default FileList;
