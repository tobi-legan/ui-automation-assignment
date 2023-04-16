//use curl to create new user
//go to update page and update profile
//do some edge cases, like when fullname/username is empty or taken
import { faker } from "@faker-js/faker";
import {
    SignInPage,
    SharedTopNavAllPages,
    SettingsPage,
} from "./../../support/pages";
import { SignUpApis } from "../../support/apis/index";

const signInPage = new SignInPage();
const sharedTopNavAllPages = new SharedTopNavAllPages();
const settingPage = new SettingsPage();
const signUpApi = new SignUpApis();
const newPassword = "Password123#";
let details;
describe("Change password tests", () => {
    beforeEach(() => {
        details = {
            fullName: faker.name.fullName(),
            userName: faker.internet.userName(faker.random.numeric(10)),
            phoneNumber: faker.random.numeric(11),
            email: faker.internet.email(
                faker.name.firstName(),
                faker.random.numeric(10),
                "c6qaaekn.mailosaur.net"
            ),
            password: "Password123$",
        };
        //create a new user with the Api
        signUpApi.signUpRequest({
            email: details.email,
            password: details.password,
            full_name: details.fullName,
            username: details.userName,
            phone_number: details.phoneNumber,
        });

        signInPage.visitSignInPage();
        signInPage.signInValidFlow(
            details.email,
            details.password,
            "loginIntercept"
        );
        sharedTopNavAllPages.clickImageProfileLink();
        settingPage.checkThatProfilePageIsOpenByDefault();
        settingPage.checkThatProfilePageIsOpenAndFieldsHaveCorrectValues(
            details
        );
        settingPage.clickSecurityMenuButton();
        settingPage.checkThatSecurityPageIsOpen();
    });

    it("Check that user's password can be updated successfully", () => {
        settingPage.inputOldPassword(details.password);
        settingPage.inputNewPassword(details.password);
        settingPage.interceptUpdatePasswordRequest("passwordIntercept");
        settingPage.clickChangePasswordButton();
        settingPage.waitForUpdateUserInterceptToReturnStatusCode(
            "passwordIntercept",
            200
        );
        settingPage.checkThatSuccessMessageIsDisplayedAfterSuccessfulPasswordUpdate();

        //now to check that the saved password actually works
        settingPage.clickLogOutButton();
        settingPage.checkThatUserIsLoggedOut();
        signInPage.signInValidFlow(
            details.email,
            newPassword,
            "loginIntercept"
        );
    });

    it("Check that user sees error when old password is wrong and password is not updated", () => {
        settingPage.inputOldPassword("PAssword12$");
        settingPage.inputNewPassword(newPassword);
        settingPage.interceptUpdatePasswordRequest("passwordIntercept");
        settingPage.clickChangePasswordButton();
        settingPage.waitForUpdateUserInterceptToReturnStatusCode(
            "passwordIntercept",
            403
        );
        settingPage.checkThatErrorMessageIsDisplayedAfterFailedPasswordUpdateWhereOldPasswordIsWrong();

        //now to check that the saved password actually works
        settingPage.clickLogOutButton();
        settingPage.checkThatUserIsLoggedOut();
        signInPage.inputEmail(details.email);
        signInPage.inputPassword(newPassword);
        signInPage.interceptLoginRequest("loginIntercept");
        signInPage.clickSignInButton();
        signInPage.waitForLoginInterceptToReturnStatusCode(
            "loginIntercept",
            404,
            false
        );
        signInPage.checkThatErrorMessageIsDisplayed();
        signInPage.checkThatUserRemainsInLogInPage();

        //check that old password still works
        signInPage.visitSignInPage();
        signInPage.signInValidFlow(
            details.email,
            details.password,
            "loginIntercept2"
        );
    });

    it("Check that user sees error when new password is same as old password", () => {
        settingPage.inputOldPassword(details.password);
        settingPage.inputNewPassword(details.password);
        settingPage.interceptUpdatePasswordRequest("passwordIntercept");
        settingPage.clickChangePasswordButton();
        settingPage.waitForUpdateUserInterceptToReturnStatusCode(
            "passwordIntercept",
            400
        );
        settingPage.checkThatErrorMessageIsDisplayedAfterFailedPasswordUpdateWhereOldPasswordAndNewPasswordAreTheSame();

        //check that old password still works
        settingPage.clickLogOutButton();
        settingPage.checkThatUserIsLoggedOut();
        signInPage.signInValidFlow(
            details.email,
            details.password,
            "loginIntercept"
        );
    });

    it("Check that user sees error when old password field is empty and new password field is filled", () => {
        settingPage.inputNewPassword(newPassword);
        settingPage.clickChangePasswordButton();
        settingPage.checkMessageWhenoldPasswordFieldIsEmpty();

        //check that old password still works
        settingPage.clickLogOutButton();
        settingPage.checkThatUserIsLoggedOut();
        signInPage.signInValidFlow(
            details.email,
            details.password,
            "loginIntercept"
        );
    });

    it("Check that user sees error when new password field is empty and old password field is filled", () => {
        settingPage.inputOldPassword(details.password);
        settingPage.clickChangePasswordButton();
        settingPage.checkMessageWhenNewPasswordFieldIsEmpty();

        //check that old password still works
        settingPage.clickLogOutButton();
        settingPage.checkThatUserIsLoggedOut();
        signInPage.signInValidFlow(
            details.email,
            details.password,
            "loginIntercept"
        );
    });
});
