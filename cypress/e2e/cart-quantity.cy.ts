describe("cart quantity controls", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.get('[data-cy="add-to-cart-apple"]').click()
    cy.get('[data-cy="cart-icon"]').click()
  })

  it("increments and decrements item quantity", () => {
    cy.get('[data-cy="cart-quantity-apple"]').should("contain", "1")

    cy.get('[data-cy="cart-increment-apple"]').click()
    cy.get('[data-cy="cart-quantity-apple"]').should("contain", "2")
    cy.get('[data-cy="cart-badge"]').should("contain", "2")

    cy.get('[data-cy="cart-decrement-apple"]').click()
    cy.get('[data-cy="cart-quantity-apple"]').should("contain", "1")
    cy.get('[data-cy="cart-badge"]').should("contain", "1")
  })

  it("removes the item when quantity reaches zero", () => {
    cy.get('[data-cy="cart-decrement-apple"]').click()

    cy.get('[data-cy="empty-cart-state"]').should("be.visible")
    cy.get('[data-cy="cart-badge"]').should("contain", "0")
  })
})