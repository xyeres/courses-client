import React from 'react';
import ReactDOM from 'react-dom';


import './scss/style.scss';

import { Provider } from './Context';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);