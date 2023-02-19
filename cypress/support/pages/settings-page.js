export class SettingsPage {
    logOutMenuButton = () => cy.get(".settings_tab").children().eq(2);
    profileMenuButton = () => cy.get(".settings_tab").children().eq(0);
    securityMenuButton = () => cy.get(".settings_tab").children().eq(1);

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

    clickLogOutButton = () => {
        this.logOutMenuButton().click({ force: true }); // we will need to check why the top menubar is overlaying on the second menu bar
    };

    checkThatUserIsLoggedOut = () => {
        cy.url().should("contain", "/auth/login");
        cy.visit("/dashboard/settings/profile");
        cy.url().should("contain", "/auth/login");
    };
}
