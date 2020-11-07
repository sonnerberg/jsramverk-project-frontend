beforeEach(() => {
  cy.visit('/')
})

describe('Test the app', () => {
  const home = '.homeLink'
  const users = '.usersLink'
  const buyStocks = '.buyLink'
  const sellStocks = '.sellLink'
  const account = '.accountLink'
  const deposit = '.depositLink'
  const login = '[href="/login"]'
  const logout = '#logout'
  const hamburger = '#burger'
  const register = '[href="/register"]'
  const username = 'richard'
  const email = 'pene14@student.bth.se'
  const password = 'hello'
  const numberOfLinksWhenNotLoggedIn = 2
  const numberOfLinksWhenLoggedIn = 6
  const stocksInAccount = '#root > div > div.wrapper > main > div div'

  it('has two links in navigation bar', () => {
    cy.get('#root > div > div > nav > ul > li').should(
      'have.length',
      numberOfLinksWhenNotLoggedIn
    )
  })

  it('has no users registered', () => {
    cy.get(users).click({ multiple: true, force: true })
    cy.url().should('eq', `${Cypress.config().baseUrl}users`)
    cy.get('main > p').should('contain', 'no users registered')
  })

  it('fails log in when not registered', () => {
    cy.get(login).click()
    cy.login(email, password)
    cy.url().should('eq', `${Cypress.config().baseUrl}login`)
  })

  it('fails to access private route', () => {
    cy.visit('/account')
    cy.url().should('eq', `${Cypress.config().baseUrl}login`)
  })

  it('fails registering a user with short password', () => {
    cy.get(register).click()
    cy.register(username, email, '123')
    cy.url().should('eq', `${Cypress.config().baseUrl}register`)
  })

  it('registers a user', () => {
    cy.visit('/users')
    cy.url().should('eq', `${Cypress.config().baseUrl}users`)
    cy.get('main > p').should('contain', 'no users registered')
    cy.get(register).click()
    cy.register(username, email, password)
    cy.url().should('eq', Cypress.config().baseUrl)
    cy.visit('/users')
    cy.url().should('eq', `${Cypress.config().baseUrl}users`)
    cy.get('main > div').should('have.length', 1)
  })

  it('logs in', () => {
    cy.get(login).click()
    cy.login(email, password)
    cy.url().should('eq', Cypress.config().baseUrl)
    cy.get('#root > div > div > nav > ul > li').should(
      'have.length',
      numberOfLinksWhenLoggedIn
    )
  })

  it('has one user registered', () => {
    cy.get(users).click({ multiple: true, force: true })
    cy.url().should('eq', `${Cypress.config().baseUrl}users`)
    cy.get('main > div').should('have.length', 1)
  })

  it('registers another user', () => {
    cy.get(register).click()
    cy.register('cypress', 'cypress@test.com', password)
    cy.url().should('eq', Cypress.config().baseUrl)
  })

  it('has two users registered', () => {
    cy.get(users).click({ multiple: true, force: true })
    cy.url().should('eq', `${Cypress.config().baseUrl}users`)
    cy.get('main > div').should('have.length', 2)
  })

  it('deposits', () => {
    cy.visit('/login')
    cy.login(email, password)
    cy.url().should('eq', Cypress.config().baseUrl)
    cy.visit('/deposit')
    cy.url().should('eq', `${Cypress.config().baseUrl}deposit`)
    cy.get('input').type('10000').type('{enter}')
    cy.url().should('eq', `${Cypress.config().baseUrl}account`)
    cy.get('#root > div > div.wrapper > main > div > div > span').should(
      'contain',
      '10000.00'
    )
  })

  it('logs in and logs out', () => {
    cy.visit('/login')
    cy.login(email, password)
    cy.url().should('eq', Cypress.config().baseUrl)
    cy.get(logout).click()
    cy.url().should('eq', Cypress.config().baseUrl)
  })

  it('uses the hamburger menu', () => {
    cy.viewport('iphone-6') // Set viewport to 375px x 667px
    cy.visit('/login')
    cy.login(email, password)
    cy.url().should('eq', Cypress.config().baseUrl)
    cy.get(hamburger).click()
    cy.get(home).click({ multiple: true, force: true })
    cy.url().should('eq', Cypress.config().baseUrl)
    cy.get(hamburger).click()
    cy.get(users).click({ multiple: true, force: true })
    cy.url().should('eq', `${Cypress.config().baseUrl}users`)
    cy.get(hamburger).click()
    cy.get(buyStocks).click({ multiple: true, force: true })
    cy.url().should('eq', `${Cypress.config().baseUrl}buy`)
    cy.get(hamburger).click()
    cy.get(sellStocks).click({ multiple: true, force: true })
    cy.url().should('eq', `${Cypress.config().baseUrl}sell`)
    cy.get(hamburger).click()
    cy.get(account).click({ multiple: true, force: true })
    cy.url().should('eq', `${Cypress.config().baseUrl}account`)
    cy.get(hamburger).click()
    cy.get(deposit).click({ multiple: true, force: true })
    cy.url().should('eq', `${Cypress.config().baseUrl}deposit`)
  })

  it('buys and sells stocks', () => {
    cy.visit('/login')
    cy.url().should('eq', `${Cypress.config().baseUrl}login`)
    cy.login(email, password)
    cy.wait(500)
    cy.visit('/deposit')
    cy.url().should('eq', `${Cypress.config().baseUrl}deposit`)
    cy.get('input').type('99999999').type('{enter}')
    cy.visit('/buy')
    cy.get('#stock').select('Princesstårta')
    cy.get('input').type('1').type('{enter}')
    cy.url().should('eq', `${Cypress.config().baseUrl}account`)
    cy.get(stocksInAccount).should('have.length', 2)
    cy.visit('/buy')
    cy.get('#stock').select('Princesstårta')
    cy.get('input').type('1').type('{enter}')
    cy.url().should('eq', `${Cypress.config().baseUrl}account`)
    cy.get(stocksInAccount).should('have.length', 2)
    cy.visit('/buy')
    cy.get('#stock').select('Mandelkubb')
    cy.get('input').type('1').type('{enter}')
    cy.url().should('eq', `${Cypress.config().baseUrl}account`)
    cy.get(stocksInAccount).should('have.length', 3)
    cy.visit('/buy')
    cy.get('#stock').select('Dammsugare')
    cy.get('input').type('1').type('{enter}')
    cy.url().should('eq', `${Cypress.config().baseUrl}account`)
    cy.get(stocksInAccount).should('have.length', 4)
    cy.visit('/buy')
    cy.get('#stock').select('Kanelbulle')
    cy.get('input').type('1').type('{enter}')
    cy.url().should('eq', `${Cypress.config().baseUrl}account`)
    cy.get(stocksInAccount).should('have.length', 5)
    cy.visit('/sell')
    cy.get('#stock').select('Kanelbulle')
    cy.get('input').type('1').type('{enter}')
    cy.url().should('eq', `${Cypress.config().baseUrl}account`)
    cy.get(stocksInAccount).should('have.length', 4)
    cy.visit('/sell')
    cy.get('#stock').select('Dammsugare')
    cy.get('input').type('1').type('{enter}')
    cy.url().should('eq', `${Cypress.config().baseUrl}account`)
    cy.get(stocksInAccount).should('have.length', 3)
    cy.visit('/sell')
    cy.get('#stock').select('Mandelkubb')
    cy.get('input').type('1').type('{enter}')
    cy.url().should('eq', `${Cypress.config().baseUrl}account`)
    cy.get(stocksInAccount).should('have.length', 2)
    cy.visit('/sell')
    cy.get('#stock').select('Princesstårta')
    cy.get('input').type('2').type('{enter}')
    cy.url().should('eq', `${Cypress.config().baseUrl}account`)
    cy.get(stocksInAccount).should('have.length', 1)
  })
})
