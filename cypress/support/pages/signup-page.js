import { API_BASE_URL } from "../../fixtures/constants/index";

const serverId = "c6qaaekn";
const emailToUse = (emailPrefix) => `${emailPrefix}@${serverId}.mailosaur.net`; //collect-citizen@c6qaaekn.mailosaur.net

export class SignUpPage {
    fullNameTextField = () => cy.get('[name="full_name"]');
    userNameTextField = () => cy.get('[name="username"]');
    phoneNumberTextField = () => cy.get('[name="phone_number"]');
    emailTextField = () => cy.get('[name="email"]');
    passwordTextField = () => cy.get('[name="password"]');
    confirmPasswordTextField = () => cy.get('[name="confirmPassword"]');
    createAccountButton = () => cy.get("button").contains("Create Account");
    signInLinkText = () => cy.get("a").contains("Click here to sign in");
    showPasswordIconForPasswordButton = () => cy.get(".password_icon").eq(0);
    showPasswordIconForConfirmPasswordButton = () =>
        cy.get(".password_icon").eq(1);
    messageDisplayedForSuccessfulSignUp = () =>
        cy.contains("Signup Successful");
    errorMessageForWhenDataAlreadyExists = () =>
        cy
            .contains(
                "A user with that phone number or email or username already exists"
            )
            .should("be.visible");

    visitSignUpPage = () => {
        cy.visit("/auth/signup");
    };

    checkThatSignUpPageIsOpen = () => {
        this.fullNameTextField()
            .should("be.visible")
            .should("have.attr", "placeholder", "Your Full Name e.g Jane Doe");
        this.userNameTextField()
            .should("be.visible")
            .should("have.attr", "placeholder", "Your Username");
        this.phoneNumberTextField()
            .should("be.visible")
            .should("have.attr", "placeholder", "Your Phone Number");
        this.emailTextField()
            .should("be.visible")
            .should("have.attr", "placeholder", "Your Email");
        this.passwordTextField()
            .should("be.visible")
            .should("have.attr", "placeholder", "Your Password")
            .should("have.attr", "type", "password");
        this.confirmPasswordTextField()
            .should("be.visible")
            .should("have.attr", "placeholder", "Confirm Password")
            .should("have.attr", "type", "password");
        this.createAccountButton().should("be.visible").should("be.enabled");
        this.signInLinkText().should("have.attr", "href", "/auth/login");
        this.signInLinkText().then((link) => {
            cy.request(link.prop("href"));
        }); //to check from the signup page that the link is actually live
    };

    interceptSignUpRequest = (interceptName) => {
        return cy
            .intercept("POST", `${API_BASE_URL}/auth/signup`)
            .as(interceptName);
    };

    waitForSignUpInterceptToReturnStatusCode = (interceptName, statusCode) => {
        return cy
            .wait(`@${interceptName}`, { timeout: 30000 })
            .its("response.statusCode")
            .should("eq", statusCode);
    };

    interceptGetUserRequest = (interceptName) => {
        return cy
            .intercept("GET", `${API_BASE_URL}/auth/user`)
            .as(interceptName);
    };

    waitForGetUserInterceptToReturnStatusCode = (interceptName, statusCode) => {
        return cy
            .wait(`@${interceptName}`, { timeout: 30000 })
            .its("response.statusCode")
            .should("eq", statusCode);
    };

    checkThatUserRequestAfterSignUpReturnsTheCorrectData = (
        interceptName,
        signUpDetails
    ) => {
        const { fullName, userName, email, phoneNumber } = signUpDetails;
        cy.get(`@${interceptName}`).then((intercept) => {
            let userDetailsReturned = intercept.response.body.data.user;
            expect(userDetailsReturned.full_name).to.eq(fullName);
            expect(userDetailsReturned.username).to.eq(userName);
            expect(userDetailsReturned.email).to.eq(email);
            expect(userDetailsReturned.phone_number).to.eq(phoneNumber);
        });
    };

    inputFullName = (fullName) => {
        return this.fullNameTextField().type(fullName);
    };

    inputUserName = (userName) => {
        return this.userNameTextField().type(userName);
    };

    inputPhoneNumber = (phoneNumber) => {
        return this.phoneNumberTextField().type(phoneNumber);
    };

    inputEmail = (email) => {
        return this.emailTextField().type(email);
    };

    inputPassword = (password) => {
        return this.passwordTextField().type(password);
    };

    inputConfirmPassword = (password) => {
        return this.confirmPasswordTextField().type(password);
    };

    clickCreateAccountButton = () => {
        return this.createAccountButton().click();
    };

    checkThatUserIsAutomaticallyLoggedInAfterAccountCreation = () => {
        cy.url().should("contain", "/dashboard/overview");
    };

    checkMessageWhenConfirmPasswordAndPasswordFieldDoNotMatch = () => {
        this.confirmPasswordTextField()
            .siblings("div")
            .should("contain.text", "Both password need to be the same");
    };

    checkThatUserRemainsInSignUpPageAfterErrorWithoutTheFormBeingCleared = (
        fullName,
        username,
        phoneNumber,
        email,
        password,
        confirmPassword
    ) => {
        cy.url().should("contain", "/auth/signup");
        this.fullNameTextField().should("have.attr", "value", fullName);
        this.userNameTextField().should("have.attr", "value", username);
        this.phoneNumberTextField().should("have.attr", "value", phoneNumber);
        this.emailTextField().should("have.attr", "value", email);
        this.passwordTextField()
            .should("have.attr", "value", password)
            .should("have.attr", "type", "password");
    };
}
