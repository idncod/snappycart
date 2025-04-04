import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { CartProvider } from './cart/context/CartProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);
