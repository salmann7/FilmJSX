import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './app/store';
import './main.css'
import ToggleColorMode from './utils/ToggleColorMode';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleColorMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToggleColorMode>
    </Provider>
  </React.StrictMode>,
)
