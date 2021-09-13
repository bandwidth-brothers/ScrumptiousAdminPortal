
describe('create restaurant', () => {
    beforeEach(() => {
        cy.visit('/admin/restaurants')

    })

    it('admin creates a new restaurant', () => {
        // Click Add Button
        cy.findByRole('button', { name: /\+ restaurant/i }).click()
        // Fill out Form
        cy.findByPlaceholderText(/Smoothie Palace/i).type("Quick Subs") //Name
        cy.findByPlaceholderText(/21 E Concord Ave./i).type("172 Star Ln") //Line 1
        cy.findByPlaceholderText(/Richmond/i).type("Arlington") //City
        cy.findByRole('combobox', { name: /state/i }).select("New Jersey") //State
        cy.findByPlaceholderText(/13123/i).type("07514") //Zip Code

        // Submit
        cy.findByRole('button', { name: /submit/i }).click()

        // Add three categories
        cy.findAllByPlaceholderText("Placeholder").filter('input:text[value=""]').type("Pizza")
        cy.findByRole('button', { name: /\+ category/i }).click()
        cy.findAllByPlaceholderText("Placeholder").filter('input:text[value=""]').type("Drinks")
        cy.findByRole('button', { name: /\+ category/i }).click()
        cy.findAllByPlaceholderText("Placeholder").filter('input:text[value=""]').type("Burgers")
        cy.findByRole('button', { name: /\+ category/i }).click()

        // Submit
        cy.findByRole('button', { name: /submit/i }).click()

        // Restaurant
        cy.findByText(/Restaurant Created/i).should('be.visible')
    })
})