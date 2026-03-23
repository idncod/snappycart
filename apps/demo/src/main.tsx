import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from 'snappycart';
import 'snappycart/styles.css';
import './globals.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);
