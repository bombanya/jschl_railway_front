import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "./index.css"
import "/node_modules/primeflex/primeflex.css"

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
