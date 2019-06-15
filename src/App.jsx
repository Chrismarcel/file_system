import React from 'react';
import ReactDOM from 'react-dom';
import FileManager from './views/FileManager';

// Import scss
import './assets/scss/styles.scss';

const App = () => <FileManager />;

ReactDOM.render(<App />, document.getElementById('app'));
