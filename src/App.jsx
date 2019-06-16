import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import FileManager from './views/FileManager';

// Import scss
import './assets/scss/styles.scss';

const App = () => (
  <BrowserRouter>
    <Route
      to="*"
      component={({ location, history }) => (
        <FileManager
          history={history}
          location={location.pathname}
        />
      )
    }
    />
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
