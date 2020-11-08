// packages import 
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import history from './utilities/history';
// Resuable Css imports
import './stylesheets/font.css';
import './stylesheets/root.css';
import './stylesheets/reusable.css';
import './stylesheets/animation.css';
// React component imports
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
