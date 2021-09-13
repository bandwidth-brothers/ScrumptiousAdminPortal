describe('create menu item', () => {
    beforeEach(() => {
        cy.visit('/admin/restaurants/bec5210f-e43a-45a7-a3a4-8f5ea45d34d1')

    })

    it('admin attempts submit without filling in name', () => {
        // Click Add Button
        cy.findByRole('button', { name: /\+ menu item/i }).click()

        // Fill out Form
        cy.findByPlaceholderText(/13.25/i).type("8.75") //Price

        // Submit
        cy.findByRole('button', { name: /submit/i }).click()

        // Verify Validation error
        cy.findByText(/name is a required field/i).should('be.visible')
        cy.findByRole('button', { name: /submit/i }).should('be.disabled')
    })

    it('admin attempts submit price validation', () => {
        // Click Add Button
        cy.findByRole('button', { name: /\+ menu item/i }).click()


        // Submit
        cy.findByRole('button', { name: /submit/i }).click()

        // Verify Validation error
        cy.findByText(/price is a required field/i).should('be.visible')
        cy.findByRole('button', { name: /submit/i }).should('be.disabled')

        // Fill out Form
        cy.findByPlaceholderText(/13.25/i).type("8.5") //Price

        // Verify Validation error
        cy.findByText(/price is not in correct format/i).should('be.visible')
    })


    it('admin creates a new restaurant', () => {
        // Click Add Button
        cy.findByRole('button', { name: /\+ menu item/i }).click()

        // Fill out Form
        cy.findByPlaceholderText(/Fried Calamari/i).type("Burger") //Name
        cy.findByPlaceholderText(/13.25/i).type("8.75") //Price

        // Submit
        cy.findByRole('button', { name: /submit/i }).click()

        // Verify in Menu-Items Path
        cy.url().should('include', '/admin/restaurants/bec5210f-e43a-45a7-a3a4-8f5ea45d34d1/menu-items')
    })
})