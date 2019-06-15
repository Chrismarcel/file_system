import React, { Component } from 'react';
import { string } from 'prop-types';
import FileList from '../components/FileList';
import DashboardHeader from '../components/DashboardHeader';

class FileManager extends Component {
    state = {
      files: [],
      createFileModalShown: false
    }

    componentWillMount() {
      const { location } = this.props;
      const directory = location.split('/').pop();
      const files = localStorage.getItem(directory);
      this.setState({ files });
    }

    openCreateFileModal = () => {
      this.setState({ createFileModalShown: true });
    }

    createNewFile = (event) => {
      event.preventDefault();
      this.closeCreateFileModal();
    }

    closeCreateFileModal = () => {
      this.setState({ createFileModalShown: false });
    }

    render() {
      const { files, createFileModalShown } = this.state;
      return (
        <main className="file-manager">
          <div className={`file-listing ${createFileModalShown ? 'modal-open' : ''}`}>
            <DashboardHeader title="All files" openCreateFileModal={this.openCreateFileModal} />
            <FileList type="file" name="File 1" modifiedDate=". . ." />
            <FileList type="file" name="File 2" modifiedDate=". . ." />
            <FileList type="file" name="File 3" modifiedDate=". . ." />
            <FileList type="file" name="File 1" modifiedDate=". . ." />
            <FileList type="file" name="File 2" modifiedDate=". . ." />
            <FileList type="file" name="File 3" modifiedDate=". . ." />
            <FileList type="file" name="File 1" modifiedDate=". . ." />
            <FileList type="file" name="File 2" modifiedDate=". . ." />
            <FileList type="file" name="File 3" modifiedDate=". . ." />
            <FileList type="file" name="File 1" modifiedDate=". . ." />
            <FileList type="file" name="File 2" modifiedDate=". . ." />
            <FileList type="file" name="File 3" modifiedDate=". . ." />
            <FileList type="folder" name="Main Folder 1" modifiedDate="24-04-2018 05:00pm" />
            <FileList type="folder" name="Main Folder 2" modifiedDate="24-04-2018 05:00pm" />
            <FileList type="folder" name="Main Folder 3" modifiedDate="24-04-2018 05:00pm" />
            <FileList type="folder" name="Main Folder 4" modifiedDate="24-04-2018 05:00pm" />
            <FileList type="folder" name="Main Folder 5" modifiedDate="24-04-2018 05:00pm" />
            <FileList type="folder" name="Main Folder 6" modifiedDate="24-04-2018 05:00pm" />
            <FileList type="folder" name="Main Folder 7" modifiedDate="24-04-2018 05:00pm" />
            <FileList type="folder" name="Main Folder 8" modifiedDate="24-04-2018 05:00pm" />
          </div>
          <div className={`create-file-modal ${createFileModalShown ? 'modal-open' : ''}`}>
            <form onSubmit={this.createNewFile}>
              <div className="form-group">
                <input type="text" name="file-name" id="file-name" required />
                <label htmlFor="file-name">Enter file / folder name</label>
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
