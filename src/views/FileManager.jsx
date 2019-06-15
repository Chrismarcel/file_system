import React from 'react';
import FileList from '../components/FileList';

const FileManager = () => (
  <main className="file-manager">
    <header className="folder-name">All files</header>
    <div className="file-listing">
      <FileList type="folder" name="Main Folder 1" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="folder" name="Main Folder 2" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="folder" name="Main Folder 3" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="folder" name="Main Folder 4" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="folder" name="Main Folder 5" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="folder" name="Main Folder 6" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="folder" name="Main Folder 7" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="folder" name="Main Folder 8" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="file" name="File 1" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="file" name="File 2" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="file" name="File 3" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="file" name="File 1" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="file" name="File 2" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="file" name="File 3" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="file" name="File 1" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="file" name="File 2" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="file" name="File 3" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="file" name="File 1" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="file" name="File 2" modifiedDate="24-04-2018 05:00pm" />
      <FileList type="file" name="File 3" modifiedDate="24-04-2018 05:00pm" />
    </div>
  </main>
);

export default FileManager;
