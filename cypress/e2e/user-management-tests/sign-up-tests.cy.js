import { HomePage, SignInPage } from "./../../support/pages";
import { signInTestData } from "../../fixtures/constants";
const homePage = new HomePage();
describe.skip("Check that user can go to the sign up page from the homepage", () => {
    it("To ensure that the sign in button in the homepage links to the sign in page", () => {
        homePage.visitHomePage();
        homePage.checkThatSignInButtonDirectsToCorrectPage();
    });
});

describe.skip("", () => {
    beforeEach("", () => {});

    it("", () => {});
});
