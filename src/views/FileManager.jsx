import React, { Component } from 'react';
import { string, shape, func } from 'prop-types';
import { AES } from 'crypto-js';
import FileList from '../components/FileList';
import DashboardHeader from '../components/DashboardHeader';

class FileManager extends Component {
    state = {
      directory: {},
      modalIsOpen: { status: false, mode: '' },
      fileType: '',
      dashboardTitle: 'All files',
      folderExists: true
    }

    componentWillMount() {
      const { location: path } = this.props;
      if (!localStorage.getItem('all-files')) {
        localStorage.setItem('all-files', JSON.stringify({ folders: [], files: [] }));
      }
      this.fetchFiles(path);
    }

    shouldComponentUpdate(nextProps) {
      const { location: prevPath } = this.props;
      const { location: nextPath } = nextProps;
      if (prevPath !== nextPath) {
        this.fetchFiles(nextPath);
      }
      return true;
    }

    updateDashboardTitle = (path) => {
      const directoryLength = path.split('/').length;
      const childDirectory = path.split('/').pop() || 'all-files';
      const parentDirectory = path.split('/')[directoryLength - 2] || 'all-files';
      const directory = JSON.parse(localStorage.getItem(parentDirectory));
      const folderName = directory.folders.filter(folder => folder.url === childDirectory);
      return folderName;
    }

    handleFileNameInput = (event) => {
      this.setState({ [event.target.id]: event.target.value });
    }

    openCreateFileModal = (event) => {
      if (event.target) {
        const fileType = event.target.id;
        this.setState({ fileType, modalIsOpen: { status: true, mode: 'Create' } });
      }
    }

    handleEditFile = (event) => {
      const fileType = event.target.id;
      const fileId = event.target.attributes['data-file-id'].value;
      this.setState({ fileId, fileType, modalIsOpen: { status: true, mode: 'Edit' } });
    }

    handleDeleteFile = (event) => {
      const fileType = event.target.id;
      const fileId = event.target.attributes['data-file-id'].value;
      this.setState({ fileId, fileType, modalIsOpen: { status: true, mode: 'Delete' } });
    }

    createNewFile = (event) => {
      event.preventDefault();
      const { 'file-name': fileName, fileType } = this.state;
      const { location } = this.props;

      const modifiedDate = this.formatDate(new Date());

      const path = !location.split('/').pop() ? 'all-files' : location.split('/').pop();
      const newDirectory = { files: [], folders: [] };
      let encryptedPath = AES.encrypt('url', fileName).toString();
      encryptedPath = encryptedPath.replace(/[^A-z0-9]/g, '').toLowerCase().substr(0, 25);

      const folder = JSON.parse(localStorage.getItem(path)) || newDirectory;
      folder[`${fileType}s`].push({ name: fileName, url: encryptedPath, date: modifiedDate });
      localStorage.setItem(path, JSON.stringify(folder));

      this.closeModal();
      this.setState({ directory: folder });
      event.target.reset();
    }

    editFile = (event) => {
      event.preventDefault();
      const { location } = this.props;
      const path = !location.split('/').pop() ? 'all-files' : location.split('/').pop();
      const { 'file-name': fileName, fileId, fileType } = this.state;
      const directory = JSON.parse(localStorage.getItem(path));
      const fileIndex = directory[`${fileType}s`].findIndex(file => file.url === fileId);
      directory[`${fileType}s`][fileIndex] = Object.assign(
        directory[`${fileType}s`][fileIndex], { name: fileName }
      );
      localStorage.setItem(path, JSON.stringify(directory));
      this.closeModal();
      this.setState({ directory });
      event.target.reset();
    }

    closeModal = () => {
      const { modalIsOpen } = this.state;
      this.setState(Object.assign(modalIsOpen, { status: false }));
    }

