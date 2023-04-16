import { HomePage, SignInPage } from "./../../support/pages";
import { signInTestData } from "../../fixtures/constants";

const homePage = new HomePage();
const signInPage = new SignInPage();

const loginIntercept = "loginIntercept";

describe("Check That user can go to the sign in page from the homepage", () => {
    it("To ensure that the sign in button in the homepage links to the sign in page", () => {
        homePage.visitHomePage();
        homePage.checkThatSignInButtonDirectsToCorrectPage();
    });
});

describe("Sign In page tests", () => {
    beforeEach(() => {
        signInPage.visitSignInPage();
        signInPage.checkThatSignInPageIsOpen();
    });

    it("Check that user sees valid error when email and password fields are empty", () => {
        signInPage.clickSignInButton();
        signInPage.checkErrorReturnedForEmptyEmailAndPassword();
        signInPage.checkThatUserRemainsInLogInPage();
    });

    it("Check that user sees valid error when password fields is empty", () => {
        signInPage.inputEmail(
            signInTestData.signIn_ValidEmailWrongPassword.email
        );
        signInPage.clickSignInButton();
        signInPage.checkErrorMessageForEmptyPassword();
        signInPage.checkThatUserRemainsInLogInPage();
    });

    it("Check that user sees valid error when email passed is in an invalid format", () => {
        signInPage.inputEmail("asad1234");
        signInPage.inputPassword(
            signInTestData.signIn_ValidEmailWrongPassword.password
        );
        signInPage.clickSignInButton();
        signInPage.checkErrorMessageForWrongEmailFormat();
        signInPage.checkThatUserRemainsInLogInPage();
    });

    it("Check that user sees valid error when email exists but password is incorrect", () => {
        signInPage.inputEmail(
            signInTestData.signIn_ValidEmailWrongPassword.email
        );
        signInPage.inputPassword(
            signInTestData.signIn_ValidEmailWrongPassword.password
        );
        signInPage.interceptLoginRequest(loginIntercept);
        signInPage.clickSignInButton();
        signInPage.waitForLoginInterceptToReturnStatusCode(
            loginIntercept,
            404,
            false
        );
        signInPage.checkThatErrorMessageIsDisplayed();
        signInPage.checkThatUserRemainsInLogInPage();
    });

    it("Check that user is logged in successfully with correct email and password", () => {
        signInPage.inputEmail(signInTestData.signIn_ValidTest.email);
        signInPage.inputPassword("usme");
        signInPage.interceptLoginRequest(loginIntercept);
        signInPage.clickSignInButton();
        signInPage.waitForLoginInterceptToReturnStatusCode(loginIntercept, 200);
        signInPage.checkThatValidMessageIsDisplayed();
        signInPage.checkThatUserIsRedirectedToDashboardAfterLogin();
    });
});
