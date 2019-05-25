import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
