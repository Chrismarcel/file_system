import React, { Component } from 'react';
import { string, shape, func } from 'prop-types';
import { AES } from 'crypto-js';
import FileList from '../components/FileList';
import DashboardHeader from '../components/DashboardHeader';

class FileManager extends Component {
    state = {
      directory: {},
      fileModalIsOpen: { status: false, mode: '' },
      fileType: '',
      dashboardTitle: 'All files',
      folderExists: true
    }

    componentWillMount() {
      const { location: path } = this.props;
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
        this.setState({ fileType, fileModalIsOpen: { status: true, mode: 'Create' } });
      }
    }

    handleEditFile = (event) => {
      const fileType = event.target.id;
      const fileId = event.target.attributes['data-file-id'].value;
      this.setState({ fileId, fileType, fileModalIsOpen: { status: true, mode: 'Edit' } });
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

      this.closeCreateFileModal();
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
      this.closeCreateFileModal();
      this.setState({ directory });
      event.target.reset();
    }

    closeCreateFileModal = () => {
      const { fileModalIsOpen } = this.state;
      this.setState(Object.assign(fileModalIsOpen, { status: false }));
    }

    formatDate = (date) => {
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        month: 'long', year: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
      }).format(date);

      return formattedDate;
    }

    fetchFiles(path) {
      const directory = path.split('/').pop() || 'all-files';
      const directoryObj = { files: [], folders: [] };
      const files = JSON.parse(localStorage.getItem(directory)) || directoryObj;
      const title = this.updateDashboardTitle(path);
      const dashboardTitle = title.length ? title[0].name : 'All files';
      this.setState({ directory: files, dashboardTitle, folderExists: true });
      if (!title.length && !files.folders.length) {
        this.setState({ folderExists: false });
      }
    }

    deleteFile(event) {
      const fileId = event.target.id;
      const { location } = this.props;
      const path = !location.split('/').pop() ? 'all-files' : location.split('/').pop();
    }

    render() {
      const {
        directory, fileModalIsOpen: { status, mode }, fileType, dashboardTitle, folderExists
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
          <div className={`create-file-modal ${status ? 'modal-open' : ''}`}>
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
                <button className="btn cancel" type="button" onClick={this.closeCreateFileModal}>Cancel</button>
              </div>
            </form>
          </div>
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
