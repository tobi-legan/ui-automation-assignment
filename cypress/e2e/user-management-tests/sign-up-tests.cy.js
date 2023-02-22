import { HomePage, SignUpPage } from "./../../support/pages";
import { SignInApi } from "./../../support/apis/index";
import { signUpTestData } from "../../fixtures/constants";
import { faker } from "@faker-js/faker";
const homePage = new HomePage();
const signUpPage = new SignUpPage();
const signInApi = new SignInApi();
//do valid sign up test
//keep curl request to be used for change password and update profile
//do some checks test

const signUpInterceptName = "signUpIntercept";
const getUserIntercept = "getUserIntercept";
describe("Check that user can go to the sign up page from the homepage", () => {
    it("To ensure that the sign in button in the homepage links to the sign in page", () => {
        homePage.visitHomePage();
        homePage.checkThatSignUpButtonDirectsToCorrectPage();
    });
});

describe("Sign up tests", () => {
    beforeEach(() => {
        signUpPage.visitSignUpPage();
        signUpPage.checkThatSignUpPageIsOpen();
    });

    it("Check that user can sign up successfully with correct values", () => {
        const details = {
            fullName: faker.name.fullName(),
            userName: faker.internet.userName(faker.random.numeric(10)),
            phoneNumber: faker.random.numeric(11),
            email: faker.internet.email("", "", "c6qaaekn.mailosaur.net"),
        };

        signUpPage.inputFullName(details.fullName);
        signUpPage.inputUserName(details.userName);
        signUpPage.inputPhoneNumber(details.phoneNumber);
        signUpPage.inputEmail(details.email);
        signUpPage.inputPassword(signUpTestData.signUpValidTest.password);
        signUpPage.inputConfirmPassword(
            signUpTestData.signUpValidTest.password
        );
        signUpPage.interceptSignUpRequest(signUpInterceptName);
        signUpPage.clickCreateAccountButton();
        signUpPage.waitForSignUpInterceptToReturnStatusCode(
            signUpInterceptName,
            200
        );
        signUpPage.interceptGetUserRequest(getUserIntercept);
        signUpPage.waitForGetUserInterceptToReturnStatusCode(
            getUserIntercept,
            200
        );
        //check that user detials are saved correctly by checking the users endpoint
        signUpPage.checkThatUserRequestAfterSignUpReturnsTheCorrectData(
            getUserIntercept,
            details
        );
        // check that user can login via the endpoint also with his new password
        signInApi.signIn(
            details.email,
            signUpTestData.signUpValidTest.password
        );
    });
});
