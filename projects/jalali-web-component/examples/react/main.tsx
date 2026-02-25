import React from 'react';
import ReactDOM from 'react-dom/client';
import { JalaliDatePickerElement } from '@jalali-web-component/core';
import App from './App';
import './index.css';

// Register the web component
customElements.define('jalali-date-picker', JalaliDatePickerElement);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
