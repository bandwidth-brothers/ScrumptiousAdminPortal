
describe('authentication', () => {
    beforeEach(() => {
        cy.visit('/admin/login')

    })

    it('login and logout admin', () => {

        // Fill out Login Form
        cy.findByRole('textbox').type("admin@gmail.com") // Email
        cy.findByPlaceholderText(/password/i).type("pass") // Password

        // Login Button
        cy.findByRole('button', { name: /login/i }).click()

        // Wait 1s
        cy.wait(1000)

        // Verify URL
        cy.url().should('include', '/admin')

        // Verify local storage not empty

        cy.clearLocalStorage('dummy').then((ls) => {
            expect(ls.getItem('dummy')).to.be.null
            expect(ls.getItem('expiresAt')).to.not.be.null
            expect(ls.getItem('token')).to.not.be.null
            expect(ls.getItem('userID')).to.not.be.null
        })

        // Click Logout
        cy.findByRole('link', { name: /logout/i }).click()

        cy.wait(1000)

        // Verify URL
        cy.url().should('include', '/admin/logout')

        // Verify local storage empty
        cy.clearLocalStorage('dummy').then((ls) => {
            expect(ls.getItem('dummy')).to.be.null
            expect(ls.getItem('expiresAt')).to.be.null
            expect(ls.getItem('token')).to.be.null
            expect(ls.getItem('userID')).to.be.null
        })
    })


    it('login attempt customer credentials', () => {

        // Fill out Login Form
        cy.findByRole('textbox').type("customer.green@gmail.com") // Email
        cy.findByPlaceholderText(/password/i).type("pass") // Password

        // Login Button
        cy.findByRole('button', { name: /login/i }).click()

        // Verify URL Forbidden
        cy.url().should('include', '/admin/forbidden')

        // Verify local storage empty
        cy.clearLocalStorage('dummy').then((ls) => {
            expect(ls.getItem('dummy')).to.be.null
            expect(ls.getItem('expiresAt')).to.be.null
            expect(ls.getItem('token')).to.be.null
            expect(ls.getItem('userID')).to.be.null
        })
    })

    it('login attempt restaurant owner credentials', () => {

        // Fill out Login Form
        cy.findByRole('textbox').type("owner.brown@gmail.com") // Email
        cy.findByPlaceholderText(/password/i).type("Owner2021!") // Password

        // Login Button
        cy.findByRole('button', { name: /login/i }).click()

        // Verify URL Forbidden
        cy.url().should('include', '/admin/forbidden')

        // Verify local storage empty
        cy.clearLocalStorage('dummy').then((ls) => {
            expect(ls.getItem('dummy')).to.be.null
            expect(ls.getItem('expiresAt')).to.be.null
            expect(ls.getItem('token')).to.be.null
            expect(ls.getItem('userID')).to.be.null
        })
    })

})