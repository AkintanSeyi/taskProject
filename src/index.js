// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3';
import { BrowserRouter } from 'react-router-dom';

function getLibrary(provider) {
  return new Web3(provider)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
  <BrowserRouter basename={process.env.PUBLIC_URL} >
    <App />
    </BrowserRouter>
  </Web3ReactProvider>
);

reportWebVitals();