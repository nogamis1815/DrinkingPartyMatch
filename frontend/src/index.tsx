import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Modal from 'react-modal';

const rootElement = document.getElementById('root');
if (rootElement) {
  // react-modalのsetAppElementを設定
  Modal.setAppElement(rootElement);

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
