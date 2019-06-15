import React, { Component } from 'react';
import { string } from 'prop-types';
import FileList from '../components/FileList';
import DashboardHeader from '../components/DashboardHeader';

class FileManager extends Component {
    state = {
      directory: {},
      createFileModalShown: false,
      fileType: ''
    }

    componentWillMount() {
      const { location: path } = this.props;
      this.fetchFiles(path);
    }

    shouldComponentUpdate(nextProps) {
      const { location: prevPath } = this.props;
      const { location: nextPath } = nextProps;
      if (prevPath !== nextPath) { this.fetchFiles(nextPath); }
      return true;
    }

    handleFileNameInput = (event) => {
      this.setState({ [event.target.id]: event.target.value });
    }

    openCreateFileModal = (event) => {
      if (event.target) {
        const fileType = event.target.id;
        this.setState({ fileType });
        this.setState({ createFileModalShown: true });
      }
    }

    createNewFile = (event) => {
      event.preventDefault();
      const { 'file-name': fileName, fileType } = this.state;
      const { location } = this.props;

      const modifiedDate = new Intl.DateTimeFormat('en-GB', {
        month: 'long', year: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
      }).format(new Date());

      const directory = !location.split('/').pop() ? 'all-files' : location.split('/').pop();
      const folder = JSON.parse(localStorage.getItem(directory)) || { files: [], folders: [] };
      folder[`${fileType}s`].push({ name: fileName, date: modifiedDate });
      localStorage.setItem(directory, JSON.stringify(folder));

      this.closeCreateFileModal();
      this.setState({ directory: folder });
    }

    closeCreateFileModal = () => {
      this.setState({ createFileModalShown: false });
    }

    fetchFiles(path) {
      const directory = path.split('/').pop() || 'all-files';
      const files = JSON.parse(localStorage.getItem(directory)) || { files: [], folders: [] };
      this.setState({ directory: files });
    }

    render() {
      const { directory, createFileModalShown, fileType } = this.state;
      const { location } = this.props;
      const folders = directory.folders.map((folder, id) => {
        const uniqueKey = id;
        return (
          <FileList
            key={uniqueKey + 1}
            type="folder"
            name={folder.name}
            modifiedDate=". . ."
            location={location}
          />
        );
      });
      const files = directory.files.map((file, id) => {
        const uniqueKey = id;
        return <FileList key={uniqueKey + 1} type="file" name={file.name} modifiedDate={file.date} />;
      });
      return (
        <main className="file-manager">
          <div className={`file-listing ${createFileModalShown ? 'modal-open' : ''}`}>
            <DashboardHeader title="All files" openCreateFileModal={this.openCreateFileModal} />
            {folders}
            {files}
            {(!files.length && !folders.length) && <h2 className="empty-folder">This folder is empty</h2>}
          </div>
          <div className={`create-file-modal ${createFileModalShown ? 'modal-open' : ''}`}>
            <form onSubmit={this.createNewFile}>
              <div className="form-group">
                <input type="text" name="file-name" id="file-name" required onChange={this.handleFileNameInput} />
                <label htmlFor="file-name">{`Enter ${fileType} name`}</label>
              </div>
              <div className="btn-group">
                <button className="btn" type="submit">Create</button>
                <button className="btn cancel" type="button" onClick={this.closeCreateFileModal}>Cancel</button>
              </div>
            </form>
          </div>
        </main>
      );
    }
}

FileManager.propTypes = {
  location: string.isRequired
};

export default FileManager;
