const sel = (id: string) => `[data-cy="${id}"]`

const getDrawer = () => cy.get(sel('cart-drawer'))

const openDrawerFromMiniAction = () => {
  cy.get(sel('open-drawer')).should('be.visible').click()
  getDrawer().should('be.visible')
}

const openDrawerFromHero = () => {
  cy.get(sel('hero-open-cart')).scrollIntoView().should('be.visible').click()
  getDrawer().should('be.visible')
}

describe('demo cart smoke', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('h1', 'snappycart').should('be.visible')
  })

  it('adds an item from the demo and shows it in the drawer', () => {
    cy.get(sel('add-apple')).should('be.visible').click()
    cy.get(sel('cart-badge')).should('have.text', '1')

    openDrawerFromMiniAction()

    getDrawer().within(() => {
      cy.get(sel('cart-drawer-title')).should('contain.text', 'Your Cart (1)')
      cy.get(sel('cart-item-apple')).should('be.visible')
      cy.get(sel('cart-item-apple')).should('contain.text', 'Apple')
      cy.get(sel('cart-item-apple')).should('contain.text', '£0.60')
    })
  })

  it('increments and decrements quantity from the drawer', () => {
    cy.get(sel('add-apple')).should('be.visible').click()
    openDrawerFromMiniAction()

    getDrawer().within(() => {
      cy.get(sel('cart-inc-apple')).click()
      cy.get(sel('cart-qty-apple')).should('have.text', '2')

      cy.get(sel('cart-dec-apple')).click()
      cy.get(sel('cart-qty-apple')).should('have.text', '1')
    })

    cy.get(sel('cart-badge')).should('have.text', '1')
  })

  it('removes an item from the drawer', () => {
    cy.get(sel('add-apple')).should('be.visible').click()
    openDrawerFromMiniAction()

    getDrawer().within(() => {
      cy.get(sel('cart-item-apple')).should('be.visible')
      cy.get(sel('cart-remove-apple')).click()
      cy.get(sel('cart-empty')).should('be.visible')
    })

    cy.get(sel('cart-badge')).should('have.text', '0')
  })

  it('clears the cart after adding a starter set', () => {
    cy.get(sel('hero-add-starter-set')).scrollIntoView().should('be.visible').click()
    cy.get(sel('cart-badge')).should('have.text', '4')

    openDrawerFromHero()

    getDrawer().within(() => {
      cy.get(sel('cart-item-apple')).should('be.visible')
      cy.get(sel('cart-item-banana')).should('be.visible')
      cy.get(sel('cart-item-orange')).should('be.visible')
      cy.get(sel('cart-clear')).should('be.visible').click()
      cy.get(sel('cart-empty')).should('be.visible')
    })

    cy.get(sel('cart-badge')).should('have.text', '0')
  })
})