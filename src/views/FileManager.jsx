import React, { Component } from 'react';
import { string } from 'prop-types';
import FileList from '../components/FileList';
import DashboardHeader from '../components/DashboardHeader';

class FileManager extends Component {
    state = {
      files: []
    }

    componentWillMount() {
      const { location } = this.props;
      const directory = location.split('/').pop();
      const files = localStorage.getItem(directory);
      this.setState({ files });
    }

    render() {
      const { files } = this.state;
      return (
        <main className="file-manager">
          <div className="file-listing">
            <DashboardHeader title="All files" />
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
        </main>
      );
    }
}

FileManager.propTypes = {
  location: string.isRequired
};

export default FileManager;
