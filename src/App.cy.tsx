import React from 'react';
import App from './App';
import { CartProvider } from './cart/context/CartProvider';

describe('<App />', () => {
  it('renders', () => {
    cy.mount(
      <CartProvider>
        <App />
      </CartProvider>,
    );
  });
});
