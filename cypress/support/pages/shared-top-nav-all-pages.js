export class SharedTopNavAllPages {
    imageProfileLink = () => cy.get(".dashboard_nav_profile").children("a");

    clickImageProfileLink = () => {
        this.imageProfileLink().click();
    };
}