    formatDate = (date) => {
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        month: 'long', year: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
      }).format(date);

      return formattedDate;
    }

    deleteFile = () => {
      const { location } = this.props;
      const { fileId, fileType } = this.state;
      const path = !location.split('/').pop() ? 'all-files' : location.split('/').pop();
      const directory = JSON.parse(localStorage.getItem(path));
      const fileIndex = directory[`${fileType}s`].findIndex(file => file.url === fileId);
      directory[`${fileType}s`].splice(fileIndex, 1);
      localStorage.setItem(path, JSON.stringify(directory));
      localStorage.removeItem(fileId);
      this.closeModal();
      this.setState({ directory });
    }

    fetchFiles = (path) => {
      const directory = path.split('/').pop() || 'all-files';
      const directoryObj = { files: [], folders: [] };
      const files = JSON.parse(localStorage.getItem(directory)) || directoryObj;
      const title = this.updateDashboardTitle(path);
      const dashboardTitle = title.length ? title[0].name : 'All files';
      this.setState({ directory: files, dashboardTitle, folderExists: true });
      if (directory !== 'all-files' && !title.length) {
        this.setState({ folderExists: false });
      }
    }

    render() {
      const {
        directory, modalIsOpen: { status, mode }, fileType, dashboardTitle, folderExists
      } = this.state;
      const { location, history } = this.props;
      const folders = directory && directory.folders.map(folder => (
        <FileList
          key={folder.url}
          type="folder"
          name={folder.name}
          modifiedDate=". . ."
          location={location === '/' ? 'all-files' : location}
          url={folder.url}
          openEditMode={this.handleEditFile}
          openDeleteModal={this.handleDeleteFile}
        />
      ));
      const files = directory && directory.files.map(file => (
        <FileList
          key={file.url}
          type="file"
          name={file.name}
          modifiedDate={file.date}
          url={file.url}
          openEditMode={this.handleEditFile}
          openDeleteModal={this.handleDeleteFile}
        />
      ));

      return (
        <main className="file-manager">
          <div className={`file-listing ${status ? 'modal-open' : ''}`}>
            <DashboardHeader
              history={history}
              title={dashboardTitle}
              openCreateFileModal={this.openCreateFileModal}
              folderExists={!folderExists}
            />
            {folders}
            {files}
            {
                (folderExists && !files.length && !folders.length)
                && <h2 className="empty-folder">This folder is empty</h2>
            }
            {!folderExists && <h2 className="empty-folder">Sorry, could not find the specified folder </h2>}
          </div>
          {(mode !== 'Delete') && (
          <div className={`modal create-file ${status ? 'modal-open' : ''}`}>
            <form onSubmit={mode === 'Create' ? this.createNewFile : this.editFile}>
              <div className="form-group">
                <input type="text" name="file-name" id="file-name" required onChange={this.handleFileNameInput} />
                <label htmlFor="file-name">
                  {`${mode === 'Edit' ? mode : 'Enter'} ${fileType} name`}
                </label>
              </div>
              <div className="btn-group">
                <button className="btn" type="submit">
                  {`${mode} ${fileType} ${mode === 'Edit' ? 'name' : ''}`}
                </button>
                <button className="btn cancel" type="button" onClick={this.closeModal}>Cancel</button>
              </div>
            </form>
          </div>
          )}
          {(mode === 'Delete') && (
          <div className={`modal delete ${status ? 'modal-open' : ''}`}>
            <div>
              <p className="message">
                {`Are you sure you want to delete this ${fileType} ?`}
              </p>
            </div>
            <div className="btn-group">
              <button className="btn" type="button" onClick={this.closeModal}>Cancel</button>
              <button className="btn delete" type="button" onClick={this.deleteFile}>
                  Delete
              </button>
            </div>
          </div>
          )}
        </main>
      );
    }
}

FileManager.propTypes = {
  location: string.isRequired,
  history: shape({
    goBack: func.isRequired
  }).isRequired
};

export default FileManager;
