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

    interceptsignUpRequest = (interceptName) => {
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

    inputFullName = (fullName) => {
        this.fullNameTextField().type(fullName);
    };

    inputUserName = (userName) => {
        this.userNameTextField().type(userName);
    };

    inputPhoneNumber = (phoneNumber) => {
        this.phoneNumberTextField().type(phoneNumber);
    };

    inputEmail = (email) => {
        this.emailTextField().type(email);
    };

    inputPassword = (password) => {
        this.passwordTextField().type(password);
    };

    inputConfirmPassword = (password) => {
        this.confirmPasswordTextField().type(password);
    };

    clickCreateAccountButton = () => {
        this.createAccountButton().click();
    };

    checkThatUserIsAutomaticallyLoggedInAfterAccountCreation = () => {
        cy.url().should("contain", "/dashboard/overview");
    };
}
