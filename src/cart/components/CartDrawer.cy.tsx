import CartDrawer from '../components/CartDrawer.tsx';
import { CartProvider } from '../context/CartProvider.tsx';

const sel = (id: string) => `[data-cy="${id}"]`;

function mountDrawer(params?: { open?: boolean; onClose?: () => void; title?: string }) {
  const open = params?.open ?? true;
  const onClose = params?.onClose ?? (() => {});
  const title = params?.title ?? 'Your Cart';

  cy.mount(
    <CartProvider>
      <CartDrawer open={open} onClose={onClose} title={title} />
    </CartProvider>,
  );
}

describe('CartDrawer (CT)', () => {
  it('does not render when closed', () => {
    mountDrawer({ open: false });
    cy.get('body').find(sel('cart-drawer')).should('not.exist');
  });

  it('renders empty state when there are no items', () => {
    mountDrawer({ open: true });

    cy.get(sel('cart-empty')).should('be.visible');
    cy.get(sel('cart-title')).should('contain', '(0)');
  });

  it('focuses the Close button on open', () => {
    mountDrawer({ open: true });

    cy.get(sel('cart-close')).should('be.focused');
  });

  it('calls onClose when pressing Escape', () => {
    const onClose = cy.stub().as('onClose');
    mountDrawer({ open: true, onClose });

    cy.get(sel('cart-close')).should('be.focused');
    cy.window().trigger('keydown', { key: 'Escape' });

    cy.get('@onClose').should('have.been.calledOnce');
  });

  it('calls onClose when clicking the overlay', () => {
    const onClose = cy.stub().as('onClose');
    mountDrawer({ open: true, onClose });

    cy.get(sel('cart-overlay')).click({ force: true });

    cy.get('@onClose').should('have.been.calledOnce');
  });
});
