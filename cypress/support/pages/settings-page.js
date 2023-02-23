import { API_BASE_URL } from "../../fixtures/constants/index";

export class SettingsPage {
    logOutMenuButton = () => cy.get(".settings_tab").children().eq(2);
    profileMenuButton = () => cy.get(".settings_tab").children().eq(0);
    securityMenuButton = () => cy.get(".settings_tab").children().eq(1);
    fullNameTextField = () => cy.get('[name="full_name"]');
    userNameTextField = () => cy.get('[name="username"]');
    phoneNumberTextField = () => cy.get('[name="phone_number"]');
    emailTextField = () => cy.get('[name="email"]');
    updateDetailsButton = () => cy.get("button").contains("Update Details");
    messageDisplayedForSuccessfulProfileUpdate = () =>
        cy.contains("Update Successful");
    oldPasswordText = () => cy.get('[name="password"]');
    newPasswordText = () => cy.get('[name="new_password"]');
    changePasswordButton = () => cy.get("button").contains("Change Password");
    passwordUpdateSuccessfullyMessage = () =>
        cy.contains("Password updated successfully");
    passwordUpdateWrongPasswordMessage = () =>
        cy.contains("Invalid credentials");
    passwordUpdateWhereUpdateNewPasswordAndOldPasswordAreTheSameMessageText =
        () => cy.contains("This is an old password, please change it");
    interceptUpdateUserRequest = (interceptName) => {
        return cy
            .intercept("PATCH", `${API_BASE_URL}/auth/update`)
            .as(interceptName);
    };

    interceptUpdatePasswordRequest = (interceptName) => {
        return cy
            .intercept("PATCH", `${API_BASE_URL}/auth/password`)
            .as(interceptName);
    };

    waitForUpdateUserInterceptToReturnStatusCode = (
        interceptName,
        statusCode
    ) => {
        return cy
            .wait(`@${interceptName}`, { timeout: 30000 })
            .its("response.statusCode")
            .should("eq", statusCode);
    };

    checkThatProfilePageIsOpenByDefault = () => {
        cy.url().should("contain", "/dashboard/settings/profile");
        this.profileMenuButton()
            .should("have.attr", "aria-current", "page")
            .should("have.attr", "class", "active");
        this.securityMenuButton()
            .should("not.have.attr", "aria-current", "page")
            .should("not.have.attr", "class", "active");
        this.logOutMenuButton()
            .should("not.have.attr", "aria-current", "page")
            .should("not.have.attr", "class", "active");
    };

    checkThatProfilePageIsOpenAndFieldsHaveCorrectValues = (signUpDetails) => {
        const { fullName, userName, email, phoneNumber } = signUpDetails;
        this.fullNameTextField().should("have.attr", "value", fullName);
        this.userNameTextField().should("have.attr", "value", userName);
        this.emailTextField()
            .should("be.disabled")
            .should("have.attr", "value", email);
        this.phoneNumberTextField()
            .should("be.disabled")
            .should("have.attr", "value", phoneNumber);
    };

    updateFullName = (fullName) => {
        return this.fullNameTextField().clear().type(fullName);
    };

    updateUserName = (userName) => {
        return this.userNameTextField().clear().type(userName);
    };

    clickUpdateDetailsButton = () => {
        return this.updateDetailsButton().click();
    };

    checkThatUpdateIsCompleted = () => {
        return this.messageDisplayedForSuccessfulProfileUpdate().should(
            "be.visible"
        );
    };

    clickSecurityMenuButton = () => {
        return this.securityMenuButton().click({ force: true });
    };

    checkThatSecurityPageIsOpen = () => {
        cy.url().should("contain", "/dashboard/settings/security");
        this.securityMenuButton()
            .should("have.attr", "aria-current", "page")
            .should("have.attr", "class", "active");
        this.profileMenuButton()
            .should("not.have.attr", "aria-current", "page")
            .should("not.have.attr", "class", "active");
        this.logOutMenuButton()
            .should("not.have.attr", "aria-current", "page")
            .should("not.have.attr", "class", "active");
    };

    clickLogOutButton = () => {
        return this.logOutMenuButton().click({ force: true }); // we will need to check why the top menubar is overlaying on the second menu bar
    };

    inputOldPassword = (oldPassword) => {
        return this.oldPasswordText().type(oldPassword, { force: true });
    };

    inputNewPassword = (newPassword) => {
        return this.newPasswordText().type(newPassword, { force: true });
    };

    clickChangePasswordButton = () => {
        return this.changePasswordButton().click({ force: true });
    };

    checkThatSuccessMessageIsDisplayedAfterSuccessfulPasswordUpdate = () => {
        this.passwordUpdateSuccessfullyMessage().should("be.visible");
    };

    checkThatErrorMessageIsDisplayedAfterFailedPasswordUpdateWhereOldPasswordIsWrong =
        () => {
            this.passwordUpdateWrongPasswordMessage().should("be.visible");
        };

    checkThatErrorMessageIsDisplayedAfterFailedPasswordUpdateWhereOldPasswordAndNewPasswordAreTheSame =
        () => {
            this.passwordUpdateWhereUpdateNewPasswordAndOldPasswordAreTheSameMessageText().should(
                "be.visible"
            );
        };

    checkMessageWhenUsernameFieldIsEmpty = () => {
        this.userNameTextField()
            .siblings("div")
            .should("contain.text", "Provide a username please");
    };

    checkMessageWhenFullNameFieldIsEmpty = () => {
        this.fullNameTextField()
            .siblings("div")
            .should("contain.text", "Provide your full name please");
    };

    checkMessageWhenoldPasswordFieldIsEmpty = () => {
        this.oldPasswordText()
            .siblings("div")
            .should("contain.text", "Provide your old password please");
    };

    checkMessageWhenNewPasswordFieldIsEmpty = () => {
        this.newPasswordText()
            .siblings("div")
            .should("contain.text", "Provide a password please");
    };

    checkThatUserIsLoggedOut = () => {
        cy.url().should("contain", "/auth/login");
        cy.visit("/dashboard/settings/profile");
        cy.url().should("contain", "/auth/login");
    };
}
