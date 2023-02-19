import { API_BASE_URL } from "./../../fixtures/constants/index";

export class SignInPage {
    emailTextField = () => cy.get('[name="email"]');
    passwordTextField = () => cy.get('[name="password"]');
    signInButton = () => cy.get("button").contains("Sign In");
    resetPasswordLink = () => cy.get("a").contains("Reset");
    signUpLink = () => cy.get("a").contains("Register");
    passwordShowButton = () => cy.get(".password_icon");
    errorDisplaysForSignInFields = () => cy.get(".error"); //use .eq(index) to get the error you are actually looking for
    errorDisplayedForInvalidCredentials = () =>
        cy.contains("Invalid Credentials");
    messageDisplayedForSuccessfulLogin = () => cy.contains("Login Successful");

    visitSignInPage = () => {
        cy.visit("/auth/login");
    };

    interceptLoginRequest = (interceptName) => {
        return cy
            .intercept("POST", `${API_BASE_URL}/auth/login`)
            .as(interceptName);
    };

    waitForLoginInterceptToReturnStatusCode = (interceptName, statusCode) => {
        return cy
            .wait(`@${interceptName}`, { timeout: 30000 })
            .its("response.statusCode")
            .should("eq", statusCode);
    };

    checkThatSignInPageIsOpen = () => {
        this.emailTextField()
            .should("have.attr", "placeholder", "example@gmail.com")
            .should("have.attr", "type", "email")
            .should("exist");
        this.passwordTextField()
            .should("have.attr", "placeholder", "password")
            .should("have.attr", "type", "password")
            .should("exist");
        this.signInButton().should("exist").should("be.visible");
        this.resetPasswordLink()
            .should("exist")
            .should("be.visible")
            .should("have.attr", "href", "/auth/password_reset_request");
        this.signUpLink()
            .should("exist")
            .should("be.visible")
            .should("have.attr", "href", "/auth/signup");
    };

    clickSignInButton = () => {
        this.signInButton().click();
    };

    checkErrorReturnedForEmptyEmailAndPassword = () => {
        this.errorDisplaysForSignInFields()
            .eq(0)
            .should("be.visible")
            .should("contain.text", "Provide your email please");
        this.errorDisplaysForSignInFields()
            .eq(1)
            .should("be.visible")
            .should("contain.text", "Provide a password please");
    };

    checkThatUserRemainsInLogInPage = () => {
        cy.url().should("contain", "/auth/login");
    };

    checkThatUserIsRedirectedToDashboardAfterLogin = () => {
        cy.url().should("contain", "/dashboard/overview");
    };

    inputEmail = (email) => {
        this.emailTextField().type(email);
    };

    inputPassword = (password) => {
        this.passwordTextField().type(password);
    };

    signInValidFlow = (email, password, loginIntercept) => {
        this.inputEmail(email);
        this.inputPassword(password);
        this.interceptLoginRequest(loginIntercept);
        this.clickSignInButton();
        this.waitForLoginInterceptToReturnStatusCode(loginIntercept, 200);
        this.checkThatValidMessageIsDisplayed();
        this.checkThatUserIsRedirectedToDashboardAfterLogin();
    };

    checkThatErrorMessageIsDisplayed = () => {
        this.errorDisplayedForInvalidCredentials().should("be.visible");
    };

    checkThatValidMessageIsDisplayed = () => {
        this.messageDisplayedForSuccessfulLogin().should("be.visible");
    };
}
