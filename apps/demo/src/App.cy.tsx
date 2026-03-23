import App from './App';
import { CartProvider } from 'snappycart';
import 'snappycart/styles.css';

describe('<App />', () => {
  it('renders the demo app with initial empty cart state', () => {
    cy.mount(
      <CartProvider>
        <App />
      </CartProvider>,
    );

    cy.get('[data-cy="demo-title"]').should('contain', 'Demo eCommerce');
    cy.get('[data-cy="add-to-cart-apple"]').should('be.visible');
    cy.get('[data-cy="add-to-cart-banana"]').should('be.visible');
    cy.get('[data-cy="cart-icon"]').should('be.visible');
    cy.get('[data-cy="cart-badge"]').should('contain', '0');
  });

  it('adds apple to the cart', () => {
    cy.mount(
      <CartProvider>
        <App />
      </CartProvider>,
    );

    cy.get('[data-cy="add-to-cart-apple"]').click();
    cy.get('[data-cy="cart-badge"]').should('contain', '1');

    cy.get('[data-cy="cart-icon"]').click();
    cy.get('[data-cy="cart-drawer"]').should('be.visible');
    cy.get('[data-cy="cart-item-name-apple"]').should('contain', 'Apple');
    cy.get('[data-cy="cart-quantity-apple"]').should('contain', '1');
  });

  it('adds 2 bananas to the cart', () => {
    cy.mount(
      <CartProvider>
        <App />
      </CartProvider>,
    );

    cy.get('[data-cy="add-to-cart-banana"]').click();
    cy.get('[data-cy="cart-badge"]').should('contain', '2');

    cy.get('[data-cy="cart-icon"]').click();
    cy.get('[data-cy="cart-drawer"]').should('be.visible');
    cy.get('[data-cy="cart-item-name-banana"]').should('contain', 'Banana');
    cy.get('[data-cy="cart-quantity-banana"]').should('contain', '2');
  });
});
