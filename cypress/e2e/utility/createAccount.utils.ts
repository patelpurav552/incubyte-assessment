class CreateAccount {

    createAccountLoadTimeout: object = { timeout: 20000 };

    launchURL() {

        cy.intercept('GET', '/pub/static/version1695896754/frontend/Magento/luma/en_US/Magento_Captcha/template/checkout/captcha.html')
          .as('Captcha')

          .visit('')
          .url()
          .should('eq', Cypress.config().baseUrl)

          .wait('@Captcha', this.createAccountLoadTimeout)
          .its('response.statusCode')
          .should('eq', 200);
    };


    createAccountLink() {

        cy.intercept('GET', '/pub/static/version1695896754/frontend/Magento/luma/en_US/Magento_Captcha/template/checkout/captcha.html')
          .as('Captcha')

          .get('li > a')
          .contains('Create an Account')
          .click()
          .url()
          .should('eq', Cypress.config().baseUrl + 'customer/account/create/')

          .wait('@Captcha', this.createAccountLoadTimeout)
          .its('response.statusCode')
          .should('eq', 200);
    };


    enterCustomerDetails() {

        cy.fixture('createAccount').then((createAccountFixture) => {

            cy.get('input[id="firstname"]')
              .should('be.empty')
              .type(createAccountFixture.firstname)
              .should('have.value', createAccountFixture.firstname)
  
              .get('input[id="lastname"]')
              .should('be.empty')
              .type(createAccountFixture.lastname)
              .should('have.value', createAccountFixture.lastname)
  
              .get('input[id="email_address"]')
              .should('be.empty')
              .type(createAccountFixture.emailAddress)
              .should('have.value', createAccountFixture.emailAddress)
  
              .get('input[id="password"]')
              .should('be.empty')
              .type(createAccountFixture.password)
              .should('have.value', createAccountFixture.password)
  
              .get('input[id="password-confirmation"]')
              .should('be.empty')
              .type(createAccountFixture.passwordConfirmation)
              .should('have.value', createAccountFixture.passwordConfirmation);
        });
    };


    createAccountButton() {

        cy.intercept('GET', '/pub/static/version1695896754/frontend/Magento/luma/en_US/Magento_Captcha/template/checkout/captcha.html')
          .as('Captcha')
        
          .get('button')
          .contains('Create an Account')
          .should('be.visible')
          .should('have.text', 'Create an Account')
          .click()
          .url()
          .should('eq', Cypress.config().baseUrl + 'customer/account/')

          .wait('@Captcha', this.createAccountLoadTimeout)
          .its('response.statusCode')
          .should('eq', 200);  
    };


    confirmationMessage() {

        cy.get('div[role="alert"] > div > div')
          .contains('Thank you for registering with Main Website Store.')
          .should('have.text', 'Thank you for registering with Main Website Store.')
    };


    customerGreeting() {

        cy.fixture('createAccount').then((createAccountFixture) => {

          cy.get('ul > li.greet.welcome')
            .eq(0)
            .contains(`Welcome, ${createAccountFixture.firstname} ${createAccountFixture.lastname}!`)
            .should('have.text', `Welcome, ${createAccountFixture.firstname} ${createAccountFixture.lastname}!`)
        });

    }
    
    
    signOut() {

        cy.intercept('GET', '/pub/static/version1695896754/frontend/Magento/luma/en_US/Magento_Captcha/template/checkout/captcha.html')
          .as('Captcha')

          .get('button[data-action="customer-menu-toggle"]')
          .eq(0)
          .should('be.visible')
          .click()
        

          .get('ul > li')
          .contains('Sign Out')
          .should('be.visible')
          .click()
          .url()
          .should('eq', Cypress.config().baseUrl + 'customer/account/logoutSuccess/')

          .wait('@Captcha', this.createAccountLoadTimeout)
          .its('response.statusCode')
          .should('eq', 200)

          .wait(10000)
          .url()
          .should('eq', Cypress.config().baseUrl);
    };


    signIn() {

        cy.intercept('GET', '/pub/static/version1695896754/frontend/Magento/luma/en_US/Magento_Captcha/template/checkout/captcha.html')
          .as('Captcha')

          .fixture('createAccount').then((createAccountFixture) => {        

            cy.get('li > a')
              .contains('Sign In')
              .click()
              .url()
              .should('eq', Cypress.config().baseUrl + 'customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/')
  
              .logIn(createAccountFixture.emailAddress, createAccountFixture.password);
  
            cy.wait('@Captcha', this.createAccountLoadTimeout)
              .its('response.statusCode')
              .should('eq', 200);
          });
    };
}

export default CreateAccount;