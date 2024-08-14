/// <reference types="cypress" />

import CreateAccount from "../../utility/createAccount.utils";

before(() => {

    cy.visit('');
});


describe('Creating an account on the website https://magento.softwaretestingboard.com/', () => {

    const createAccount = new CreateAccount();

    it('Verify user is able to launch the URL', () => {

        createAccount.launchURL();
    });


    it('Verify user is able to click on Create an Account link and navigate to Create Account page', () => {

        createAccount.createAccountLink();
    });


    it('Verify user is able to enter customer details', () => {

        createAccount.enterCustomerDetails();
    });


    it('Verify user is able to click on Create an Account button', () => {

        createAccount.createAccountButton();        
    });


    it('Verify user is able to see confirmation message', () => {

        createAccount.confirmationMessage();
    });


    it('Verify user is able to Sign Out post account creation', () => {

        createAccount.signOut();
    });
});


describe('Signing in with new account', () => {

    const createAccount = new CreateAccount();

    it('Verify user is able to sign in with the newly created account', () => {

        createAccount.signIn();
    });


    it('Verify user is able to see customer greeting on the top right', () => {

        createAccount.customerGreeting();
    });


    it('Verify user is able to sign out post logging in', () => {
        createAccount.signOut();
    });
});