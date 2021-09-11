
describe('authentication', () => {
    beforeEach(() => {
        cy.visit('/admin/login')

    })

    it('register new admin', () => {

        cy.visit('/admin/register')
        let idG = ""
        // Fill out Register Form
        cy.findByPlaceholderText(/john/i).type("John") // First Name
        cy.findByPlaceholderText(/doe/i).type("Doe") // Last Name
        cy.makeid(6).then(id => {
            cy.findByPlaceholderText(/email/i).type(id + "@gmail.com")
        })// Email
        cy.findByPlaceholderText(/password/i).type("Admin2021!") // Password
        cy.findByPlaceholderText(/\(973\)201\-5424/i).type("7841249595") // Phone

        // Register Button
        cy.findByRole('button', { name: /register/i }).click()

        // Wait 1s
        cy.wait(2000)

        // Verify URL
        cy.url().should('include', '/admin/login')

        //////// Login ////////

        // Fill out Login Form
        cy.findByRole('textbox').type(Cypress.env("id") + "@gmail.com") // Email
        cy.findByPlaceholderText(/password/i).type("Admin2021!") // Password

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

    })

    it('attempt to register admin that already exists', () => {

        cy.visit('/admin/register')
        // Fill out Register Form
        cy.findByPlaceholderText(/john/i).type("John") // First Name
        cy.findByPlaceholderText(/doe/i).type("Doe") // Last Name
        cy.findByPlaceholderText(/email/i).type("john.doe2@gmail.com") // Email
        cy.findByPlaceholderText(/password/i).type("Admin2021!") // Password
        cy.findByPlaceholderText(/\(973\)201\-5424/i).type("7841249595") // Phone

        // Register Button
        cy.findByRole('button', { name: /register/i }).click()

        // Wait 1s
        cy.wait(2000)

        // Verify URL
        cy.url().should('include', '/admin/register')

        // 500 error when email exists
        cy.findByText(/the email already exists in the system or something went wrong\./i).should('be.visible')

    })

    it('register link in nav', () => {
        // Go to register
        cy.findByText(/\//i).within(() => { return cy.findByRole('link', { name: /register/i }).click() })

        // Verify URL
        cy.url().should('include', '/admin/register')
    })

    it('register link in form', () => {
        // Go to register
        cy.findByText(/need an account\? here\./i).within(() => { return cy.findByRole('link', { name: /register/i }).click() })

        // Verify URL
        cy.url().should('include', '/admin/register')

        // Go to login
        cy.findByText(/already have an account\? here\./i).within(() => { return cy.findByRole('link', { name: /login/i }).click() })

        // Verify URL
        cy.url().should('include', '/admin/login')
    })



})