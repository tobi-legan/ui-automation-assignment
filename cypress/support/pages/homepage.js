export class HomePage {
    loginButton = () => cy.get("a").contains("LOG IN");
    signUpButon = () => cy.contains("Sign Up");

    visitHomePage = () => {
        cy.visit("/");
    };

    //checks that the login page is not returning a 404
    //checks that the login button is clickable
    checkThatSignInButtonDirectsToCorrectPage = () => {
        this.loginButton()
            .parent()
            .then((link) => {
                cy.request(link.prop("href"));
            });
        this.loginButton().click();
        cy.url().should("contain", "/auth/login");
    };

    checkThatSignUpButtonDirectsToCorrectPage = () => {
        this.signUpButon().then((link) => {
            cy.request(link.prop("href"));
        });
        this.signUpButon().click();
        cy.url().should("contain", "/auth/signup");
    };
}
