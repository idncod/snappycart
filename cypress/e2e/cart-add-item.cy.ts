describe("add item to cart", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("adds an item and shows it in the drawer", () => {
    cy.get('[data-cy="add-to-cart-apple"]').click()

    cy.get('[data-cy="cart-badge"]').should("contain", "1")

    cy.get('[data-cy="cart-icon"]').click()
    cy.get('[data-cy="cart-drawer"]').should("be.visible")
    cy.get('[data-cy="cart-item-name-apple"]').should("contain", "Apple")
  })
})