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
let details;
describe("Check that user can go to the sign up page from the homepage", () => {
    it("To ensure that the sign in button in the homepage links to the sign in page", () => {
        homePage.visitHomePage();
        homePage.checkThatSignUpButtonDirectsToCorrectPage();
    });
});

describe("Sign up tests", () => {
    beforeEach(() => {
        details = {
            fullName: faker.name.fullName(),
            userName: faker.internet.userName(faker.random.numeric(10)),
            phoneNumber: faker.random.numeric(11),
            email: faker.internet.email("", "", "c6qaaekn.mailosaur.net"),
        };
        signUpPage.visitSignUpPage();
        signUpPage.checkThatSignUpPageIsOpen();
    });

    it("Check that user can sign up successfully with correct values", () => {
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

    it("Check that user sees error when username already exists for another user", () => {
        signUpPage.inputFullName(details.fullName);
        signUpPage.inputUserName(
            signUpTestData.signUpForDetailsthatAlreadyExist.username
        );
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
            400
        );
        signUpPage.errorMessageForWhenDataAlreadyExists();
        signUpPage.checkThatUserRemainsInSignUpPageAfterErrorWithoutTheFormBeingCleared(
            details.fullName,
            signUpTestData.signUpForDetailsthatAlreadyExist.username,
            details.phoneNumber,
            details.email,
            signUpTestData.signUpValidTest.password,
            signUpTestData.signUpValidTest.password
        );
    });

    it("Check that user sees error when email already exists for another user", () => {
        signUpPage.inputFullName(details.fullName);
        signUpPage.inputUserName(details.userName);
        signUpPage.inputPhoneNumber(details.phoneNumber);
        signUpPage.inputEmail(
            signUpTestData.signUpForDetailsthatAlreadyExist.email
        );
        signUpPage.inputPassword(signUpTestData.signUpValidTest.password);
        signUpPage.inputConfirmPassword(
            signUpTestData.signUpValidTest.password
        );
        signUpPage.interceptSignUpRequest(signUpInterceptName);
        signUpPage.clickCreateAccountButton();
        signUpPage.waitForSignUpInterceptToReturnStatusCode(
            signUpInterceptName,
            400
        );
        signUpPage.errorMessageForWhenDataAlreadyExists();
        signUpPage.checkThatUserRemainsInSignUpPageAfterErrorWithoutTheFormBeingCleared(
            details.fullName,
            details.userName,
            details.phoneNumber,
            signUpTestData.signUpForDetailsthatAlreadyExist.email,
            signUpTestData.signUpValidTest.password,
            signUpTestData.signUpValidTest.password
        );
    });

    it("Check that user sees error when phone number already exists for another user", () => {
        signUpPage.inputFullName(details.fullName);
        signUpPage.inputUserName(details.userName);
        signUpPage.inputPhoneNumber(
            signUpTestData.signUpForDetailsthatAlreadyExist.phoneNumber
        );
        signUpPage.inputEmail(details.email);
        signUpPage.inputPassword(signUpTestData.signUpValidTest.password);
        signUpPage.inputConfirmPassword(
            signUpTestData.signUpValidTest.password
        );
        signUpPage.interceptSignUpRequest(signUpInterceptName);
        signUpPage.clickCreateAccountButton();
        signUpPage.waitForSignUpInterceptToReturnStatusCode(
            signUpInterceptName,
            400
        );
        signUpPage.errorMessageForWhenDataAlreadyExists();
        signUpPage.checkThatUserRemainsInSignUpPageAfterErrorWithoutTheFormBeingCleared(
            details.fullName,
            details.userName,
            signUpTestData.signUpForDetailsthatAlreadyExist.phoneNumber,
            details.email,
            signUpTestData.signUpValidTest.password,
            signUpTestData.signUpValidTest.password
        );
    });

    it("Check that user sees error when password and confirm password are not the same", () => {
        signUpPage.inputFullName(details.fullName);
        signUpPage.inputUserName(details.userName);
        signUpPage.inputPhoneNumber(
            signUpTestData.signUpForDetailsthatAlreadyExist.phoneNumber
        );
        signUpPage.inputEmail(details.email);
        signUpPage.inputPassword(signUpTestData.signUpValidTest.password);
        signUpPage.inputConfirmPassword("Password123$4");
        signUpPage.clickCreateAccountButton();
        signUpPage.checkMessageWhenConfirmPasswordAndPasswordFieldDoNotMatch();
        signUpPage.checkThatUserRemainsInSignUpPageAfterErrorWithoutTheFormBeingCleared(
            details.fullName,
            details.userName,
            signUpTestData.signUpForDetailsthatAlreadyExist.phoneNumber,
            details.email,
            signUpTestData.signUpValidTest.password,
            signUpTestData.signUpValidTest.password
        );
    });
});
