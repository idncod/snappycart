describe("cart open and close", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("opens the cart drawer from the cart icon and closes it", () => {
    cy.get('[data-cy="cart-drawer"]').should("not.exist")

    cy.get('[data-cy="cart-icon"]').click()
    cy.get('[data-cy="cart-drawer"]').should("be.visible")

    cy.get('[data-cy="cart-close"]').click()
    cy.get('[data-cy="cart-drawer"]').should("not.exist")
  })
})